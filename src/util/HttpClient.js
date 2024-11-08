import {BASE_URL} from "@/util/Const";

class HttpClient {
    static baseUrl = BASE_URL


    static defaultHeaders = {
        'Content-Type': 'application/json',
        "Accepted-Language": "az",
    };

    static get(path, headers = null) {
        const customHeaders = headers ??  {};

        return fetch(this.baseUrl + path, {
            method: 'GET',
            headers: {
                ...this.defaultHeaders,
                ...customHeaders
            }
        });
    }

    static async post(path, body, headers = null) {
        const customHeaders = headers ??  {};
        const response = await fetch(this.baseUrl + path, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                ...this.defaultHeaders,
                ...customHeaders
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
        }
        return response;
    }

    static async put(path, body, headers = null) {
        const customHeaders = headers ? Object.fromEntries(headers) : {};
        const response = await fetch(this.baseUrl + path, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                ...this.defaultHeaders,
                ...customHeaders
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
        }
        return response.json();
    }

    static async delete(path, headers = null) {
        const customHeaders = headers ? Object.fromEntries(headers) : {};
        const response = await fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: {
                ...this.defaultHeaders,
                ...customHeaders
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
        }
        return response.json();
    }
}

export default HttpClient;