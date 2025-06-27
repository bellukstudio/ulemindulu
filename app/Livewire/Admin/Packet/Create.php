<?php

namespace App\Livewire\Admin\Packet;

use App\Application\Packet\CreatePacketUseCase;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Create extends Component
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



    public function create()
    {
        $this->validate();

        try {
            $useCase = app(CreatePacketUseCase::class);
            $forms = [
                'packetName' => $this->packetName,
                'feature' => $this->feature,
                'price' => $this->price,
                'isDiscount' => $this->isDiscount,
                'priceDiscount' => $this->priceDiscount
            ];
            $useCase->execute($forms);

            session()->flash('message', 'Packet created successfully!');
            $this->reset();
        } catch (\Exception  $e) {
            $this->addError('error', 'Failed to create packet: ' . $e->getMessage());
        }
    }

    public function updatedIsDiscount()
    {
        if (!$this->isDiscount) {
            $this->priceDiscount = null;
        }
    }

    public function render()
    {
        return view('livewire.admin.packet.create');
    }
}
