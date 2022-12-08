import { HeaderComponent } from './components/HeaderComponent';
import { MainComponent } from './components/MainComponent';
import { FooterComponent } from './components/FooterComponent';

export const App = () => {
    return (
        <div className="flex flex-col h-screen bg-ColorAppBackground">
            <HeaderComponent statusH={true} />
            <MainComponent />
            <FooterComponent />
        </div>
    );
};
