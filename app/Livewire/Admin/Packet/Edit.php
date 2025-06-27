<?php

namespace App\Livewire\Admin\Packet;

use App\Application\Packet\UpdatePacketUseCase;
use App\Models\Packet\Packet;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Edit extends Component
{
    #[Validate('required')]
    public $packetName;

    #[Validate('required')]
    public $feature;

    #[Validate('required')]
    public $price;

    public $isDiscount = false;

    #[Validate('required_if:isDiscount,true|numeric|min:0')]
    public $priceDiscount;

    public Packet $packet;


    public function mount(Packet $packet)
    {
        $this->packet = $packet;
        $this->packetName = $packet->packetName;
        $this->feature = $packet->feature;
        $this->price = $packet->price;
        $this->isDiscount = $packet->isDiscount;
        $this->priceDiscount = $packet->priceDiscount;
    }

    public function update()
    {
        $this->validate();
        try {
            $useCase = app(UpdatePacketUseCase::class);
            $useCase->execute($this->packet, [
                'packetName' => $this->packetName,
                'feature' => $this->feature,
                'price' => $this->price,
                'isDiscount' => $this->isDiscount,
                'priceDiscount' => $this->priceDiscount
            ]);
            session()->flash('message', 'Packet updated successfully!');
            return redirect()->route('packets.index');
        } catch (\Exception $e) {
            $this->addError('error', 'Failed to update packet: ' . $e->getMessage());
        }
    }


    public function render()
    {
        return view('livewire.admin.packet.edit');
    }
}
