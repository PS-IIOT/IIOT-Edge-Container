import { AllowlistRequest } from '../models/allowlist-request.model';
import { Allowlist } from '../models/allowlist-response.model';

export async function insertIP(addIP: AllowlistRequest) {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addIP),
        }
    );
    const json_data = (await response.json()) as Allowlist;
    return json_data;
}
export async function deleteIp(deleteIp: AllowlistRequest) {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteIp),
        }
    );
    const json_data = (await response.json()) as Allowlist;
    return json_data;
}
