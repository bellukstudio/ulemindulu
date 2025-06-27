<?php

namespace App\Application\Template;

use App\Domain\Template\TemplateInterface;
use App\Models\Order\InvitationTemplate;

class CreateTemplateUseCase
{
    private TemplateInterface $templateRepository;

    public function __construct(TemplateInterface $templateRepository)
    {
        $this->templateRepository = $templateRepository;
    }

    public function execute(array $data): void
    {
        $this->templateRepository->create($data);
    }
    
}
