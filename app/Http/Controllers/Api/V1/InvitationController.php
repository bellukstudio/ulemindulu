<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Invitation\CheckInvitationApiUseCase;
use App\Application\Invitation\CreateInvitationApiUseCase;
use App\Application\Invitation\UpdateInvitationApiUseCase;
use App\Http\Controllers\Controller;
use App\Insfrastructure\Invitation\InvitationRepositoryImpl;
use App\Models\Invitation\InvitationSetting;
use App\Models\Order\InvitationTemplate;
use App\Models\Order\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InvitationController extends Controller
{
    protected $useCaseCreateInvitation;
    protected $useCaseUpdateInvitation;
    protected $useCaseCheckInvitation;

    public function __construct(CreateInvitationApiUseCase $createInvitationApiUseCase,
    UpdateInvitationApiUseCase $updateInvitationApiUseCase, CheckInvitationApiUseCase $checkInvitationApiUseCase)
    {
        $this->useCaseCreateInvitation = $createInvitationApiUseCase;
        $this->useCaseUpdateInvitation = $updateInvitationApiUseCase;
        $this->useCaseCheckInvitation = $checkInvitationApiUseCase;
    }



    /**
     * Create a new invitation.
     *
     * @bodyParam description string required The description of the invitation.
     * @bodyParam order_id int required The ID of the order.
     * @bodyParam invitation_template_id int required The ID of the invitation template.
     * @bodyParam event_date date required The date of the event.
     * @bodyParam event_time string required The time of the event.
     * @bodyParam timezone string required The timezone of the event.
     * @bodyParam address string required The address of the event.
     * @bodyParam location string nullable The location of the event.
     * @bodyParam backsound string nullable The backsound of the event.
     * @bodyParam custom_data array nullable The custom data of the invitation.
     *
     * @response 201 {
     *   "message": "Invitation created successfully",
     * }
     *
     * @response 422 {
     *   "errors": {
     *     "description": [
     *       "The description field is required."
     *     ],
     *     "order_id": [
     *       "The order id field is required."
     *     ],
     *     "invitation_template_id": [
     *       "The invitation template id field is required."
     *     ],
     *     "event_date": [
     *       "The event date field is required."
     *     ],
     *     "event_time": [
     *       "The event time field is required."
     *     ],
     *     "timezone": [
     *       "The timezone field is required."
     *     ],
     *     "address": [
     *       "The address field is required."
     *     ]
     *   }
     * }
     */
    public function createInvitation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'order_id' => 'required|exists:orders,id',
            'invitation_template_id' => 'required|exists:invitation_templates,id',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'timezone' => 'required|string',
            'address' => 'required|string',
            'location' => 'nullable|string',
            'backsound' => 'nullable|string',
            'custom_data' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['custom_data'] = json_encode($data['custom_data'] ?? []);

        $this->useCaseCreateInvitation->execute($data);

        return response()->json([
            'message' => 'Invitation created successfully',
        ]);
    }
    /**
     * Update the specified invitation in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function updateInvitationSettings(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'order_id' => 'sometimes|exists:orders,id',
            'invitation_template_id' => 'sometimes|exists:invitation_templates,id',
            'event_date' => 'sometimes|date',
            'event_time' => 'sometimes',
            'timezone' => 'sometimes|string',
            'address' => 'sometimes|string',
            'location' => 'nullable|string',
            'backsound' => 'nullable|string',
            'custom_data' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        if (isset($data['custom_data'])) {
            $data['custom_data'] = json_encode($data['custom_data']);
        }

        $invitation = InvitationSetting::find($id);
        if (!$invitation) {
            return response()->json(['message' => 'Invitation not found'], 404);
        }

        $this->useCaseUpdateInvitation->execute($invitation, $data);

        return response()->json([
            'message' => 'Invitation updated successfully',
        ]);
    }


    /**
     * Check if invitation setting exists by order id
     *
     * @param int $orderId
     * @return \Illuminate\Http\Response
     */
    public function checkSettings($orderId)
    {
        $checking = $this->useCaseCheckInvitation->execute($orderId);

        if ($checking) {
            return response()->json([
                'message' => 'Invitation settings found',
                'status' => true,
                'data' => $checking
            ]);
        } else {
            return response()->json([
                'message' => 'Invitation settings not found',
                'status' => false
            ]);
        }
    }


    /**
     * Retrieve an invitation template and its settings by subdomain slug.
     *
     * This method fetches the order associated with the given subdomain slug,
     * retrieves the corresponding invitation template and its settings,
     * and returns them in the response. If the template or invitation settings
     * are not found, a 404 response is returned.
     *
     * @param string $slug The subdomain slug of the order.
     * @return \Illuminate\Http\Response JSON response containing the template
     *                                  and invitation settings data or an error message.
     */

    public function getBySlug($slug)
    {
        $order = Order::where('subdomain', $slug)->firstOrFail();

        $template = InvitationTemplate::find($order->invitation_template_id);
        if (!$template) {
            return response()->json([
                'message' => 'Template not found',
            ], 404);
        }

        $invitationSettings = InvitationSetting::where('order_id', $order->id)
            ->where('invitation_template_id', $order->invitation_template_id)
            ->first();

        if (!$invitationSettings) {
            return response()->json([
                'message' => 'Invitation settings not found',
            ], 404);
        }

        return response()->json([
            'data' => $template,
            'invitationSettings' => $invitationSettings,
        ]);
    }
}
