import { ErrorlogResponse } from '../models/errorlog-response.model';

export async function getAllErrors(): Promise<ErrorlogResponse[]> {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/errorlog`
    );
    const json_data = (await response.json()) as ErrorlogResponse[];
    return json_data;
}
