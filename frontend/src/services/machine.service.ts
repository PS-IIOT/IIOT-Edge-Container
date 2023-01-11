import { MachineResponse } from '../models/machine-response.model';

export async function getAllMachines(): Promise<MachineResponse[]> {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/machines`
    );
    console.log('Responst from getAllMachines: ', response);
    const json_data = (await response.json()) as MachineResponse[];
    return json_data;
}
