<div class="space-y-6">
    {{-- Stats Cards --}}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-md">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm text-gray-500">Total Orders</p>
                    <p class="text-2xl font-semibold text-gray-900">{{ number_format($statsData['total_orders']) }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-md">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                        </path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm text-gray-500">Revenue</p>
                    <p class="text-2xl font-semibold text-gray-900">IDR {{ number_format($statsData['total_revenue']) }}
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-md">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                        </path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm text-gray-500">Active Templates</p>
                    <p class="text-2xl font-semibold text-gray-900">{{ $statsData['active_templates'] }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-2 bg-yellow-100 rounded-md">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                        </path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm text-gray-500">Popular Template</p>
                    <p class="text-lg font-semibold text-gray-900 truncate">{{ $statsData['popular_template'] }}</p>
                </div>
            </div>
        </div>
    </div>

    {{-- Chart Controls --}}
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h3 class="text-lg font-medium text-gray-900">Analytics Dashboard</h3>

                <div class="flex space-x-4">
                    {{-- Chart Type Selector --}}
                    <div>
                        <select wire:model.live="chartType"
                            class="rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="orders">Orders</option>
                            <option value="templates">Templates</option>
                            <option value="revenue">Revenue</option>
                        </select>
                    </div>

                    {{-- Date Range Selector --}}
                    <div>
                        <select wire:model.live="dateRange"
                            class="rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {{-- Chart Container --}}
        <div class="p-6">
            <div class="relative" style="height: 400px;">
                <canvas id="dashboardChart"></canvas>
                <div wire:loading wire:target="chartType,dateRange"
                    class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div class="flex items-center space-x-2">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span class="text-gray-600">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 DOM loaded, initializing chart...');

            if (typeof Chart === 'undefined') {
                console.error('❌ Chart.js not loaded!');
                alert('Chart.js failed to load. Please refresh the page.');
                return;
            }
            console.log('✅ Chart.js loaded successfully');

            let myChart = null;
            const ctx = document.getElementById('dashboardChart');

            if (!ctx) {
                console.error('❌ Canvas element not found!');
                return;
            }

            function createChart(chartData) {

                if (myChart) {
                    myChart.destroy();
                }

                try {
                    myChart = new Chart(ctx, {
                        type: chartData.type,
                        data: chartData.data,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                }
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Period'
                                    }
                                },
                                y: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Count'
                                    },
                                    beginAtZero: true
                                }
                            },
                            interaction: {
                                mode: 'nearest',
                                axis: 'x',
                                intersect: false
                            }
                        }
                    });
                } catch (error) {
                    alert('Failed to create chart: ' + error.message);
                }
            }

            // Wait a bit for Chart.js to fully initialize
            setTimeout(() => {
                // Initial chart load
                const initialData = @json($chartData);
                createChart(initialData);
            }, 100);

            // Listen for chart updates
            window.addEventListener('updateChart', function(event) {
                createChart(event.detail[0]);
            });

            // Livewire event listener
            if (typeof Livewire !== 'undefined') {
                Livewire.on('updateChart', (chartData) => {
                    createChart(chartData[0]);
                });
            }
        });
    </script>
@endpush
