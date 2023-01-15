import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { ErrorlogResponse } from '../models/errorlog-response.model';
import { getAllErrors } from '../services/errorlog.service';

export const Errorlog = () => {
    const [errorlog, setErrorlog] = useState<ErrorlogResponse[]>();

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
            <div className="w-full bg-slate-400 h-12 rounded-t-md flex justify-center items-center">
                <h1 className="text-white text-xl font-bold italic m-1 uppercase">
                    Errorlist
                </h1>
            </div>
            <div className="w-full p-2 mx-auto">
                {errorlog?.length ? (
                    errorlog.map((error) => (
                        <ErrorItem key={error.id} error={error} />
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
        <div className="flex flex-col bg-slate-300">
            <header className="bg-red-400 p-2 font-bold text-xl italic flex justify-between rounded-t-md">
                <div id="left">{error.machine}</div>
                <div id="right">
                    <span className="text-base text-gray-700 font-normal">
                        ErrorCode:
                    </span>{' '}
                    <span className="not-italic text-2xl">
                        {error.errorcode}
                    </span>
                </div>
            </header>
            <div className="p-2">
                <p>{error.errormsg}</p>
            </div>
        </div>
    );
};
