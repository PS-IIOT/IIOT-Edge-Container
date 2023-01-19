import { AllowlistRequest } from '../models/allowlist-request.model';
import { AllowlistResponse } from '../models/allowlist-response.model';

export async function getAllowlist(): Promise<AllowlistResponse | undefined> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    if (username && password) {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            }
        );
        const json_data = (await response.json()) as AllowlistResponse;
        return json_data;
    } else return undefined;
}

export async function insertIP(addIP: AllowlistRequest) {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    if (username && password) {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify(addIP),
            }
        );
        const json_data = (await response.json()) as AllowlistResponse;
        return json_data;
    } else return undefined;
}

export async function deleteIp(deleteIp: AllowlistRequest) {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    if (username && password) {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify(deleteIp),
            }
        );
        const json_data = (await response.json()) as AllowlistResponse;
        return json_data;
    } else return undefined;
}
