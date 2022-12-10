import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { Outlet } from 'react-router-dom';

export const App = () => {
    return (
        <div className="flex flex-col h-screen bg-ColorAppBackground">
            <HeaderComponent statusH={true} />
            <Outlet />
            <FooterComponent />
        </div>
    );
};
