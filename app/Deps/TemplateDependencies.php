<?php

namespace App\Deps;

use App\Application\Template\GetAllTemplateApiUseCase;
use App\Application\Template\ShowTemplateApiUseCase;

class TemplateDependencies
{

/**
 * Constructor for TemplateDependencies.
 *
 * @param GetAllTemplateApiUseCase $useCaseGetAllTemplate
 * @param ShowTemplateApiUseCase $useCaseShowTemplate
 */

    public function __construct(
        public GetAllTemplateApiUseCase $useCaseGetAllTemplate,
        public ShowTemplateApiUseCase $useCaseShowTemplate
    ) {}
}
