import { Allowlist } from '../models/allowlist-response.model';
import { MachineResponse } from '../models/machine-response.model';

export async function getAllMachines(): Promise<MachineResponse[]> {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines`
    );
    const json_data = (await response.json()) as MachineResponse[];
    return json_data;
}

export async function getAllowlist(): Promise<Allowlist> {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines/allowlist`
    );
    const json_data = (await response.json()) as Allowlist;
    return json_data;
}
