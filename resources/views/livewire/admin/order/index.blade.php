<div>
    @if (session()->has('message'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {{ session('message') }}
        </div>
    @endif


    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full p-6 mt-16">
        <div class="pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">Search</label>
            <div class="grid md:grid-cols-2 gap-5 p-3">
                {{-- Search Input --}}
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search" wire:model.live.debounce.500ms="search"
                        class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for template name..." />
                </div>

                {{-- Action Button --}}
                {{-- <div class="flex items-center justify-start md:justify-end">
                    <a href="{{ route('templates.create') }}"
                        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4
                        focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        + Add Template
                    </a>
                </div> --}}
            </div>
        </div>


        <div class="place-self-center">
            {{-- Loading State --}}
            <x-ui.loading />
        </div>

        <x-ui.table :headers="['#', 'Client Name', 'Order Date', 'Invitation Template', 'Subdomain', 'Action']">
            @forelse ($orders as $index => $order)
                <tr class="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ $index + 1 }}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ $order->client->clientName ?? '' }}
                    </td>
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ $order->order_date ?? '' }}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ $order->template->template_name ?? '' }}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ $order->template->template_name ?? '' }}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ $order->subdomain ?? '' }}
                    </td>
                    <td class="px-6 py-3">
                        <div class="flex space-x-2">
                            <a href="" class="text-blue-600 hover:text-blue-900 font-medium">
                                Edit
                            </a>
                            <button wire:click="delete('{{ $order->id }}')"
                                wire:confirm="Are you sure you want to delete this template?"
                                class="text-red-600 hover:text-red-900 font-medium">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="text-center py-8">
                        <div class="flex flex-col items-center">
                            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3">
                                </path>
                            </svg>
                            <p class="text-gray-500 text-lg">
                                @if ($search)
                                    No order found for "{{ $search }}"
                                @else
                                    No order available
                                @endif
                            </p>
                            @if ($search)
                                <button wire:click="$set('search', '')" class="mt-2 text-blue-600 hover:text-blue-800">
                                    Clear search
                                </button>
                            @endif
                        </div>
                    </td>
                </tr>
            @endforelse
        </x-ui.table>
        @if ($orders->hasPages())
            <div class="mt-4">
                {{ $orders->links('pagination::tailwind') }}
            </div>
        @endif
    </div>
</div>
