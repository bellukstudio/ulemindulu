<?php

namespace App\Livewire\Admin\Order;

use App\Application\Order\GetAllOrderUseCase;
use App\Models\Order\Order;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public $search = '';
    protected $paginationTheme = 'tailwind';
    public Order $order;

    public function mount(Order $order)
    {
        $this->order = $order;
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }
    public function render()
    {
        $useCase = app(GetAllOrderUseCase::class);
        $orders = $useCase->execute(trim($this->search), 10);
        return view(
            'livewire.admin.order.index',
            [
                'orders' => $orders
            ]
        );
    }
}
