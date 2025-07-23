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
export const orderApi = {
    orderTemplate: async (orderData) => {
        /**
         * Place an order for an invitation template.
         *
         * @param {object} orderData
         * @param {number} orderData.clientId - The ID of the client.
         * @param {number} orderData.templateId - The ID of the invitation template.
         * @param {string} orderData.orderDate - The date of the order.
         * @param {string} orderData.subdomain - The subdomain of the order.
         * @returns {Promise<object>}
         * @fulfil {object}
         * @fulfil {boolean} success - Whether the request was successful.
         * @fulfil {number} data - The ID of the newly created order.
         * @fulfil {string} message - A success message.
         * @reject {object}
         * @reject {boolean} success - Whether the request was successful (false).
         * @reject {string} error - An error message.
         * @reject {null} data - No data is returned.
         */
        try {
            const response = await axios.post(
                `${baseURL}/v1/order/order-template`,
                {
                    client_id: orderData.client_id,
                    invitation_template_id: orderData.invitation_template_id,
                    order_date: orderData.order_date,
                    subdomain: orderData.subdomain,
                },
                getAuthHeaders()
            );

            return {
                success: true,
                data: response.data.data.order,
                message: response.data.meta.message,
            };
        } catch (error) {
            console.error("Error ordering template:", error);

            const validationErrors = error.response?.data?.data.message || null;
            const message =
                error.response?.data?.meta.message ||
                "Terjadi kesalahan saat memesan template";

            return {
                success: false,
                error: message,
                errors: validationErrors,
                data: null,
            };
        }
    },

    /**
     * Fetch an order by its ID.
     *
     * @param {number} id - The ID of the order to be fetched.
     * @returns {Promise<object>}
     * @fulfil {object}
     * @fulfil {boolean} success - Whether the request was successful.
     * @fulfil {object} data - The data of the fetched order.
     * @fulfil {string} message - A success message.
     * @reject {object}
     * @reject {boolean} success - Whether the request was successful (false).
     * @reject {string} error - An error message.
     * @reject {null} data - No data is returned.
     */

    fetchOrderId: async (id) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/me/order/${id}`,
                getAuthHeaders()
            );
            return {
                success: true,
                data: response.data.data.order,
                message: response.data.meta.message,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.meta.message ||
                    "Terjadi kesalahan saat mengambil data order",
                data: null,
            };
        }
    },
};
