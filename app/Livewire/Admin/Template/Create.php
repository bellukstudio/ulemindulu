<?php

namespace App\Livewire\Admin\Template;

use App\Application\Template\CreateTemplateUseCase;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Create extends Component
{
    #[Validate('required')]
    public $templateName;

    #[Validate('nullable')]
    public $description;

    #[Validate('required')]
    public $slug;

    #[Validate('required')]
    public $previewUrl;

    #[Validate('required')]
    public $folderPath;

    #[Validate('required')]
    public $type;

    #[Validate('required|numeric|min:0')]
    public $price;


    #[Validate('boolean')]
    public $isDiscount = false;

    #[Validate('nullable|numeric|min:0')]
    public $priceDiscount;

    public $types = [
        ['value' => 'wedding', 'label' => 'Wedding'],
        ['value' => 'birthday', 'label' => 'Birthday'],
        ['value' => 'event', 'label' => 'Event'],
        ['value' => 'aqiqah', 'label' => 'Aqiqah'],
        ['value' => 'syukuran', 'label' => 'Syukuran'],
    ];


    public function mount()
    {
        $this->isDiscount = false;
        $this->priceDiscount = null;
    }



    public function create()
    {
        $this->validate();

        try {
            $useCase = app(CreateTemplateUseCase::class);

            $forms = [
                'template_name' => $this->templateName,
                'description' => $this->description,
                'slug' => $this->slug,
                'preview_url' => $this->previewUrl,
                'folder_path' => $this->folderPath,
                'type' => $this->type,
                'is_active' => true,
                'price' => $this->price,
                'isDiscount' => $this->isDiscount,
                'priceDiscount' => $this->isDiscount ? $this->priceDiscount : null,
            ];

            $useCase->execute($forms);

            session()->flash('message', 'Template created successfully!');
            $this->reset();
        } catch (\Exception $e) {
            $this->addError('error', 'Failed to create template: ' . $e->getMessage());
        }
    }

    public function updatedIsDiscount()
    {
        if (!$this->isDiscount) {
            $this->priceDiscount = null;
        } else {
            // Reset validasi error jika ada
            $this->resetErrorBag('priceDiscount');
        }
    }

    public function render()
    {
        return view('livewire.admin.template.create');
    }
}
