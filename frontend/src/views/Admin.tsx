import { useEffect, useState } from 'react';
import { Allowlist } from '../models/allowlist.model';
import { getAllowlist } from '../services/machine.service';

export const Admin = () => {
    const [allowlist, setAllowlist] = useState<Allowlist>();

    useEffect(() => {
        document.title = 'Admin-Panel';
        void getAllowlist().then((allowlist) => setAllowlist(allowlist));
    }, []);

    return (
        <div className="flex-1 m-5 p-5 overflow-y-auto flex flex-col justify-around flex-wrap content-center gap-5">
            <h1 className="text-5xl font-bold italic">Admin Page</h1>
            {allowlist ? (
                <AllowlistComponent allowlist={allowlist} />
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
};

type AllowlistProps = {
    allowlist: Allowlist;
};

const AllowlistComponent = ({ allowlist }: AllowlistProps) => {
    return (
        <div className="w-full flex-1 flex flex-col items-center">
            {allowlist.Ip_Adresses.map((ip, index) => {
                return (
                    <div
                        key={allowlist._id.$oid}
                        className="w-1/2 flex items-center p-2"
                    >
                        <label className="text-white font-bold italic">
                            {index + 1}.
                        </label>
                        <input
                            className="flex-1 p-2 mx-1 border-2 rounded-md"
                            value={ip}
                            disabled={true}
                        />
                    </div>
                );
            })}
        </div>
    );
};
