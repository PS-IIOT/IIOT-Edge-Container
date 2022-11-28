import { Card } from './Cards';
const MachineData = [
    { MachineID: '1', Temparture: 30, cycle: 212, runTime: '34:22:30' },
    { MachineID: '2', Temparture: 30, cycle: 232342, runTime: '22:49:30' },
    { MachineID: '3', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    { MachineID: '4', Temparture: 30, cycle: 212, runTime: '34:22:30' },
    { MachineID: '5', Temparture: 30, cycle: 232342, runTime: '22:49:30' },
    { MachineID: '6', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    { MachineID: '7', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    { MachineID: '8', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    { MachineID: '9', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    // { MachineID: '10', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    // { MachineID: '6', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    // { MachineID: '7', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    // { MachineID: '8', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    // { MachineID: '9', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
    // { MachineID: '10', Temparture: 30, cycle: 22314123, runTime: '03:49:30' },
];
export const MainComponent = () => {
    return (
        <div className="h-screen overflow-y-scroll flex flex-wrap justify-evenly">
            {MachineData.map((machine) => (
                <Card
                    key={machine.MachineID}
                    machineID={machine.MachineID}
                    temparture={machine.Temparture}
                    cycles={machine.cycle}
                    upTime={machine.runTime}
                />
            ))}
        </div>
    );
};
