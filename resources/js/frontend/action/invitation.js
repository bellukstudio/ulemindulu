import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const invitationAPI = {
    /**
     * Fetch templates created by the current user.
     *
     * @param {number} [page=1] - Page of templates to fetch.
     * @param {number} [perPage=20] - Number of templates per page.
     * @returns {Promise<import("../core/api").ApiResponse>}
     */
    fetchMyTemplate: async (page = 1, perPage = 20) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/me/templates/invitation?page=${page}&perPage=${perPage}`,
                getAuthHeaders()
            );
            return {
                success: true,
                data: response.data.data.template.data,
                pagination: {
                    current_page: response.data.data.template.current_page,
                    last_page: response.data.data.template.last_page,
                    total: response.data.data.template.total,
                    per_page: response.data.data.template.per_page,
                },
            };
        } catch (error) {
            console.error("Error fetching templates:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Failed to fetch templates",
                data: [],
                pagination: {
                    current_page: 1,
                    last_page: 1,
                    total: 0,
                    per_page: perPage,
                },
            };
        }
    },

    /**
     * Create  an invitation setting.
     * @param {Object} data Invitation setting data.
     * @return {Promise<Object>} The result of the API call.
     */
    createInvitationSetting: async (data) => {
        try {
            await axios.post(
                `${baseURL}/v1/settings/invitationSettings/create`,
                data,
                getAuthHeaders()
            );
            return {
                success: true,
            };
        } catch (error) {
            console.error("Error saving invitation setting:", error);
            return {
                success: false,
                error:
                    error.response?.data?.errors ||
                    error.response?.data?.message ||
                    "Failed to save invitation setting",
            };
        }
    },
    updateInvitationSetting: async (id, data) => {
        try {
            await axios.put(
                `${baseURL}/v1/settings/invitationSettings/${id}/update`,
                data,
                getAuthHeaders()
            );
            return {
                success: true,
            };
        } catch (error) {
            console.error("Error saving invitation setting:", error);
            return {
                success: false,
                error:
                    error.response?.data?.errors ||
                    error.response?.data?.message ||
                    "Failed to save invitation setting",
            };
        }
    },

    /**
     * Check if an invitation setting exists for the given order id.
     * @param {number} orderId The order id to check.
     * @returns {Promise<import("../core/api").ApiResponse>} The result of the API call.
     */
    checkInvitationSetting: async (orderId) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/settings/invitationSettings/${orderId}/check`,
                getAuthHeaders()
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error checking invitation setting:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Failed to check invitation setting",
            };
        }
    },

    /**
     * Get the invitation details by subdomain.
     * @param {string} subdomain The subdomain of the invitation to retrieve.
     * @returns {Promise<import("../core/api").ApiResponse>} The result of the API call.
     */
    getSubDomainInvitation: async (subdomain) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/general/invitation/${subdomain}`,
                getAuthHeaders()
            );
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            console.error("Error checking invitation setting:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to check invitation setting",
            };
        }
    },
};
