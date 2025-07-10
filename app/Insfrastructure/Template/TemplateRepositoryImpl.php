<?php

namespace  App\Insfrastructure\Template;

use App\Domain\Template\TemplateInterface;
use App\Models\Order\InvitationTemplate;
use Illuminate\Support\Facades\Log;

class TemplateRepositoryImpl implements TemplateInterface
{
    public function all(string $search): mixed
    {
        $templates = InvitationTemplate::query();

        if (!empty(trim($search))) {
            $templates->where(function ($q) use ($search) {
                $q->where('template_name', 'LIKE', '%' . $search . '%');
            });
        }
        return $templates->orderBy('created_at', 'desc')->paginate(10);
    }

    public function create(array $data): InvitationTemplate
    {
        return InvitationTemplate::create($data);
    }

    public function update(InvitationTemplate $template, array $data): bool
    {
        return $template->update($data);
    }

    public function delete(InvitationTemplate $template): bool
    {
        return $template->delete();
    }

    //api

    public function allApi(string $search, int $perPage): mixed
    {
        $templates = InvitationTemplate::query();
        if (!empty(trim($search))) {
            $templates->where(function ($q) use ($search) {
                $q->where('type', 'LIKE', '%' . $search . '%');
            });
        }

        return $templates->orderBy('created_at', 'desc')->paginate($perPage);
    }
}
