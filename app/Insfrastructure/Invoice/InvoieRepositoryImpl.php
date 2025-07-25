<?php

namespace App\Insfrastructure\Invoice;

use App\Domain\Invoice\InvoiceInterface;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Auth;

class InvoieRepositoryImpl implements InvoiceInterface
{

    public function getInvoice(string $search, int $perPage)
    {
        $client = Auth::guard('client')->user();

        $order = Order::with(['invitationTemplate' => function ($query) {
            $query->select([
                'id',
                'template_name',
                'thumbnail',
                'type',
                'price',
                'priceDiscount',
                'isDiscount'
            ]);
        }])
            ->where('client_id', $client->id);

        if (!empty(trim($search))) {
            $order->whereHas('invitationTemplate', function ($query) use ($search) {
                $query->where('template_name', 'ILIKE', '%' . $search . '%');
            })->orWhere('payment_status', 'ILIKE', '%' . $search . '%')->orWhere('subdomain', 'ILIKE', '%' . $search . '%');
        }

        $results = $order->orderBy('created_at', 'desc')
            ->paginate($perPage, [
                'id',
                'client_id',
                'subdomain',
                'invitation_template_id',
                'midtrans_order_id',
                'payment_status',
                'order_date',
            ]);

        // Transform the results to add final_price
        $results->getCollection()->transform(function ($item) {
            if ($item->invitationTemplate) {
                $item->invitationTemplate->final_price = $item->invitationTemplate->isDiscount
                    ? $item->invitationTemplate->priceDiscount
                    : $item->invitationTemplate->price;
            }
            return $item;
        });

        return $results;
    }


    public function paymentOrder($orderId)
    {
        return [];
    }
}
