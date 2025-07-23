import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };
};

const getAuthHeadersGeneral = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
export const albumAPI = {
    /**
     * Uploads multiple photos to the server.
     *
     * @param {FormData} formData - A FormData object containing the photos to upload.
     * @param {Function} onUploadProgress - A callback function to receive upload progress updates.
     * @returns {Promise<{success: boolean, error: string | null}>}
     *   A promise that resolves to an object containing the success status and
     *   an error message if the upload failed.
     */
    uploadMultiplePhoto: async (formData, onUploadProgress) => {
        try {
            await axios.post(
                `${baseURL}/v1/album/upload`,
                formData,
                getAuthHeaders(),
                {
                    onUploadProgress,
                }
            );
            return { success: true };
        } catch (error) {
            console.error("Upload failed:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Failed to upload photos",
            };
        }
    },

    /**
     * Deletes a photo from the album.
     *
     * @param {string} id The ID of the photo to delete.
     * @returns {Promise<{success: boolean, error: string | null}>}
     *   A promise that resolves to an object containing the success status and
     *   an error message if the deletion failed.
     */
    deletePhotoAlbum: async (id) => {
        try {
            await axios.delete(
                `${baseURL}/v1/album/photo/${id}`,
                getAuthHeadersGeneral()
            );
            return { success: true };
        } catch (error) {
            console.error("Error deleting photo:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Failed to delete photo",
            };
        }
    },

    reorderPosition: async (data) => {
        try {
            await axios.put(
                `${baseURL}/v1/album/reorder`,
                data,
                getAuthHeadersGeneral()
            );
            return { success: true };
        } catch (error) {
            console.error("Error reorder photo:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Failed to reordering photo",
            };
        }
    },

    getMyAlbum: async (orderId) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/album/myalbum/${orderId}`,
                getAuthHeadersGeneral()
            );
            return {
                success: true,
                data: response.data.data.myalbum,
                total: response.data.data.total,
            };
        } catch (error) {
            console.error("Error saving invitation setting:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Failed to save invitation setting",
            };
        }
    },
};
