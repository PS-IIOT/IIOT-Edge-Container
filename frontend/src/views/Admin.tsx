import { useEffect, useState } from 'react';
import { AllowlistRequest } from '../models/allowlist-request.model';
import { Allowlist } from '../models/allowlist-response.model';
import { getAllowlist, insertIP } from '../services/machine.service';
import { useForm } from 'react-hook-form';

export const Admin = () => {
    const [allowlist, setAllowlist] = useState<Allowlist>();
    useEffect(() => {
        document.title = 'Admin-Panel';
        void getAllowlist().then((allowlist) => setAllowlist(allowlist));
    }, []);

    return (
        <div className="w-1/2 h-3/4 m-5 positon relative flex flex-col justify-arround items-center bg-ColorCardBackground rounded-lg shadow-md shadow-black">
            <div
                id="allowListHeader"
                className="w-full bg-ColorCardTopBottom h-6 rounded-t-md position absolute top-0"
            >
                <h1 className="position absolute left-2 text-white">
                    Allow List
                </h1>
            </div>
            {allowlist ? (
                <AllowlistComponent allowlist={allowlist} />
            ) : (
                <div className="mt-6">
                    <AddIP />
                </div>
            )}
            <div
                id="allowListFooter"
                className="w-full bg-ColorCardTopBottom h-4 position absolute bottom-0"
            ></div>
        </div>
    );
};

type AllowlistProps = {
    allowlist: Allowlist;
};

const AllowlistComponent = ({ allowlist }: AllowlistProps) => {
    let c = 0;
    return (
        <div className="flex flex-col w-full mt-6 overflow-auto">
            {allowlist.Ip_Adresses.map((ip, index) => {
                return (
                    <div
                        className="flex m-2 items-center  "
                        // key={allowlist._id.$oid}
                        key={c++}
                    >
                        <label className="text-white font-bold italic">
                            {index + 1}.
                        </label>
                        <input
                            className=" p-1 mx-1 border-2 rounded-md h-auto w-full"
                            value={ip}
                            disabled={true}
                        />
                        <button>
                            <div className="w-5 h-5 fill-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                );
            })}
            <AddIP />
        </div>
    );
};

const AddIP = () => {
    const { register, handleSubmit } = useForm();
    const onSubmitt = (data: string) => {
        // const newIP: AllowlistRequest = {
        //     ip: data,
        // };
        console.log(data);
        void insertIP(data);
    };
    return (
        <div className="flex">
            <form onSubmit={handleSubmit(onSubmitt)} className="flex w-12 ml-4">
                <input
                    className="flex-1 rounded-md ml-2 bg-ColorAppBackground placeholder:text-white"
                    placeholder=" IP: 0.0.0.0 "
                    type="text"
                    {...register('ip', {
                        minLength: 7,
                        maxLength: 15,
                        pattern:
                            /^(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
                    })}
                />
                <button
                    className="flex-1 bg border-white border-2 rounded-md w-20 ml-2 p-1 text-white hover:bg-violet-500"
                    type="submit"
                >
                    ADD
                </button>
            </form>
        </div>
    );
};
// const AllowlistComponent = ({ allowlist }: AllowlistProps) => {
//     return (
//         <div>
//             {allowlist.Ip_Adresses.map((ip, index) => {
//                 return (
//                     <div
//                         key={allowlist._id.$oid}
//                         className="flex justify-start items-center p-2 bg-black"
//                     >
//                         <label className="text-white font-bold italic">
//                             {index + 1}.
//                         </label>
//                         <input
//                             className="flex-1 p-2 mx-1 border-2 rounded-md bg-white"
//                             value={ip}
//                             disabled={true}
//                         />
//                         <div className="w-5 h-5 fill-white">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 448 512"
//                             >
//                                 <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
//                             </svg>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };
