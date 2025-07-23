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

export const giftAPI = {
    // getBankAccount: async (orderId, templateId) => {
    //     try {
    //         const response = await axios.get(
    //             `${baseURL}/v1/general/gift/${orderId}/invitation/${templateId}`
    //         );
    //         return { success: true, data: response.data.data.bank };
    //     } catch (error) {
    //         console.error("Error saving invitation setting:", error);
    //         return {
    //             success: false,
    //             error:
    //                 error.response?.data?.meta.message ||
    //                 "Failed to save invitation setting",
    //         };
    //     }
    // },

    createBankAccount: async (data) => {
        try {
            await axios.post(
                `${baseURL}/v1/gift/bank-account/create`,
                data,
                getAuthHeaders()
            );
            return { success: true };
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

    updateBankAccount: async (data) => {
        try {
            await axios.post(
                `${baseURL}/v1/gift/bank-account/update`,
                data,
                getAuthHeaders()
            );
            return { success: true };
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
    checkBankAccount: async (orderId, templateId) => {
        try {
            const response = await axios.get(
                `${baseURL}/v1/gift/bank-account/${orderId}/${templateId}`,
                getAuthHeaders()
            );
            return {
                success: true,
                data: response.data.data.bank,
                status: response.data.meta.status,
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

    deleteBankAccount: async (bankAccount) => {
        try {
            await axios.delete(
                `${baseURL}/v1/gift/bank-account/${bankAccount}`,
                getAuthHeaders()
            );
            return { success: true };
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
