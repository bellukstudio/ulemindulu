<?php

namespace App\Http\Controllers\Api\V1;

use App\Deps\TemplateDependencies;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    protected $useCaseGetAllTemplate;
    protected $useCaseShowTemplate;

    public function __construct(
        TemplateDependencies $deps
    ) {
        $this->useCaseGetAllTemplate = $deps->useCaseGetAllTemplate;
        $this->useCaseShowTemplate = $deps->useCaseShowTemplate;
    }

    /**
     * Get all templates.
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
        return ApiResponse::success([
            'templates' => $templates,
            'message' => 'Template list',
        ], 'Template list', 200);
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
        if (!$invitation) {
            return ApiResponse::error([
                'message' => 'Template not found',
            ], 'Template not found', 404);
        }

        return ApiResponse::success([
            'invitation' => $invitation,
            'message' => 'Template found',
        ], 'Template found', 200);
    }
}
