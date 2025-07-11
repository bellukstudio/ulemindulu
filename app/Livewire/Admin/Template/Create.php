<?php

namespace App\Livewire\Admin\Template;

use App\Application\Template\CreateTemplateUseCase;
use App\Models\Order\InvitationTemplate;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Livewire\WithFileUploads;

class Create extends Component
{
    use WithFileUploads;

    #[Validate('required')]
    public $templateName;

    #[Validate('nullable')]
    public $description;

    #[Validate('required|image|mimes:jpeg,png,jpg,gif|max:2048')]
    public $thumbnail;

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
    public $uploadProgress = 0;
    public $uploadedUrl = null;
    public $publicId = null;


    public function updatedThumbnail()
    {
        $this->resetErrorBag('thumbnail');

        try {
            $uploadedFile = Cloudinary::uploadApi()->upload($this->thumbnail->getRealPath(), [
                'folder' => 'template/'.$this->type,
                'resource_type' => 'image'
            ]);

            $this->uploadedUrl = $uploadedFile['secure_url'];
            $this->publicId = $uploadedFile['public_id'];
            session()->flash('message', 'Image uploaded successfully!');
        } catch (\Exception $e) {
            $this->addError('thumbnail', 'Failed to upload image: ' . $e->getMessage());
            $this->uploadedUrl = null;
        }
    }


    public function mount()
    {
        $this->isDiscount = false;
        $this->priceDiscount = null;
    }

    private function generateUniqueSlug($title, $type, $id = null)
    {
        $baseSlug = strtolower(preg_replace('/[^a-z0-9]+/', '-', strtolower($title)));
        $slug = $baseSlug . "-{$type}";

        if ($id != null) {
            $counter = 1;
            $originalSlug = $slug;
            while (InvitationTemplate::where('slug', $slug)->where('id', '<>', $id)->exists()) {
                $slug = $originalSlug . '-' . $counter++;
            }
        } else {
            $counter = 1;
            $originalSlug = $slug;
            while (InvitationTemplate::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter++;
            }
        }

        return $slug;
    }


    public function create()
    {
        $this->validate();

        if (!$this->uploadedUrl) {
            $this->addError('thumbnail', 'Please upload image before submitting form.');
            return;
        }

        try {
            $useCase = app(CreateTemplateUseCase::class);
            $generateSlug = $this->generateUniqueSlug($this->templateName, $this->type);
            $previewUrl = env('APP_URL') . '/template/' . $generateSlug;

            $forms = [
                'template_name' => $this->templateName,
                'description' => $this->description,
                'slug' => $generateSlug,
                'preview_url' => $previewUrl,
                'folder_path' => $this->folderPath,
                'type' => $this->type,
                'thumbnail' => $this->uploadedUrl,
                'thumbnail_public_id' => $this->publicId,
                'is_active' => true,
                'price' => $this->price,
                'isDiscount' => $this->isDiscount,
                'priceDiscount' => $this->isDiscount ? $this->priceDiscount : null,
            ];

            $useCase->execute($forms);
            if ($this->thumbnail && method_exists($this->thumbnail, 'delete')) {
                $this->thumbnail->delete();
            }

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
            $this->resetErrorBag('priceDiscount');
        }
    }

    public function render()
    {
        return view('livewire.admin.template.create');
    }
}
