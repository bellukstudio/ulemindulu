<?php

namespace App\Application\Template;

use App\Domain\Template\TemplateInterface;
use App\Models\Order\InvitationTemplate;

class DeleteTemplateUseCase
{

    private TemplateInterface $templateRepository;

    public function __construct(TemplateInterface $templateRepository)
    {
        $this->templateRepository = $templateRepository;
    }

    public function execute(InvitationTemplate $template): bool
    {
        return $this->templateRepository->delete($template);
    }
}
