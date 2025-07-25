<?php

namespace App\Application\Template;

use App\Domain\Template\TemplateInterface;
use App\Models\Order\InvitationTemplate;

class TemplateUseCase
{
    private TemplateInterface $template;


    public function __construct(TemplateInterface $template)
    {
        $this->template = $template;
    }

    public function findById($id): InvitationTemplate
    {
        return $this->template->findById($id);
    }
}
