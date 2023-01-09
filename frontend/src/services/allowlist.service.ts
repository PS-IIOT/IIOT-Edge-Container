import { AllowlistRequest } from '../models/allowlist-request.model';
import { AllowlistResponse } from '../models/allowlist-response.model';

export async function getAllowlist(): Promise<AllowlistResponse> {
    const tmpUser = {
        username: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password'),
    };

    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(
                    tmpUser.username + ':' + tmpUser.password
                )}`,
            },
        }
    );
    const json_data = (await response.json()) as AllowlistResponse;
    return json_data;
}

export async function insertIP(addIP: AllowlistRequest) {
    const tmpUser = {
        username: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password'),
    };

    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(
                    tmpUser.username + ':' + tmpUser.password
                )}`,
            },
            body: JSON.stringify(addIP),
        }
    );
    const json_data = (await response.json()) as AllowlistResponse;
    return json_data;
}
export async function deleteIp(deleteIp: AllowlistRequest) {
    const tmpUser = {
        username: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password'),
    };

    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(
                    tmpUser.username + ':' + tmpUser.password
                )}`,
            },
            body: JSON.stringify(deleteIp),
        }
    );
    const json_data = (await response.json()) as AllowlistResponse;
    return json_data;
}
