// import { useEffect, useState } from 'react';
// import { Card } from './Card';
// // const MachineData = [
// //     { MachineID: '1', Temparture: 30, cycle: 212, runTime: '34:22:30' },
// //     { MachineID: '2', Temparture: 30, cycle: 232342, runTime: '22:49:30' },
// //     { MachineID: '3', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     { MachineID: '4', Temparture: 30, cycle: 212, runTime: '34:22:30' },
// //     { MachineID: '5', Temparture: 30, cycle: 232342, runTime: '22:49:30' },
// //     { MachineID: '6', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     { MachineID: '7', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     { MachineID: '8', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     { MachineID: '9', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     { MachineID: '10', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     // { MachineID: '6', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     // { MachineID: '7', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     // { MachineID: '8', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     // { MachineID: '9', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// //     // { MachineID: '10', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
// // ];

// //     {
// //     "_id": {
// //       "$oid": "638502460d95454ad123f976"
// //     },
// //     "measurement": "AX2022SIM1",
// //     "tags": {
// //       "serialnumber": "AX2022SIM1"
// //     },
// //     "values": [
// //       {
// //         "cycle": 149,
// //         "temp": 108.88888888888914,
// //         "ts": "2022-11-28T20:14:05.077Z",
// //         "uptime": 1612
// //       }
// //     ]
// //   }

// type Machine = {
//     _id: {
//         $oid: string;
//     };
//     measurement: string;
//     tags: {
//         serialnumber: string;
//     };
//     values: [
//         {
//             cycle: number;
//             temp: number;
//             ts: string;
//             uptime: number;
//         }
//     ];
// };

// export const MainComponent = () => {
//     const [maschines, setMaschines] = useState<Machine[]>([]);
//     //FIXME: use correct types
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(
//                 'http://localhost:5000/api/v1/machines'
//             );
//             const machines = await response.json();
//             console.log(machines);
//             setMaschines(machines);
//         };
//         fetchData();
//         setInterval(() => fetchData(), 10000);
//     }, []);
//     return (
//         <div className="h-screen overflow-y-scroll flex flex-wrap justify-evenly">
//             {maschines.map((machine) => (
//                 <Card
//                     key={machine._id.$oid}
//                     machineID={machine.measurement}
//                     temparture={machine.values[0].temp}
//                     cycles={machine.values[0].cycle}
//                     upTime={machine.values[0].uptime}
//                 />
//             ))}
//         </div>
//     );
// };

import { useEffect, useRef, useState } from 'react';
import { Card } from './Card';

// {
//     "_id":  {
//       "$oid": "638502460d95454ad123f976"
//     },
//     "measurement": "AX2022SIM1",
//     "tags": {
//       "serialnumber": "AX2022SIM1"
//     },
//     "values": [
//       {
//         "cycle": 149,
//         "temp": 108.88888888888914,
//         "ts": "2022-11-28T20:14:05.077Z",
//         "uptime": 1612
//       }
//     ]
// }

type Machine = {
    _id: {
        $oid: string;
    };
    measurement: string;
    tags: {
        serialnumber: string;
    };
    values: [
        {
            cycle: number;
            temp: number;
            ts: string;
            uptime: number;
        }
    ];
};

// Liste aller Konvertierten Datendeque([{'measurement': 'Micha', 'tags': {'serialnumber': 'Micha'}, 'values': [{'ts': '2022-12-01T12:15:08.486Z', 'uptime': 74, 'temp': 20.555555555555557, 'cycle': 1070}]}])

export const MainComponent = () => {
    const [machine, setMachine] = useState<Machine[]>();

    function useInterval(callback, delay: number) {
        const savedCallback = useRef();
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, [delay]);
    }

    function pollingLoop() {
        const [count, setCount] = useState(0);
        useInterval(() => {
            void fetch(`http://localhost:5000/api/v1/machines`)
                .then((response) => response.json() as Promise<Machine[]>)
                .then((json) => {
                    console.log(json);
                    // const newMachineData = parseMachines(json);
                    setMachine(json);
                });
            setCount(count + 1);
        }, 10000); // Your custom logic here    setCount(count + 1);  }, 1000);
    }

    pollingLoop();
    return (
        <div className="h-screen overflow-y-scroll flex flex-wrap justify-evenly">
            {machine ? (
                machine.map((machine) => (
                    <Card
                        key={machine._id.$oid}
                        machineID={machine.measurement}
                        temparture={machine.values[0].temp}
                        cycles={machine.values[0].cycle}
                        upTime={machine.values[0].uptime}
                    />
                ))
            ) : (
                <p>loading</p>
            )}
        </div>
    );
};
