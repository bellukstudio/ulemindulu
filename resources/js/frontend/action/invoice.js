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

export const invoiceAPI = {
    /**
     * Fetches the user's invoices with pagination.
     *
     * @param {number} [page=1] - Page number to fetch.
     * @param {number} [perPage=20] - Number of invoices per page.
     * @param {string} [search=""] - Search keyword.
     * @returns {Promise<Object>} - A promise that resolves to an object containing
     *   the success status, fetched invoices, and pagination details. If an error occurs,
     *   the success status will be false and an error message will be provided.
     */
    fetchMyInvoice: async (page = 1, perPage = 20, search = "") => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/invoices/myinvoice?page=${page}&perPage=${perPage}&search=${search}`,
                getAuthHeaders()
            );
            return {
                success: true,
                data: response.data.data.invoice.data,
                pagination: {
                    current_page: response.data.data.invoice.current_page,
                    last_page: response.data.data.invoice.last_page,
                    total: response.data.data.invoice.total,
                    per_page: response.data.data.invoice.per_page,
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
};
