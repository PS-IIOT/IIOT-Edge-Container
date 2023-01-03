import { Admin } from './Admin';
import { Errorlog } from './Errorlog';

export const AdminPanel = () => {
    return (
        <div className="h-5/6 flex flex-row flex-grow-0">
            <Admin></Admin>
            <Errorlog></Errorlog>
        </div>
    );
};
