import {
    faCog,
    faGlobe,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInterval } from '../hooks/useInterval';
import { ErrorlogResponse } from '../models/errorlog-response.model';
import { getAllErrors } from '../services/errorlog.service';

const test = [
    {
        _id: {
            $oid: 'test1',
        },
        errormsg: 'testError',
        errorcode: 41,
        machine: 'test',
    },
    {
        _id: {
            $oid: 'test2',
        },
        errormsg: 'testError',
        errorcode: 1,
        machine: 'test',
    },
];

export const HeaderComponent = () => {
    const [allErrors, setallErrors] = useState<ErrorlogResponse[]>(test);
    const [wwhStatus, setWwhStatus] = useState<boolean>(true);

    useEffect(() => {
        void getAllErrors().then((allErrors) => setallErrors(allErrors));
    }, []);

    useInterval(async () => {
        const data = await getAllErrors();
        setallErrors(data);
        if (data.find((element) => element.errorcode === 41)) {
            setWwhStatus(false);
        }
    }, 10000);
    return (
        <div className="flex justify-between items-center w-11/12 mx-auto rounded-xl drop-shadow-xl shadow-md shadow-grey h-20 bg-slate-200">
            <div className="w-auto h-auto m-5">
                <span className="font-bold text-4xl italic text-slate-400 drop-shadow-2xl">
                    <Link to="/">
                        <span className="hover:text-slate-500">IRF 1000</span>
                    </Link>
                </span>
            </div>
            <div>
                <ClockComponent />
            </div>
            <div className="flex justify-around items-center">
                <Link to="/ErrorlogUser">
                    <div className="group">
                        {allErrors.length ? (
                            <div className="mr-8 positon relative flex justify-start">
                                <div className="flex justify-center items-center bg-black tezt-yellow-400 drop-shadow-2xl w-2 h-5 position relative">
                                    <FontAwesomeIcon
                                        className="text-yellow-300 group-hover:text-yellow-400 text-3xl"
                                        icon={faTriangleExclamation}
                                    />
                                </div>
                                <div className="bg-yellow-300 group-hover:bg-yellow-400 position absolute left-4 bottom-4 flex justify-center item-center top- text-xs w-4 h-4 rounded-full">
                                    {allErrors.length}
                                </div>
                            </div>
                        ) : (
                            <div className="m-5 flex justify-center items-center text-slate-400 drop-shadow-2xl w-8 h-8">
                                <FontAwesomeIcon
                                    className="hover:text-slate-500 text-3xl"
                                    icon={faTriangleExclamation}
                                />
                            </div>
                        )}
                    </div>
                </Link>

                <Link to="/Login">
                    <div className="flex justify-center items-center text-slate-400 drop-shadow-2xl w-8 h-8">
                        <FontAwesomeIcon
                            className="hover:text-slate-500 text-3xl"
                            icon={faCog}
                        />
                    </div>
                </Link>

                <div
                    className={
                        wwhStatus
                            ? 'flex justify-center items-center bg-ColorStatusConnectionOnline w-14 h-14 m-5 rounded-2xl'
                            : 'flex justify-center items-center bg-ColorStatusConnectionOffline w-14 h-14 m-5 rounded-2xl'
                    }
                >
                    <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-3xl text-white"
                    />
                </div>
            </div>
        </div>
    );
};

const ClockComponent = () => {
    const [date, setDate] = useState(new Date());

    useInterval(() => {
        setDate(new Date());
    }, 1000);

    return (
        <div className="text-slate-400 text-xl font-bold w-44 mx-auto flex items-center justify-center">
            {date.toLocaleTimeString()}
        </div>
    );
};
