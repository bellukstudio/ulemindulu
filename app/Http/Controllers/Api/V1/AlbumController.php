<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Invitation\AlbumPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;

class AlbumController extends Controller
{

    /**
     * Handles the upload of album photos for a specific order.
     *
     * Validates the request input, ensuring that the order ID exists and the
     * photos array contains valid image files. Limits the total number of photos
     * to seven per order. Uploads photos to Cloudinary, storing the resulting
     * URL and public ID in the database, along with the photo's position.
     * Rolls back the transaction and logs an error if the upload process fails.
     *
     * @param Request $request The HTTP request containing order ID, photos, and optional sorted IDs.
     *
     * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure of the upload process.
     *
     * @throws \Illuminate\Validation\ValidationException If the total number of photos exceeds the limit.
     */

    public function upload(Request $request)
    {
        $request->validate([
            'order_id' => 'required|uuid|exists:orders,id',
            'photos' => 'required|array|min:1',
            'photos.*' => 'file|image|max:3072',
            'sorted_ids' => 'nullable|array',
            'sorted_ids.*' => 'integer',
        ]);

        $orderId = $request->order_id;
        $invitationTemplateId = optional(DB::table('orders')->where('id', $orderId)->first())->invitation_template_id;
        $subdomain = optional(DB::table('orders')->where('id', $orderId)->first())->subdomain;
        $sortedIds = $request->sorted_ids ?? [];
        $uploaded = [];

        $currentPhotoCount = AlbumPhoto::where('order_id', $orderId)->count();
        $incomingCount = count($request->file('photos'));
        $total = $currentPhotoCount + $incomingCount;

        if ($total > 7) {
            return ApiResponse::error([
                'message' => 'You can upload a maximum of 7 photos per order.'
            ], 400);
        }

        DB::beginTransaction();

        try {
            foreach ($request->file('photos') as $index => $photo) {
                // Get position from sorted_ids or use sequential index
                // Add 1 to make positions start from 1 instead of 0
                $position = isset($sortedIds[$index]) ? $sortedIds[$index] + 1 : $index + 1;

                // Adjust position based on current photos count
                $finalPosition = $currentPhotoCount + $position;

                $uploadResult = Cloudinary::uploadApi()->upload($photo->getRealPath(), [
                    'folder' => 'client/album/' . $subdomain,
                    'resource_type' => 'image',
                ]);

                $photoRecord = AlbumPhoto::create([
                    'order_id' => $orderId,
                    'invitation_template_id' => $invitationTemplateId,
                    'album_public_id' => $uploadResult['public_id'],
                    'image_path' => $uploadResult['secure_url'],
                    'position' => $finalPosition,
                ]);

                $uploaded[] = $photoRecord;
            }

            DB::commit();

            return ApiResponse::success([
                'message' => 'Photos uploaded successfully',
            ], 'Photos uploaded successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Album Upload Error: ' . $e->getMessage());

            return ApiResponse::error([
                'message' => 'Failed to upload photos ' . $e->getMessage(),
            ], 'Failed to upload photos', 500);
        }
    }

    /**
     * Deletes a photo from the album.
     *
     * @param string $id The ID of the photo to delete.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $photo = AlbumPhoto::findOrFail($id);

        try {
            Cloudinary::uploadApi()->destroy($photo->album_public_id);

            $photo->delete();

            return ApiResponse::success([
                'message' => 'Photo deleted successfully',
            ], 'Photo deleted successfully');
        } catch (\Exception $e) {
            Log::error('Photo Delete Error: ' . $e->getMessage());
            return ApiResponse::error([
                'message' => 'Failed to delete photo ' . $e->getMessage(),
            ], 'Failed to delete photo', 500);
        }
    }

    /**
     * Updates the order of the given photos in the album.
     *
     * @param Request $request
     *   Validation rules:
     *   - `order_id`: required, uuid, exists in orders table
     *   - `ordered_ids`: required, array of uuids
     *   - `ordered_ids.*`: required, uuid
     *
     * @return \Illuminate\Http\JsonResponse
     *   - 200: `message` = "Photo order updated successfully"
     *   - 400: `message` = "Some photo IDs do not belong to this order"
     *   - 500: `message` = "Failed to reorder photos", `error` = the exception message
     */
    public function reorderUpsert(Request $request)
    {
        $request->validate([
            'order_id' => 'required|uuid|exists:orders,id',
            'ordered_ids' => 'required|array',
            'ordered_ids.*' => 'uuid'
        ]);

        $orderId = $request->order_id;
        $orderedIds = $request->ordered_ids;

        $existingPhotos = AlbumPhoto::where('order_id', $orderId)
            ->whereIn('id', $orderedIds)
            ->get()
            ->keyBy('id');

        if ($existingPhotos->count() !== count($orderedIds)) {
            return ApiResponse::error([
                'message' => 'Some photo IDs do not belong to this order',
            ], 'Some photo IDs do not belong to this order', 400);
        }

        DB::beginTransaction();

        try {
            $updateData = [];

            foreach ($orderedIds as $index => $id) {
                if (isset($existingPhotos[$id])) {
                    $photo = $existingPhotos[$id];

                    $updateData[] = [
                        'id' => $photo->id,
                        'order_id' => $photo->order_id,
                        'invitation_template_id' => $photo->invitation_template_id,
                        'image_path' => $photo->image_path,
                        'position' => $index + 1,
                    ];
                }
            }

            AlbumPhoto::upsert(
                $updateData,
                ['id'],
                ['position']
            );

            DB::commit();

            return ApiResponse::success([
                'message' => 'Photo order updated successfully',
            ], 'Photo order updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Reorder Photo Error: ' . $e->getMessage());

            return ApiResponse::error([
                'message' => 'Failed to reorder photos: ' . $e->getMessage(),
            ], 'Failed to reorder photos', 500);
        }
    }



    /**
     * Returns the album photos for a given order ID.
     *
     * @param string $orderId The order ID.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMyAlbum($orderId)
    {
        // Validate UUID
        if (!Str::isUuid($orderId)) {
            return ApiResponse::error([
                'message' => 'Invalid order ID',
            ], 'Invalid order ID', 400);
        }

        $myalbum = AlbumPhoto::where('order_id', $orderId)
            ->select(['id', 'album_public_id', 'image_path', 'position', 'created_at'])
            ->orderBy('position')
            ->get();
        ///
        // if ($myalbum->isEmpty()) {
        //     return ApiResponse::error([
        //         'message' => 'Album not found',
        //     ],  'Album not found');
        // }

        return ApiResponse::success(
            [
                'myalbum' => $myalbum,
                'total' => $myalbum->count()
            ],
            'Album retrieved successfully',
        );
    }

}
