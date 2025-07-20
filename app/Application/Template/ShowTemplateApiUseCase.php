<?php


namespace App\Application\Template;

use App\Domain\Template\TemplateInterface;

class ShowTemplateApiUseCase
{

    private TemplateInterface $templateRepository;

    public function __construct(TemplateInterface $templateRepository)

    {
        $this->templateRepository = $templateRepository;
    }

    public function execute($id)
    {
        return $this->templateRepository->showApi($id);
    }
}
