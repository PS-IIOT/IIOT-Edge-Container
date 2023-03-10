import { ErrorlogResponse } from './errorlog-response.model';

export type MachineResponse = {
    _id: {
        $oid: string;
    };
    cycle: number;
    error: boolean;
    serialnumber: string;
    temp: number;
    ts: string;
    uptime: number;
    warning: boolean;
    offline: boolean;
    errorlog: ErrorlogResponse[];
};
