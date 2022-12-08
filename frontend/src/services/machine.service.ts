import { Machine } from '../models/machine.model';

export async function getAllMachines(): Promise<Machine[]> {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines`
    );
    const json_data = (await response.json()) as Machine[];
    return json_data;
}
