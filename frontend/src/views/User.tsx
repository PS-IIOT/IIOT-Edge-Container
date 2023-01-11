import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Card } from '../components/Card';
import { getAllMachines } from '../services/machine.service';
import { MachineResponse } from '../models/machine-response.model';

const test = {
    _id: {
        $oid: '123ahuf124',
    },
    cycle: 0,
    error: false,
    serialnumber: 'Testmachine',

    temp: 0,
    ts: '2022-11-28T20:14:05.077Z',
    uptime: 0,
    warning: false,
    offline: true,
    errorlog: [(1, 3)],
};
export const User = () => {
    const [machines, setMachines] = useState<MachineResponse[]>();

    useEffect(() => {
        document.title = 'User-Panel';
        void getAllMachines().then((data) => setMachines(data));
    }, []);

    useInterval(async () => {
        const data = await getAllMachines();
        setMachines(data);
    }, 10000);
    return (
        <div className="flex-1 m-5 p-5 overflow-y-auto flex justify-around flex-wrap content-center gap-5">
            {machines ? (
                machines.map((machine) => (
                    <Card key={machine._id.$oid} machineData={machine} />
                ))
            ) : (
                <>
                    <Card machineData={test} />
                </>
            )}
        </div>
    );
};
