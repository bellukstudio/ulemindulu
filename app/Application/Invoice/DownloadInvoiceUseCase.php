<?php

namespace App\Application\Invoice;

use App\Domain\Invoice\InvoiceInterface;

class DownloadInvoiceUseCase
{
    private InvoiceInterface $invoiceInterface;

    public function __construct(InvoiceInterface $invoiceInterface)
    {
        $this->invoiceInterface = $invoiceInterface;
    }

    public function execute($orderId)
    {
        return $this->invoiceInterface->downloadInvoice($orderId);
    }
}
