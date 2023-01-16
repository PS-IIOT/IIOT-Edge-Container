import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { ErrorlogResponse } from '../models/errorlog-response.model';
import { getAllErrors } from '../services/errorlog.service';

export const Errorlog = () => {
    const [errorlog, setErrorlog] = useState<ErrorlogResponse[]>([]);

    useEffect(() => {
        document.title = 'Errorlog-Panel';
        void getAllErrors().then((data) => setErrorlog(data));
    }, []);

    useInterval(async () => {
        const data = await getAllErrors();
        setErrorlog(data);
    }, 10000);

    return (
        <div className="grow h-full flex flex-col justify-arround bg-slate-200 rounded-lg drop-shadow-xl shadow-md shadow-grey">
            <div className="w-full bg-slate-400 py-2 rounded-t-md flex justify-center items-center">
                <h1 className="text-white text-xl font-bold italic m-1 uppercase">
                    Errorlist
                </h1>
            </div>
            <div className="w-full p-5 mx-auto flex flex-col gap-5 overflow-y-auto">
                {errorlog.length ? (
                    errorlog.map((error, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-4 text-xl font-bold italic text-slate-600">
                                {index + 1}.
                            </span>
                            <ErrorItem key={error.errorcode} error={error} />
                        </div>
                    ))
                ) : (
                    <div className="border-2 border-gray-400 rounded-md h-20 flex justify-center items-center">
                        <div className="text-md text-slate-500 italic">
                            <span className="mr-2">No Errors</span>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

type ErrorItemProps = {
    error: ErrorlogResponse;
};

const ErrorItem = ({ error }: ErrorItemProps) => {
    return (
        <div className="grow flex flex-col">
            <header className="bg-red-400 font-bold text-xl italic flex justify-between rounded-t-md">
                <div id="left" className="p-2">
                    {error.machine}
                </div>
                <div
                    id="right"
                    className="bg-red-400 overflow-hidden p-2 rounded-t-md"
                >
                    <span className="text-base text-slate-600 font-bold">
                        Error-Code
                    </span>{' '}
                    <span className="not-italic text-2xl text-slate-700">
                        {error.errorcode}
                    </span>
                </div>
            </header>
            <div className="p-2 bg-slate-300 rounded-b-md">
                <span>{error.errormsg}</span>
            </div>
        </div>
    );
};
