<?php

namespace App\Livewire\Admin\Packet;

use App\Application\Packet\DeletePacketUseCase;
use App\Application\Packet\GetAllPacketUseCase;
use App\Models\Packet\Packet;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public $search = '';
    protected $paginationTheme = 'tailwind';
    public Packet $packet;

    public function mount(Packet $packet)
    {
        $this->packet = $packet;
    }
    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function delete(Packet $packet)
    {
        try {
            $deleteUseCase = app(DeletePacketUseCase::class);
            $deleteUseCase->execute($packet);

            session()->flash('message', 'Packet deleted successfully!');
        } catch (\Exception $e) {
            session()->flash('error', 'Failed to delete packet: ' . $e->getMessage());
        }
    }
    public function render()
    {
        // Resolve use case from container and execute with search parameter
        $useCase = app(GetAllPacketUseCase::class);
        $packets = $useCase->execute(trim($this->search), 10); // 10 items per page
        return view('livewire.admin.packet.index', [
            'packets' => $packets
        ]);
    }
}
