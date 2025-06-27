<?php

namespace App\Livewire\Admin\Template;

use App\Application\Template\UpdateTemplateUseCase;
use App\Models\Order\InvitationTemplate;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Edit extends Component
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

    public InvitationTemplate $template;

    public $types = [
        ['value' => 'wedding', 'label' => 'Wedding'],
        ['value' => 'birthday', 'label' => 'Birthday'],
        ['value' => 'event', 'label' => 'Event'],
        ['value' => 'aqiqah', 'label' => 'Aqiqah'],
        ['value' => 'syukuran', 'label' => 'Syukuran'],
    ];
    public function mount(InvitationTemplate $template)
    {
        $this->template = $template;
        $this->templateName = $template->template_name;
        $this->description = $template->description;
        $this->slug = $template->slug;
        $this->previewUrl = $template->preview_url;
        $this->folderPath = $template->folder_path;
        $this->type = $template->type;
        $this->price = $template->price;
        $this->isDiscount = $template->isDiscount;
        $this->priceDiscount = $template->priceDiscount;
    }

    public function update()
    {
        $this->validate();
        try {
            $useCase = app(UpdateTemplateUseCase::class);
            $useCase->execute($this->template, [
                'templateName' => $this->templateName,
                'description' => $this->description,
                'slug' => $this->slug,
                'previewUrl' => $this->previewUrl,
                'folderPath' => $this->folderPath,
                'type' => $this->type,
                'price' => $this->price,
                'isDiscount' => $this->isDiscount,
                'priceDiscount' => $this->isDiscount ? $this->priceDiscount : null,
            ]);
            session()->flash('message', 'Template updated successfully!');
            return redirect()->route('templates.index');
        } catch (\Exception $e) {
            $this->addError('error', 'Failed to update template: ' . $e->getMessage());
        }
    }


    public function render()
    {
        return view('livewire.admin.template.edit');
    }
}
