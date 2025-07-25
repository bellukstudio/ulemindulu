<?php

namespace App\Application\Order;

use App\Domain\Order\OrderInterface;
use App\Domain\Payment\PaymentInterface;
use App\Domain\Template\TemplateInterface;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;
use InvalidArgumentException;

class CreateOrderApiUseCase
{
    private OrderInterface $orderRepository;
    private TemplateInterface $templateRepository;
    private PaymentInterface $paymentRepository;
    public function __construct(
        OrderInterface $orderRepository,
        TemplateInterface $templateRepository,
        PaymentInterface $paymentRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->templateRepository = $templateRepository;
        $this->paymentRepository = $paymentRepository;
    }

    public function execute(array $data): Order
    {
        $template = $this->templateRepository->findById($data['invitation_template_id']);

        if (!$template) {
            throw new InvalidArgumentException('Template not found');
        }

        $totalPrice = $template->isDiscount ? $template->priceDiscount : $template->price;
        $order = $this->orderRepository->create($data);

        Config::$serverKey = config('app.midtrans.serverKey');
        Config::$isProduction = config('app.midtrans.isProduction');
        Config::$isSanitized = config('app.midtrans.isSanitized');
        Config::$is3ds = config('app.midtrans.is3ds');

        $user = Auth::guard('client')->user();
        $transactionDetails = [
            'transaction_details' => [
                'order_id' => $template->id,
                'gross_amount' => $totalPrice,
            ],
            'customer_details' => [
                'client_id' => $data['client_id'],
                'first_name' => $user->clientName,
                'email' => $user->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($transactionDetails);
            $this->paymentRepository->updateSnapToken($template->id, $snapToken);
        } catch (\Exception $e) {
            Log::error('Midtrans Error: ' . $e->getMessage());
            throw new \Exception('Gagal membuat transaksi pembayaran');
        }

        return $order;
    }
}
