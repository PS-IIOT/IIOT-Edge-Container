import { useState } from 'react';
import { Allowlist } from '../models/allowlist-response.model';

export const AdminPanel = () => {
    const [IPAdress, setIPAdress] = useState();
    const [allowList, setAllowList] = useState<Allowlist>();

    return (
        <div className="flex justify-center items-center bg-white w-48 h-48">
            <form
                className=" w-5 h-5 text-black text block"
                inputMode="text"
                placeholder={IPAdress.ip1}
                action={`${import.meta.env.VITE_BACKEND_API_URL}/machines`}
                method="post"
            ></form>
        </div>
    );
};
