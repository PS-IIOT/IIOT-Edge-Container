import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const App = () => {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div className="flex flex-col w-full h-screen position relative bg-slate-300 overflow-auto">
            <HeaderComponent statusH={true} />
            <Outlet />
            <FooterComponent />
        </div>
    );
};
