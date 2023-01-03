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
        <div className="h-4/5 w-8/12 ml-14 mt-8 positon relative flex flex-col justify-arround bg-slate-300 rounded-lg shadow-md shadow-black">
            <div
                id="allowListHeader"
                className="w-full bg-slate-400 h-10 rounded-t-md justify-center items-center"
            >
                <h1 className="flex justify-center items-center text-slate-100 text-xl m-1">
                    Error list
                </h1>
            </div>
            <div className="w-2/4 p-2">
                {errorlog ? (
                    errorlog.map((error) => (
                        <ErrorItem key={error.id} error={error} />
                    ))
                ) : (
                    <p className="justify-center">Loading...</p>
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
