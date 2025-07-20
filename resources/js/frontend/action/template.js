import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const templateAPI = {
/**
 * Fetch all templates with pagination.
 *
 * @param {number} [page=1] - Page number to fetch.
 * @param {number} [perPage=20] - Number of templates per page.
 * @returns {Promise<Object>} - A promise that resolves to an object containing
 *   the success status, fetched data, and pagination details. If an error occurs,
 *   the success status will be false and an error message will be provided.
 */

    fetchTemplates: async (page = 1, perPage = 20) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/template/all?page=${page}&per_page=${perPage}`
            );
            return {
                success: true,
                data: response.data.data,
                pagination: {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    total: response.data.total,
                    per_page: response.data.per_page,
                },
            };
        } catch (error) {
            console.error("Error fetching templates:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
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
 * Fetch a template by its ID.
 *
 * @param {number} id - The ID of the template to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to an object containing
 *   the success status and the fetched template data. If an error occurs,
 *   the success status will be false and an error message will be provided.
 */

    fetchTemplateByid: async (id) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/template/${id}`
            );
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error("Error fetching templates:", error);
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch templates",
                data: [],
            };
        }
    },
};
