<?php

namespace App\Livewire\Admin\Client;

use App\Application\Client\GetAllClientUseCase;
use App\Models\User\RegisterClient;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public $search = '';

    protected $paginationTheme = 'tailwind';
    public RegisterClient $client;

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function mount(RegisterClient $client)
    {
        $this->client = $client;
    }
    public function render()
    {
        $useCase = app(GetAllClientUseCase::class);
        $clients = $useCase->execute(trim($this->search), 10);
        return view('livewire.admin.client.index', [
            'clients' => $clients
        ]);
    }
}
