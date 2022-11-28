import { HeaderComponent } from './components/HeaderComponent';
import { MainComponent } from './components/MainComponent';
import { FooterComponent } from './components/FooterComponent';

export const App = () => {
    return (
        <div className="flex flex-col justify-between bg-ColorAppBackground">
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </div>
    );
};
