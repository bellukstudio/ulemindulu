<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Invoice\GetMyInvoiceUseCase;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    protected $useCaseMyInvoice;


    public function __construct(GetMyInvoiceUseCase $useCaseMyInvoice)
    {
        $this->useCaseMyInvoice = $useCaseMyInvoice;
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
}
