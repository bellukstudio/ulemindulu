<?php

namespace App\Domain\Gift;

use App\Models\Invitation\BankAccount;

interface GiftInterface
{
    public function getBankAccountApi($orderId, $invitationTemplateId);
    public function createBankApiAccounts($orderId, $invitationTemplateId, array $bankAccounts);
    public function updateBankApiAccount($bankAccountId, array $data);
    public function deleteBankApiAccount($bankAccountId);
    public function checkBankAccount($orderId, $invitationTemplateId);
    public function deleteBankAccount($orderId, $invitationTemplateId): BankAccount;
    public function countBankAccount($orderId, $invitationTemplateId) : int;

}
