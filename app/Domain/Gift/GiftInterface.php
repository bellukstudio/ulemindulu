<?php

namespace App\Domain\Gift;


interface GiftInterface
{
    public function getBankAccountApi($orderId, $invitationTemplateId);
    public function createBankApiAccounts($orderId, $invitationTemplateId, array $bankAccounts);
    public function updateBankApiAccount($bankAccountId, array $data);
    public function deleteBankApiAccount($bankAccountId);
    public function checkBankAccount($orderId, $invitationTemplateId);

}
