<?php

namespace App\Insfrastructure\Order;

use App\Domain\Order\OrderInterface;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Auth;

class OrderRepositoryImpl implements OrderInterface
{
    public function all(string $search): mixed
    {
        $order = Order::with(['client', 'invitationTemplate']);

        if (!empty(trim($search))) {
            $order->search($search);
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

    public function showById($id)
    {
        return Order::with(['invitationTemplate'])->findOrFail($id);
    }

    public function orderBySubDomain(string $subdomain): Order
    {
        return Order::where('subdomain', $subdomain)->firstOrFail();
    }

    public function findById($id): Order
    {
        return Order::find($id);
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
            $order->whereHas('invitationTemplate', function ($query) use ($search) {
                $query->where('template_name', 'ILIKE', '%' . $search . '%');
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

}
