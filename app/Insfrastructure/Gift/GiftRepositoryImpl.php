<?php


namespace App\Insfrastructure\Gift;

use App\Domain\Gift\GiftInterface;
use App\Models\Invitation\BankAccount;
use Illuminate\Support\Facades\DB;

class GiftRepositoryImpl implements GiftInterface
{
    public function getBankAccountApi($orderId, $invitationTemplateId)
    {
        return BankAccount::where('order_id', $orderId)->where('invitation_template_id', $invitationTemplateId)->get();
    }

    public function createBankApiAccounts($orderId, $invitationTemplateId, array $bankAccounts)
    {
        DB::transaction(function () use ($orderId, $invitationTemplateId, $bankAccounts) {
            foreach ($bankAccounts as $account) {
                BankAccount::create([
                    'order_id' => $orderId,
                    'invitation_template_id' => $invitationTemplateId,
                    'bank_name' => strtoupper($account['bank_name']) ?? '',
                    'account_number' => $account['account_number'] ?? '',
                    'receiver_name' => $account['receiver_name'] ?? '',
                ]);
            }
        });
    }


    public function updateBankApiAccount($bankAccountId, array $data) // unused
    {
        $bankAccount = BankAccount::findOrFail($bankAccountId);
        $bankAccount->update([
            'bank_name' => strtoupper($data['bank_name']) ?? strtoupper($bankAccount->bank_name),
            'account_number' => $data['account_number'] ?? $bankAccount->account_number,
            'receiver_name' => $data['receiver_name'] ?? $bankAccount->receiver_name,
        ]);
    }

    public function deleteBankApiAccount($bankAccountId)
    {
        $bankAccount = BankAccount::findOrFail($bankAccountId);
        $bankAccount->delete();
    }


    public function checkBankAccount($orderId, $invitationTemplateId)
    {
        return BankAccount::where('order_id', $orderId)->where('invitation_template_id', $invitationTemplateId)->count();
    }
}
