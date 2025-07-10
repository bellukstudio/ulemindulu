<?php

namespace App\Application\Template;

use App\Domain\Template\TemplateInterface;

class GetAllTemplateApiUseCase
{

    private TemplateInterface $templateRepository;

    public function __construct(TemplateInterface $templateRepository)
    {
        $this->templateRepository = $templateRepository;
    }

    public function execute(string $search,$perPage) : mixed
    {
        return $this->templateRepository->allApi($search, $perPage);
    }
}
