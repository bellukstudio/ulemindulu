<?php

namespace App\Application\Template;

use App\Domain\Template\TemplateInterface;
use League\Uri\UriTemplate\Template;

class GetAllTemplateUseCase
{
    private TemplateInterface $templateRepository;

    public function __construct(TemplateInterface $templateRepository)
    {
        $this->templateRepository = $templateRepository;
    }

    public function execute(string $search) : mixed
    {
        return $this->templateRepository->all($search);
    }
}
