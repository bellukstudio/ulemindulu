<?php

namespace App\Livewire\Admin\Template;

use App\Application\Template\DeleteTemplateUseCase;
use App\Application\Template\GetAllTemplateUseCase;
use App\Models\Order\InvitationTemplate;
use App\Models\Packet\Packet;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public  $search = '';
    protected $paginationTheme = 'tailwind';
    public InvitationTemplate $template;

    public function mount(InvitationTemplate $template)
    {
        $this->template = $template;
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }

    /**
     * Delete a template.
     *
     * @param InvitationTemplate $template
     *
     * @throws \Exception
     */
    public function delete(InvitationTemplate $template)
    {
        try {
            $deleteUseCase = app(DeleteTemplateUseCase::class);
            if ($template->thumbnail_public_id) {
                try {
                    Cloudinary::uploadApi()->destroy($template->thumbnail_public_id);
                } catch (\Exception $e) {
                    Log::warning('Failed to delete old thumbnail: ' . $e->getMessage());
                }
            }
            $deleteUseCase->execute($template);
            session()->flash('message', 'Template deleted successfully!');
        } catch (\Exception $e) {
            session()->flash('error', 'Failed to delete template: ' . $e->getMessage());
        }
    }
    public function render()
    {
        $useCase = app(GetAllTemplateUseCase::class);
        $templates = $useCase->execute(trim($this->search), 10);
        return view(
            'livewire.admin.template.index',
            [
                'templates' => $templates
            ]
        );
    }
}
