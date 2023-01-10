import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

export async function loginUser(
    userCredentials: LoginRequest
): Promise<LoginResponse> {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials),
        }
    );
    const json_data = (await response.json()) as LoginResponse;
    return json_data;
}
