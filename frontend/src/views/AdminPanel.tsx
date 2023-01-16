import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Admin } from '../components/Admin';
import { Errorlog } from '../components/Errorlog';

export const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Admin-Panel';
        if (sessionStorage.getItem('username') == null) {
            navigate('/Login');
        }
    }, []);

    return (
        <div className="grow h-full flex gap-3">
            <div className="h-full basis-2/5">
                <Admin></Admin>
            </div>
            <div className="h-full basis-4/5">
                <Errorlog></Errorlog>
            </div>
        </div>
    );
};
