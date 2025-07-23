import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const wishesAPI = {
    getAllWishes: async (slug) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/general/wishes/${slug}`
            );
            return { success: true, data: response.data.data.wishes };
        } catch (error) {
            console.error("Error wish:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message || "Failed to get wish",
            };
        }
    },

    postWishes: async (data, slug) => {
        try {
            const response = await axios.post(
                `${baseURL}/v1/general/wishes/${slug}/create`,
                data
            );
            return { success: true, data: response.data.data };
        } catch (error) {
            console.error("Error wish:", error);
            return {
                success: false,
                error:
                    error.response?.data?.meta.message || "Failed to get wish",
            };
        }
    },
};
