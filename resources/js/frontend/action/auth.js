import axios from "axios";
import { removeToken } from "../core/token";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const authenticateAPI = {
    /**
     * Login a client
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{success: boolean, data: any | {error: string}}>}
     */
    login: async (email, password) => {
        try {
            const response = await axios.post(
                `${baseURL}/v1/general/auth/login`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("client", response.data.data.client.id);
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.errors ||
                    error.response?.data?.message ||
                    "Terjadi kesalahan saat login.",
            };
        }
    },

    /**
     * Logout a client
     *
     * Revoke the current access token
     *
     * @returns {Promise<{success: boolean, error: string | null}>}
     */
    logout: async () => {
        try {
            await axios.post(
                `${baseURL}/v1/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            removeToken();
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.errors ||
                    error.response?.data?.message ||
                    "Terjadi kesalahan saat logout.",
            };
        }
    },
};
