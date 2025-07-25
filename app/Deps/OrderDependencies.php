<?php

namespace App\Deps;

use App\Application\Client\ClientUseCase;
use App\Application\Order\CreateOrderApiUseCase;
use App\Application\Order\GetAllTemplateOrderApiUseCase;
use App\Application\Order\ShowTemplateOrderApiUseCase;
use App\Application\Template\TemplateUseCase;

class OrderDependencies
{

    /**
     * Constructor for OrderDependencies.
     *
     * @param CreateOrderApiUseCase $createOrderApiUseCase
     * @param GetAllTemplateOrderApiUseCase $getAllTemplateOrderApiUseCase
     * @param ShowTemplateOrderApiUseCase $showTemplateOrderApiUseCase
     * @param ClientUseCase $useCaseclient
     * @param TemplateUseCase $useCasetemplate
     */
    public function __construct(
        public CreateOrderApiUseCase $createOrderApiUseCase,
        public GetAllTemplateOrderApiUseCase $getAllTemplateOrderApiUseCase,
        public ShowTemplateOrderApiUseCase $showTemplateOrderApiUseCase,
        public ClientUseCase $useCaseclient,
        public TemplateUseCase $useCasetemplate
    ) {}
}
