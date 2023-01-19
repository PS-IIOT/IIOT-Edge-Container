import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { FooterComponent } from './components/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent';

export const App = () => {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div className="flex flex-col w-full h-screen bg-slate-300 p-3">
            <HeaderComponent />
            <div className="h-full grow w-11/12 mx-auto overflow-hidden p-8 flex">
                <Outlet />
            </div>
            <FooterComponent />
        </div>
    );
};
