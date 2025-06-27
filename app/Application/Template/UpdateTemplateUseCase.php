<?php

namespace  App\Application\Template;

use App\Domain\Template\TemplateInterface;
use App\Models\Order\InvitationTemplate;

class UpdateTemplateUseCase
{
    private TemplateInterface $templateRepository;
    public function __construct(TemplateInterface $templateRepository)
    {
        $this->templateRepository = $templateRepository;
    }

    public function execute(InvitationTemplate $template, array $data) : bool
    {
        return $this->templateRepository->update($template, $data);
    }
}
