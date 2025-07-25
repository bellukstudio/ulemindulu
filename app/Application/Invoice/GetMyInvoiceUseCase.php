<?php


namespace App\Application\Invoice;

use App\Domain\Invoice\InvoiceInterface;

class GetMyInvoiceUseCase
{
    private InvoiceInterface $invoiceInterface;
    public function __construct(InvoiceInterface $invoiceInterface)
    {
        $this->invoiceInterface = $invoiceInterface;
    }

    public function execute($search, $perPage)
    {
        return $this->invoiceInterface->getInvoice($search, $perPage);
    }
}
