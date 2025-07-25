<?php

namespace App\Deps;

use App\Application\Invoice\DownloadInvoiceUseCase;
use App\Application\Invoice\GetMyInvoiceUseCase;
use App\Application\Order\OrderUseCase;

class InvoiceDependencies
{

    /**
     * InvoiceDependencies constructor.
     *
     * @param GetMyInvoiceUseCase $useCaseMyInvoice
     * @param DownloadInvoiceUseCase $usecaseDownloadInvoice
     * @param OrderUseCase $useCaseOrder
     */
    public function __construct(
        public GetMyInvoiceUseCase $useCaseMyInvoice,
        public DownloadInvoiceUseCase $usecaseDownloadInvoice,
        public OrderUseCase  $useCaseOrder
    ) {}
}
