import {
    faCalendar,
    faCircleCheck,
    faClock,
} from '@fortawesome/free-regular-svg-icons';
import {
    faSync,
    faTemperature3,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { MachineResponse } from '../models/machine-response.model';
export interface CardProps {
    machineData: MachineResponse;
}

export const Card = ({ machineData }: CardProps) => {
    return (
        <div>
            {machineData.offline ? (
                <div className="flex-col w-80 bg-slate-200 rounded-lg shadow-md shadow-grey opacity-30 italic">
                    <CardHeader machineData={machineData} />

                    <div className="flex flex-col p-2 w-10/12 mx-auto">
                        <CardTemperature machineData={machineData} />
                        <div className="flex justify-end items-center text-slate-500">
                            &nbsp;
                            <span className="text-lg mr-1">
                                {machineData.cycle}
                            </span>
                            <div className="w-8 flex items-center justify-center">
                                <FontAwesomeIcon
                                    className="text-2xl p-1 w-6"
                                    icon={faSync}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center text-slate-500">
                            <span className="text-lg mr-1">
                                {' '}
                                {new Date(machineData.uptime * 1000)
                                    .toISOString()
                                    .slice(11, 19)}
                            </span>
                            <div className="w-8 flex items-center justify-center">
                                <FontAwesomeIcon
                                    className="text-2xl p-1"
                                    icon={faClock}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center text-slate-500">
                            <span className="text-lg mr-1">
                                {new Date(machineData.ts).toLocaleString(
                                    'de-DE'
                                )}
                            </span>
                            <div className="w-8 flex items-center justify-center">
                                <FontAwesomeIcon
                                    className="text-2xl p-1"
                                    icon={faCalendar}
                                />
                            </div>
                        </div>
                    </div>
                    <CardFooter machineData={machineData}></CardFooter>
                </div>
            ) : (
                <div className="flex-col items-center w-80 bg-slate-200 rounded-lg shadow-md shadow-grey ">
                    <CardHeader machineData={machineData} />

                    <div className="flex flex-col p-2 w-10/12 mx-auto">
                        <CardTemperature machineData={machineData} />
                        <div className="flex justify-end items-center text-slate-500">
                            &nbsp;
                            <span className="text-lg mr-1">
                                {machineData.cycle}
                            </span>
                            <div className="w-8 flex items-center justify-center">
                                <FontAwesomeIcon
                                    className="text-2xl p-1 w-6"
                                    icon={faSync}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center text-slate-500">
                            <span className="text-lg mr-1">
                                {' '}
                                {new Date(machineData.uptime * 1000)
                                    .toISOString()
                                    .slice(11, 19)}
                            </span>
                            <div className="w-8 flex items-center justify-center">
                                <FontAwesomeIcon
                                    className="text-2xl p-1"
                                    icon={faClock}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center text-slate-500">
                            <span className="text-lg mr-1">
                                {new Date(machineData.ts).toLocaleString(
                                    'de-DE'
                                )}
                            </span>
                            <div className="w-8 flex items-center justify-center">
                                <FontAwesomeIcon
                                    className="text-2xl p-1"
                                    icon={faCalendar}
                                />
                            </div>
                        </div>
                    </div>
                    <CardFooter machineData={machineData}></CardFooter>
                </div>
            )}
        </div>
    );
};

const CardHeader = ({ machineData }: CardProps) => {
    return (
        <div className="bg-slate-400 w-full h-12 rounded-t-md">
            <div id="wrapper" className="flex items-center h-full rounded-t-md">
                <div id="left" className="flex-1">
                    <h3 className="text-slate-100 font-bold text-xl p-2">
                        {machineData.serialnumber}
                    </h3>
                </div>
                <div id="right" className="p-2">
                    {machineData.offline ? (
                        <div className="m-3 flex items-center justify-center">
                            <p className="text-slate-700">TCP-Off</p>
                        </div>
                    ) : (
                        <div className="m-3 flex items-center justify-center">
                            <p className="text-green-400 font-bold italic">
                                TCP-On
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CardTemperature = ({ machineData }: CardProps) => {
    return (
        <div className="py-2">
            {machineData.offline ? (
                <div className="flex justify-end items-center">
                    <span className="font-bold text-4xl opacity-30">
                        {machineData.temp.toFixed(2)}
                    </span>

                    <div className="w-8 flex items-center justify-center">
                        <FontAwesomeIcon
                            className="text-slate-500 text-3xl p-1"
                            icon={faTemperature3}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex justify-end items-center">
                    <span
                        className={`font-bold text-4xl ${
                            machineData.warning
                                ? machineData.error
                                    ? 'text-red-500'
                                    : 'text-orange-500'
                                : 'text-green-400'
                        }`}
                    >
                        {machineData.temp.toFixed(2)}
                    </span>
                    <div className="w-8 flex items-center justify-center">
                        <FontAwesomeIcon
                            className="text-slate-500 text-3xl p-1"
                            icon={faTemperature3}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const CardFooter = ({ machineData }: CardProps) => {
    const navigate = useNavigate();
    const handleOnclick = () => {
        navigate('/ErrorlogUser');
    };
    return (
        <div>
            {machineData.offline ? (
                <div className="w-full h-8 bg-slate-400 rounded-b-md"></div>
            ) : (
                <div>
                    {machineData.errorlog.length ? (
                        <button
                            className="flex justify-center items-end w-full h-10 bg-red-500 rounded-b-md hover:bg-red-600"
                            onClick={handleOnclick}
                        >
                            <p className="self-center text-white font-bold italic">
                                machine error
                            </p>
                            <div className="relative m-1">
                                <div>
                                    <FontAwesomeIcon
                                        className="text-white text-xl"
                                        icon={faTriangleExclamation}
                                    />
                                </div>

                                <div className="absolute -top-2 -right-2 bg-white rounded-full w-3 h-3 flex justify-center items-center text-xs">
                                    {machineData.errorlog.length}
                                </div>
                            </div>
                        </button>
                    ) : (
                        <div className="flex justify-center items-center w-full h-10 bg-green-400 rounded-b-md">
                            <span className="font-bold text-white italic">
                                machine ok{' '}
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
