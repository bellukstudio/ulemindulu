<?php

namespace App\Http\Controllers\Api\V1;

use App\Deps\InvoiceDependencies;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    protected $useCaseMyInvoice;
    protected $useCaseDownloadInvoice;
    protected $useCaseOrder;


    public function __construct(
        InvoiceDependencies $deps
    ) {
        $this->useCaseMyInvoice = $deps->useCaseMyInvoice;
        $this->useCaseDownloadInvoice = $deps->usecaseDownloadInvoice;
        $this->useCaseOrder = $deps->useCaseOrder;
    }


    public function getMyInvoice(Request $request)
    {
        $search = (string) $request->get('search', '');
        $perPage = (int) $request->get('per_page', 10);
        $perPage = $perPage > 100 ? 100 : $perPage;
        $invoice = $this->useCaseMyInvoice->execute($search, $perPage);
        return ApiResponse::success([
            'invoice' => $invoice,
            'message' => 'Template list',
        ], 'Template list', 200);
    }

    public function downloadInvoice($orderId)
    {
        $order = $this->useCaseOrder->findById($orderId);

        if (!$order) {
            return ApiResponse::error([
                'message' => 'Order not found',
            ], 'Order not found', 404);
        }

        $invoice = $this->useCaseDownloadInvoice->execute($orderId);

        return ApiResponse::success([
            'invoice' => $invoice,
            'message' => 'Invoice',
        ], 'Invoice', 200,);
    }
}
