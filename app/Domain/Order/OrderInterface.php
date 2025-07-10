<?php
namespace App\Domain\Order;

use App\Models\Order\Order;

interface OrderInterface
{
    public function all(string $search) : mixed;
    public function create(array $data) : Order;
    public function update(Order $order, array $data) : bool;
    public function delete(Order $order) : bool;
}
