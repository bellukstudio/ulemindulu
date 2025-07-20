

/**
 * Check if token is available in local storage.
 *
 * @returns {boolean} Whether token is available in local storage.
 */
export function isTokenAvailable() {
    const token = localStorage.getItem("token");
    return !!token;
}


/**
 * Get the access token from local storage.
 *
 * @returns {string|null} The access token if exists, otherwise null.
 */
export function getToken() {
    return localStorage.getItem("token");
}

/**
 * Remove the access token and client ID from local storage.
 */

/**
 * Remove the access token and client ID from local storage.
 *
 * This function is usually called when the user logs out.
 */
export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("client");
};


/**
 * Get the client ID from local storage.
 *
 * @returns {string|null} The client ID if exists, otherwise null.
 */
export function getClientId() {
    return localStorage.getItem("client");
}
