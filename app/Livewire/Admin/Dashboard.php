<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\Order\InvitationTemplate;
use App\Models\Order\Order;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class Dashboard extends Component
{
    public $chartType = 'orders';
    public $dateRange = '30';

    public function render()
    {
        return view('livewire.admin.dashboard', [
            'chartData' => $this->getChartData(),
            'statsData' => $this->getStatsData()
        ]);
    }

    public function updatedChartType()
    {
        $this->dispatch('updateChart', $this->getChartData());
    }

    public function updatedDateRange()
    {
        $this->dispatch('updateChart', $this->getChartData());
    }

    private function getChartData()
    {
        switch ($this->chartType) {
            case 'orders':
                return $this->getOrdersData();
            case 'templates':
                return $this->getTemplatesData();
            case 'revenue':
                return $this->getRevenueData();
            default:
                return $this->getOrdersData();
        }
    }

    public function getOrdersData()
    {
        $days = (int) $this->dateRange;
        $startDate = Carbon::now()->subDays($days);

        $orders = Order::whereBetween('order_date', [$startDate, Carbon::now()])
            ->selectRaw('DATE(order_date) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $labels = [];
        $data = [];


        for ($i = $days - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $labels[] = Carbon::now()->subDays($i)->format('M d');


            $data[] = isset($orders[$date]) ? (int)$orders[$date]->count : 0;
        }

        return [
            'type' => 'line',
            'data' => [
                'labels' => $labels,
                'datasets' => [[
                    'label' => 'Orders',
                    'data' => $data,
                    'borderColor' => 'rgb(59, 130, 246)',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'tension' => 0.4,
                    'fill' => true
                ]]
            ]
        ];
    }

    public function getTemplatesData()
    {
        $templates = InvitationTemplate::withCount('orders')->get()
            ->filter(fn($template) => $template->orders_count > 0)
            ->sortByDesc('orders_count')
            ->take(10);




        if ($templates->isEmpty()) {
            return [
                'type' => 'bar',
                'data' => [
                    'labels' => ['No Data'],
                    'datasets' => [[
                        'label' => 'Order Count',
                        'data' => [0],
                        'backgroundColor' => 'rgba(156, 163, 175, 0.5)'
                    ]]
                ]
            ];
        }

        return [
            'type' => 'bar',
            'data' => [
                'labels' => $templates->pluck('template_name')->toArray(),
                'datasets' => [[
                    'label' => 'Order Count',
                    'data' => $templates->pluck('order_count')->toArray(),
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(14, 165, 233, 0.8)',
                    ],
                ]]
            ]
        ];
    }


    public function getRevenueData()
    {
        $days = (int) $this->dateRange;
        $startDate = Carbon::now()->subDays($days);

        $revenue = Order::join('invitation_templates', 'orders.invitation_template_id', '=', 'invitation_templates.id')
            ->whereBetween('orders.order_date', [$startDate, Carbon::now()])
            ->where('orders.payment_status', 'paid')
            ->selectRaw('DATE(orders.order_date) as date,
        SUM(CASE
            WHEN invitation_templates."isDiscount" = true
            THEN invitation_templates."priceDiscount"
            ELSE invitation_templates."price"
        END) as total')
            ->groupByRaw('DATE(orders.order_date)')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $labels = [];
        $data = [];


        for ($i = $days - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $labels[] = Carbon::now()->subDays($i)->format('M d');

            $data[] = isset($revenue[$date]) ? (float)$revenue[$date]->total : 0;
        }

        return [
            'type' => 'line',
            'data' => [
                'labels' => $labels,
                'datasets' => [[
                    'label' => 'Revenue (IDR)',
                    'data' => $data,
                    'borderColor' => 'rgb(16, 185, 129)',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
                    'tension' => 0.4,
                    'fill' => true
                ]]
            ]
        ];
    }

    public function getStatsData()
    {
        $days = (int) $this->dateRange;
        $startDate = Carbon::now()->subDays($days);


        $totalRevenue = Order::join('invitation_templates', 'orders.invitation_template_id', '=', 'invitation_templates.id')
            ->whereBetween('orders.order_date', [$startDate, Carbon::now()])
            ->where('orders.payment_status', 'paid')
            ->select(DB::raw('SUM(CASE
                        WHEN "invitation_templates"."isDiscount" = true
                        THEN "invitation_templates"."priceDiscount"
                        ELSE "invitation_templates"."price"
                    END) as total'))
            ->value('total');

        $popularTemplate = InvitationTemplate::withCount('orders')
            ->orderBy('order_count', 'desc')
            ->first();

        return [
            'total_orders' => Order::whereBetween('order_date', [$startDate, Carbon::now()])->count(),
            'total_revenue' => $totalRevenue ?? 0,
            'active_templates' => InvitationTemplate::where('is_active', true)->count(),
            'popular_template' => $popularTemplate?->template_name ?? 'No data'
        ];
    }
}
