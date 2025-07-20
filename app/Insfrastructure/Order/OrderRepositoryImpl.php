<?php

namespace App\Insfrastructure\Order;

use App\Domain\Order\OrderInterface;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Auth;

class OrderRepositoryImpl implements OrderInterface
{
    public function all(string $search): mixed
    {
        $order = Order::query();

        if (!empty(trim($search))) {
            $order->where(function ($q) use ($search) {
                $q->where('order_date', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('client', function ($clientQuery) use ($search) {
                        $clientQuery->where('clientName', 'LIKE', '%' . $search . '%');
                    });
            });
        }
        return $order->orderBy('created_at', 'desc')->paginate(10);
    }

    public function update(Order $order, array $data): bool
    {
        return $order->update($data);
    }

    public function delete(Order $order): bool
    {
        return $order->delete();
    }


    // API
    public function create(array $data): Order
    {
        return Order::create($data);
    }

    public function getAllTemplateOrder(string $search, int $perPage): mixed
    {
        $client = Auth::guard('client')->user();

        $order = Order::with(['invitationTemplate:id,template_name,thumbnail,type'])
            ->where('client_id', $client->id);

        if (!empty(trim($search))) {
            $order->whereHas('template', function ($query) use ($search) {
                $query->where('template_name', 'LIKE', '%' . $search . '%');
            });
        }

        return $order->orderBy('created_at', 'desc')
            ->paginate($perPage, [
                'id',
                'client_id',
                'subdomain',
                'invitation_template_id',
                'created_at'
            ]);
    }

    public function showById($id)
    {
        return Order::with(['invitationTemplate'])->findOrFail($id);
    }
}
