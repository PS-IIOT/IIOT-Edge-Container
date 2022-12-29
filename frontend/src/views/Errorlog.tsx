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
        <div className="flex-1 flex flex-col items-center">
            <h1 className="text-4xl font-bold m-2">Errorlog</h1>
            <div className="w-2/4 p-2">
                {errorlog ? (
                    errorlog.map((error) => (
                        <ErrorItem key={error.id} error={error} />
                    ))
                ) : (
                    <p>Loading</p>
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
                    <span className="not-italic text-2xl">{error.id}</span>
                </div>
            </header>
            <div className="p-2">
                <p>{error.errormsg}</p>
            </div>
        </div>
    );
};
