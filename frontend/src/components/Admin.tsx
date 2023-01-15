import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AllowlistRequest } from '../models/allowlist-request.model';
import { AllowlistResponse } from '../models/allowlist-response.model';
import {
    deleteIp,
    getAllowlist,
    insertIP,
} from '../services/allowlist.service';

export const Admin = () => {
    const [allowlist, setAllowlist] = useState<AllowlistResponse>();

    useEffect(() => {
        document.title = 'Admin-Panel';
        void getAllowlist().then((allowlist) => setAllowlist(allowlist));
    }, []);

    return (
        <div className="h-full flex flex-col bg-slate-200 rounded-lg drop-shadow-xl shadow-md shadow-grey">
            <div className="bg-slate-400 rounded-t-md flex justify-center items-center py-2">
                <h1 className="text-white text-xl font-bold italic m-1 uppercase">
                    Allowlist
                </h1>
            </div>
            <div className="grow overflow-y-auto bg-slate-200">
                {allowlist ? (
                    <AllowlistComponent
                        allowlist={allowlist}
                        setAllowList={setAllowlist}
                    />
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div>
                <AddIp setAllowList={setAllowlist} />
            </div>
        </div>
    );
};

type AllowlistProps = {
    allowlist: AllowlistResponse;
    setAllowList: (allowlist: AllowlistResponse) => void;
};

const AllowlistComponent = ({ allowlist, setAllowList }: AllowlistProps) => (
    <div className="flex flex-col items-center text-slate-600 [&>*:nth-child(even)]:bg-slate-300">
        {allowlist.Ip_Adresses.map((ip, index) => {
            return (
                <div
                    className="p-2 flex items-center justify-between w-full px-14 "
                    key={index + 1}
                >
                    <div className="">
                        <label className="text-slate-500 mt-2 font-bold">
                            {index + 1}.
                        </label>
                    </div>

                    <div className="">{ip}</div>
                    <DeleteIp setAllowList={setAllowList} delIP={ip} />
                </div>
            );
        })}
    </div>
);
type deleteIP = {
    delIP: string;
    setAllowList: (allowlist: AllowlistResponse) => void;
};
const DeleteIp = ({ delIP, setAllowList }: deleteIP) => {
    const { handleSubmit } = useForm<AllowlistRequest>();
    const handleRemove = async (data: AllowlistRequest) => {
        const result = confirm(
            `Are you sure you want to delete IP-Address: ${delIP} `
        );
        if (result) {
            data.ip = delIP;
            console.log(data);
            const newAllowlist = await deleteIp(data);
            if (newAllowlist) {
                setAllowList(newAllowlist);
            }
        }
    };
    return (
        <button onClick={handleSubmit(handleRemove)}>
            <div className="ml-2 text-xl text-slate-400 hover:text-red-500">
                <FontAwesomeIcon icon={faTrashCan} />
            </div>
        </button>
    );
};
type AddIpProps = {
    setAllowList: (allowlist: AllowlistResponse) => void;
};

const AddIp = ({ setAllowList }: AddIpProps) => {
    const { register, handleSubmit } = useForm<AllowlistRequest>();
    const onSubmit = async (data: AllowlistRequest) => {
        const newAllowlist = await insertIP(data);
        if (newAllowlist) {
            setAllowList(newAllowlist);
        }
    };

    return (
        <div className="w-full bg-slate-400 rounded-b-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex">
                <input
                    className="flex-1 bg-slate-500 text-white placeholder-slate-100 outline-none focus:bg-slate-500 p-2 rounded-bl-md"
                    placeholder="IP: xxx.xxx.xxx.xxx"
                    type="text"
                    {...register('ip', {
                        required: true,
                        minLength: 7,
                        maxLength: 15,
                        pattern:
                            /^(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
                    })}
                />
                <button
                    className="bg-slate-400 flex items-center justify-center p-3 px-5 hover:bg-green-500 rounded-br-md"
                    type="submit"
                >
                    <FontAwesomeIcon
                        className="text-slate-200 text-2xl"
                        icon={faSquarePlus}
                    />
                </button>
            </form>
        </div>
    );
};
