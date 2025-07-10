<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TemplateResource;
use App\Insfrastructure\Template\TemplateRepositoryImpl;
use App\Models\Order\InvitationTemplate;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    protected $templateRepository;

    public function __construct(TemplateRepositoryImpl $templateRepository)
    {
        $this->templateRepository = $templateRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function all(Request $request)
    {
        $search = $request->get('search', '');
        $perPage = (int) $request->get('per_page', 10);
        $perPage = $perPage > 100 ? 100 : $perPage;
        $templates = $this->templateRepository->allApi($search, $perPage);
        return response()->json($templates);
    }
}
