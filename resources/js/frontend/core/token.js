// resources/js/helpers/auth.js

export function isTokenAvailable() {
    const token = localStorage.getItem("token");
    return !!token;
}


export function getToken() {
    return localStorage.getItem("token");
}

export const removeToken = () => {
    localStorage.removeItem("token");
};


export function getClientId() {
    return localStorage.getItem("client");
}
