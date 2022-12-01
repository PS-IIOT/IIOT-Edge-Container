import { HeaderComponent } from './components/HeaderComponent';
import { MainComponent } from './components/MainComponent';
import { FooterComponent } from './components/FooterComponent';

export const App = () => {
    const windowSize = window.screen.availHeight;
    console.log(windowSize);
    return (
        <div className="flex flex-col h-screen justify-between bg-ColorAppBackground">
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </div>
    );
};
