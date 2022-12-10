export type Machine = {
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
};
