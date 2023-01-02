import { useEffect, useState } from 'react';
import { AllowlistRequest } from '../models/allowlist-request.model';
import { Allowlist } from '../models/allowlist-response.model';
import { getAllowlist } from '../services/machine.service';
import { insertIP, deleteIp } from '../services/allowlist.service';
import { useForm } from 'react-hook-form';

export const Admin = () => {
    const [allowlist, setAllowlist] = useState<Allowlist>();

    useEffect(() => {
        document.title = 'Admin-Panel';
        void getAllowlist().then((allowlist) => setAllowlist(allowlist));
    }, []);

    return (
        <div className="h-3/4 w-60 ml-14 mt-8 positon relative flex flex-col justify-arround bg-slate-300 rounded-lg shadow-md shadow-black">
            <div
                id="allowListHeader"
                className="w-full bg-slate-400 h-10 rounded-t-md position absolute top-0 justify-center items-center"
            >
                <h1 className="position absolute left-20 top-1 text-slate-100 text-xl">
                    Allow List
                </h1>
            </div>
            <div className="overflow-auto">
                {allowlist ? (
                    <AllowlistComponent
                        allowlist={allowlist}
                        setAllowList={setAllowlist}
                    />
                ) : (
                    <label htmlFor=""></label>
                )}
            </div>
            <div className="postion absolute left-0 bottom-0 right-0">
                <AddIp setAllowList={setAllowlist} />
            </div>
        </div>
    );
};

type AllowlistProps = {
    allowlist: Allowlist;
    setAllowList: (allowlist: Allowlist) => void;
};

const AllowlistComponent = ({ allowlist, setAllowList }: AllowlistProps) => (
    <div className="flex flex-col mt-6 ml-4">
        {allowlist.Ip_Adresses.map((ip, index) => {
            return (
                <div className="flex mt-2" key={index + 1}>
                    <div className="w-8 mt-2">
                        <label className="text-slate-500 mt-2 font-bold">
                            {index + 1}.
                        </label>
                    </div>

                    <input
                        className="w-36 p-1 border-2 rounded-md h-auto text-slate-500"
                        value={ip}
                        disabled={true}
                    />
                    <DeleteIp setAllowList={setAllowList} delIP={ip} />
                </div>
            );
        })}
        {/* <AddIp setAllowList={setAllowList} /> */}
    </div>
);
type deleteIP = {
    delIP: string;
    setAllowList: (allowlist: Allowlist) => void;
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
            setAllowList(newAllowlist);
        }
    };
    return (
        <button onClick={handleSubmit(handleRemove)}>
            <div className="w-5 h-5 ml-2 fill-white hover:fill-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg>
            </div>
        </button>
    );
};
type AddIpProps = {
    setAllowList: (allowlist: Allowlist) => void;
};

const AddIp = ({ setAllowList }: AddIpProps) => {
    const { register, handleSubmit } = useForm<AllowlistRequest>();
    const onSubmit = async (data: AllowlistRequest) => {
        const newAllowlist = await insertIP(data);
        setAllowList(newAllowlist);
    };

    return (
        <div className="w-full bg-slate-400 rounded-b-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex">
                <input
                    className="flex-1 rounded-md m-2 bg-slate-500 w-28 border-2 border-white placeholder:text-white justify-center text-center text-slate-100"
                    placeholder=" IP: 0.0.0.0 "
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
                    className="flex w-8 justify-center text-center m-2 border-white border-2 rounded-md text-slate-100 bg-slate-500 hover:bg-green-500 text-lg pb-1"
                    type="submit"
                >
                    +
                </button>
            </form>
        </div>
    );
};
