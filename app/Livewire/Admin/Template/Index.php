<?php

namespace App\Livewire\Admin\Template;

use App\Application\Template\DeleteTemplateUseCase;
use App\Application\Template\GetAllTemplateUseCase;
use App\Models\Order\InvitationTemplate;
use App\Models\Packet\Packet;
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

    public function delete(InvitationTemplate $template)
    {
        try {
            $deleteUseCase = app(DeleteTemplateUseCase::class);
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
