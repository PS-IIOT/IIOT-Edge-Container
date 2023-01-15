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
        <div className="h-full flex gap-3">
            <div className="h-full grow-[1]">
                <Admin></Admin>
            </div>
            <div className="grow-[8]">
                <Errorlog></Errorlog>
            </div>
        </div>
    );
};
