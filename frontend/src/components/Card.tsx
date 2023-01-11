// import { StatusMachine } from './StatusMachine';
import { useState, useEffect } from 'react';
import { ErrorlogResponse } from '../models/errorlog-response.model';
import { MachineResponse } from '../models/machine-response.model';
import { getOneMachine } from '../services/errorlog.service';
import { getAllMachines } from '../services/machine.service';
export interface CardProps {
    machineData: MachineResponse;
    // className?: string;
}

export const Card = ({ machineData }: CardProps) => {
    return (
        <div>
            {machineData.offline ? (
                <div className="flex-col justify-between w-64 h-min bg-slate-200 rounded-lg shadow-md shadow-grey opacity-75">
                    <CardHeader machineData={machineData} />

                    <div className="flex flex-col justify-end p-2">
                        <CardTemperature machineData={machineData} />
                        <div className="flex justify-end text-slate-500 text-2xl mt-4 ">
                            &nbsp;
                            <span>{machineData.cycle}</span>
                            <svg
                                className="w-6 h-6 fill-slate-500 mt-1 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M224 96c38.4 0 73.7 13.5 101.3 36.1l-32.6 32.6c-4.6 4.6-5.9 11.5-3.5 17.4s8.3 9.9 14.8 9.9H416c8.8 0 16-7.2 16-16V64c0-6.5-3.9-12.3-9.9-14.8s-12.9-1.1-17.4 3.5l-34 34C331.4 52.6 280.1 32 224 32c-10.9 0-21.5 .8-32 2.3V99.2c10.3-2.1 21-3.2 32-3.2zM100.1 154.7l32.6 32.6c4.6 4.6 11.5 5.9 17.4 3.5s9.9-8.3 9.9-14.8V64c0-8.8-7.2-16-16-16H32c-6.5 0-12.3 3.9-14.8 9.9s-1.1 12.9 3.5 17.4l34 34C20.6 148.6 0 199.9 0 256c0 10.9 .8 21.5 2.3 32H67.2c-2.1-10.3-3.2-21-3.2-32c0-38.4 13.5-73.7 36.1-101.3zM445.7 224H380.8c2.1 10.3 3.2 21 3.2 32c0 38.4-13.5 73.7-36.1 101.3l-32.6-32.6c-4.6-4.6-11.5-5.9-17.4-3.5s-9.9 8.3-9.9 14.8V448c0 8.8 7.2 16 16 16H416c6.5 0 12.3-3.9 14.8-9.9s1.1-12.9-3.5-17.4l-34-34C427.4 363.4 448 312.1 448 256c0-10.9-.8-21.5-2.3-32zM224 416c-38.4 0-73.7-13.5-101.3-36.1l32.6-32.6c4.6-4.6 5.9-11.5 3.5-17.4s-8.3-9.9-14.8-9.9H32c-8.8 0-16 7.2-16 16l0 112c0 6.5 3.9 12.3 9.9 14.8s12.9 1.1 17.4-3.5l34-34C116.6 459.4 167.9 480 224 480c10.9 0 21.5-.8 32-2.3V412.8c-10.3 2.1-21 3.2-32 3.2z" />
                            </svg>
                        </div>
                        <div className="flex justify-end  w-full text-slate-500 mt-4">
                            {new Date(machineData.uptime * 1000)
                                .toISOString()
                                .slice(11, 19)}
                            <svg
                                className="w-6 h-6 fill-slate-500 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" />
                            </svg>
                        </div>
                        <div className="flex justify-end w-full rounded-b-lg text-slate-500 mt-4">
                            {new Date(machineData.ts).toLocaleString('de-DE')}
                            <svg
                                className="w-6 h-6 ml-2 fill-slate-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
                            </svg>{' '}
                        </div>
                    </div>
                    <CardFooter machineData={machineData}></CardFooter>
                </div>
            ) : (
                <div className="flex-col justify-between w-64 h-min bg-slate-200 rounded-lg shadow-md shadow-grey ">
                    <CardHeader machineData={machineData} />

                    <div className="flex flex-col justify-end p-2">
                        <CardTemperature machineData={machineData} />
                        <div className="flex justify-end text-slate-500 text-2xl mt-4 ">
                            &nbsp;
                            <span>{machineData.cycle}</span>
                            <svg
                                className="w-6 h-6 fill-slate-500 mt-1 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M224 96c38.4 0 73.7 13.5 101.3 36.1l-32.6 32.6c-4.6 4.6-5.9 11.5-3.5 17.4s8.3 9.9 14.8 9.9H416c8.8 0 16-7.2 16-16V64c0-6.5-3.9-12.3-9.9-14.8s-12.9-1.1-17.4 3.5l-34 34C331.4 52.6 280.1 32 224 32c-10.9 0-21.5 .8-32 2.3V99.2c10.3-2.1 21-3.2 32-3.2zM100.1 154.7l32.6 32.6c4.6 4.6 11.5 5.9 17.4 3.5s9.9-8.3 9.9-14.8V64c0-8.8-7.2-16-16-16H32c-6.5 0-12.3 3.9-14.8 9.9s-1.1 12.9 3.5 17.4l34 34C20.6 148.6 0 199.9 0 256c0 10.9 .8 21.5 2.3 32H67.2c-2.1-10.3-3.2-21-3.2-32c0-38.4 13.5-73.7 36.1-101.3zM445.7 224H380.8c2.1 10.3 3.2 21 3.2 32c0 38.4-13.5 73.7-36.1 101.3l-32.6-32.6c-4.6-4.6-11.5-5.9-17.4-3.5s-9.9 8.3-9.9 14.8V448c0 8.8 7.2 16 16 16H416c6.5 0 12.3-3.9 14.8-9.9s1.1-12.9-3.5-17.4l-34-34C427.4 363.4 448 312.1 448 256c0-10.9-.8-21.5-2.3-32zM224 416c-38.4 0-73.7-13.5-101.3-36.1l32.6-32.6c4.6-4.6 5.9-11.5 3.5-17.4s-8.3-9.9-14.8-9.9H32c-8.8 0-16 7.2-16 16l0 112c0 6.5 3.9 12.3 9.9 14.8s12.9 1.1 17.4-3.5l34-34C116.6 459.4 167.9 480 224 480c10.9 0 21.5-.8 32-2.3V412.8c-10.3 2.1-21 3.2-32 3.2z" />
                            </svg>
                        </div>
                        <div className="flex justify-end  w-full text-slate-500 mt-4">
                            {new Date(machineData.uptime * 1000)
                                .toISOString()
                                .slice(11, 19)}
                            <svg
                                className="w-6 h-6 fill-slate-500 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" />
                            </svg>
                        </div>
                        <div className="flex justify-end w-full rounded-b-lg text-slate-500 mt-4">
                            {new Date(machineData.ts).toLocaleString('de-DE')}
                            <svg
                                className="w-6 h-6 ml-2 fill-slate-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
                            </svg>{' '}
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
                        <div className="m-3">
                            <p className="text-gray-100 font-bold italic">
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
        <div>
            {machineData.offline ? (
                <div
                    className={`flex justify-end items-center w-full font-bold text-4xl ${'text-slate-400'}`}
                >
                    {machineData.temp.toPrecision(2)}
                    <div>
                        <svg
                            className="w-6 h-6 mt-1 fill-slate-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V152c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z" />
                        </svg>
                    </div>
                </div>
            ) : (
                <div
                    className={`flex justify-end items-center w-full font-bold text-4xl ${
                        machineData.warning
                            ? machineData.error
                                ? 'text-red-500'
                                : 'text-orange-500'
                            : 'text-green-400'
                    }`}
                >
                    {machineData.temp.toPrecision(2)}
                    <div>
                        <svg
                            className="w-6 h-6 mt-1 fill-slate-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V152c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

const CardFooter = ({ machineData }: CardProps) => {
    const [machineError, setMachineError] = useState(machineData.errorlog);
    useEffect(() => {
        setMachineError(machineData.errorlog);
    }, []);
    return (
        <div>
            {machineData.offline ? (
                <div className="w-full h-7 bg-slate-400"></div>
            ) : (
                <div>
                    {machineError.length ? (
                        <div className="flex justify-center items-center w-full h-7 bg-red-500">
                            {' '}
                            <div className="flex justify-center items-center fill-yellow-400 drop-shadow-2xl w-6 h-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
                                </svg>
                            </div>
                            <div className="text-xs mb-2 text-slate-100">
                                {machineData.errorlog.length}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-7 bg-green-400"></div>
                    )}
                </div>
            )}
        </div>
    );
};
