import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { Outlet } from 'react-router-dom';

export const App = () => {
    return (
        <div className="flex flex-col w-full h-screen position relative bg-slate-300 overflow-hidden">
            <HeaderComponent statusH={true} />
            <Outlet />
            <FooterComponent />
        </div>
    );
};
