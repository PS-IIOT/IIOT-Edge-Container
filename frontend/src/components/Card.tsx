// import { StatusMachine } from './StatusMachine';
import { Machine } from '../models/machine.model';
export interface CardProps {
    machineData: Machine;
    className?: string;
}

export const Card = ({ machineData }: CardProps) => {
    return (
        <div className="flex-col justify-between h-min bg-ColorCardBackground rounded-lg shadow-md shadow-black">
            <CardHeader machineData={machineData} />

            <div className="flex flex-col justify-center items-center p-2">
                <CardTemperature machineData={machineData} />
                <div className="flex justify-center text-white text-2xl mt-4">
                    cycle:&nbsp;
                    <span className="italic">{machineData.cycle}</span>
                </div>
                <div className="flex justify-center w-full rounded-b-lg text-white mt-4">
                    uptime:{' '}
                    {new Date(machineData.uptime * 1000)
                        .toISOString()
                        .slice(11, 19)}
                </div>
                <div className="flex justify-center w-full rounded-b-lg text-white mt-4">
                    last timestamp:{' '}
                    {new Date(machineData.ts).toLocaleString('de-DE')}
                </div>
            </div>
        </div>
    );
};

const CardHeader = ({ machineData }: CardProps) => {
    return (
        <div className="bg-ColorCardTopBottom w-full h-12 rounded-t-md">
            <div id="wrapper" className="flex items-center h-full rounded-t-md">
                <div id="left" className="flex-1">
                    <h3 className="text-black font-bold text-xl p-2">
                        {machineData.serialnumber}
                    </h3>
                </div>
                <div id="right" className="p-2">
                    {machineData.offline ? (
                        <div className="m-3">
                            <p className="text-gray-500 font-bold italic">
                                TCP Off
                            </p>
                        </div>
                    ) : (
                        <div className="m-3">
                            <p className="text-green-400 font-bold italic">
                                TCP On
                            </p>
                        </div>
                        // <StatusMachine
                        //     warning={machineData.warning}
                        //     error={machineData.error}
                        // />
                    )}
                </div>
            </div>
        </div>
    );
};

const CardTemperature = ({ machineData }: CardProps) => {
    return (
        <div
            className={`flex justify-center items-center w-full font-bold text-4xl ${
                machineData.warning
                    ? machineData.error
                        ? 'text-red-500'
                        : 'text-orange-500'
                    : 'text-green-400'
            }`}
        >
            {machineData.temp.toPrecision(4)}
            °C
        </div>
    );
};
