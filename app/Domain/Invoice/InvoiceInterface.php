<?php

namespace   App\Domain\Invoice;


interface InvoiceInterface
{
    public function getInvoice(string $search, int $perPage);
    public function downloadInvoice($orderId);
}
