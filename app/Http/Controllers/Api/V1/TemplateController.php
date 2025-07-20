<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Template\GetAllTemplateApiUseCase;
use App\Application\Template\ShowTemplateApiUseCase;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    protected $useCaseGetAllTemplate;
    protected $useCaseShowTemplate;

    public function __construct(GetAllTemplateApiUseCase $useCaseTemplate, ShowTemplateApiUseCase $useCaseShowTemplate)
    {
        $this->useCaseGetAllTemplate = $useCaseTemplate;
        $this->useCaseShowTemplate = $useCaseShowTemplate;
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
        $templates = $this->useCaseGetAllTemplate->execute($search, $perPage);
        return response()->json($templates);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $invitation = $this->useCaseShowTemplate->execute($id);

        return response()->json($invitation);
    }
}
