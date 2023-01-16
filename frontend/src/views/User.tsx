import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { useInterval } from '../hooks/useInterval';
import { MachineResponse } from '../models/machine-response.model';
import { getAllMachines } from '../services/machine.service';

const test = {
    _id: {
        $oid: '123ahuf124',
    },
    cycle: 0,
    error: false,
    // error: true,
    serialnumber: 'Testmachine',

    temp: 50,
    ts: '2022-11-28T20:14:05.077Z',
    uptime: 0,
    warning: false,
    // warning: true,
    offline: false,
    // offline: true,
    errorlog: [
        // {
        //     _id: {
        //         $oid: '123ahuf124',
        //     },
        //     errormsg: 'TestError',
        //     id: 1,
        // },
    ],
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
        <div className="flex gap-3 justify-center items-center h-full flex-wrap py-3 overflow-y-scroll">
            {machines?.length ? (
                machines.map((machine) => (
                    <Card key={machine._id.$oid} machineData={machine} />
                ))
            ) : (
                <>{/* <Card machineData={test} /> */}</> // Testmachine
            )}
        </div>
    );
};
