<?php

namespace App\Livewire\Admin\Template;

use App\Application\Template\UpdateTemplateUseCase;
use App\Models\Order\InvitationTemplate;
use App\Traits\RemoveFolderLivewireTemp;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Livewire\WithFileUploads;

class Edit extends Component
{
    use WithFileUploads, RemoveFolderLivewireTemp;

    #[Validate('required')]
    public $templateName;

    #[Validate('nullable')]
    public $description;

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

    // New thumbnail properties
    #[Validate('nullable|image|mimes:jpeg,png,jpg,gif|max:2048')]
    public $thumbnail;

    public $currentThumbnail;
    public $currentPublicId;
    public $uploadedUrl = null;
    public $publicId = null;

    public InvitationTemplate $template;

    public $types = [
        ['value' => 'wedding', 'label' => 'Wedding'],
        ['value' => 'birthday', 'label' => 'Birthday'],
        ['value' => 'event', 'label' => 'Event'],
        ['value' => 'aqiqah', 'label' => 'Aqiqah'],
        ['value' => 'syukuran', 'label' => 'Syukuran'],
        ['value' => 'tahlil', 'label' => 'Tahlil'],

    ];

    public function mount(InvitationTemplate $template)
    {
        $this->template = $template;
        $this->templateName = $template->template_name;
        $this->description = $template->description;
        $this->folderPath = $template->folder_path;
        $this->type = $template->type;
        $this->price = $template->price;
        $this->isDiscount = $template->isDiscount;
        $this->priceDiscount = $template->priceDiscount;

        // Set current thumbnail data
        $this->currentThumbnail = $template->thumbnail;
        $this->currentPublicId = $template->thumbnail_public_id;
    }

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
            $this->removeFileFromFolderTmp();
            session()->flash('message', 'New image uploaded successfully!');
        } catch (\Exception $e) {
            $this->addError('thumbnail', 'Failed to upload image: ' . $e->getMessage());
            $this->uploadedUrl = null;
        }
    }

    public function removeThumbnail()
    {
        $this->thumbnail = null;
        $this->uploadedUrl = null;
        $this->publicId = null;
        $this->resetErrorBag('thumbnail');
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

    public function update()
    {
        $this->validate();

        try {
            $useCase = app(UpdateTemplateUseCase::class);

            $newSlug = $this->generateUniqueSlug($this->templateName, $this->type, $this->template->id);
            $newPreviewUrl = env('APP_URL') . '/template/' . $newSlug;


            $updateData = [
                'template_name' => $this->templateName,
                'description' => $this->description,
                'slug' => $newSlug,
                'preview_url' => $newPreviewUrl,
                'folderPath' => $this->folderPath,
                'type' => $this->type,
                'price' => $this->price,
                'isDiscount' => $this->isDiscount,
                'priceDiscount' => $this->isDiscount ? $this->priceDiscount : null,
            ];

            if ($this->uploadedUrl) {
                $updateData['thumbnail'] = $this->uploadedUrl;
                $updateData['thumbnail_public_id'] = $this->publicId;

                if ($this->currentPublicId) {
                    try {
                        Cloudinary::uploadApi()->destroy($this->currentPublicId);
                    } catch (\Exception $e) {
                        Log::warning('Failed to delete old thumbnail: ' . $e->getMessage());
                    }
                }
            }

            $useCase->execute($this->template, $updateData);

            if ($this->thumbnail && method_exists($this->thumbnail, 'delete')) {
                $this->thumbnail->delete();
            }

            session()->flash('message', 'Template updated successfully!');
            return redirect()->route('templates.index');
        } catch (\Exception $e) {
            $this->addError('error', 'Failed to update template: ' . $e->getMessage());
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
        return view('livewire.admin.template.edit');
    }
}
