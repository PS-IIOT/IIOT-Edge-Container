import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Card } from './Card';
import { getAllMachines } from '../services/machine.service';
import { Machine } from '../models/machine.model';

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
    offline: false,
};
export const MainComponent = () => {
    const [machines, setMachines] = useState<Machine[]>();

    useEffect(() => {
        void getAllMachines().then((data) => setMachines(data));
    }, []);

    useInterval(async () => {
        const data = await getAllMachines();
        setMachines(data);
    }, 10000);

    // useEffect(() => {
    //         const response = await fetch(
    //             `${import.meta.env.VITE_BACKEND_API_URL}/machines`
    //         );
    //         const json_data = (await response.json()) as Machine[];
    //         setMachines(json_data);
    //     }, 10000);

    //     return () => clearInterval(interval);
    // }, []);
    return (
        <div className="h-screen overflow-y-scroll flex flex-wrap justify-evenly items-center">
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
