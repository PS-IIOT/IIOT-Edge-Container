import { HeaderComponent } from './components/HeaderComponent';
import { MainComponent } from './components/MainComponent';
import { FooterComponent } from './components/FooterComponent';
export const App = () => {
    return (
        <div className="flex-row justify-between bg-ColorAppBackground">
            <HeaderComponent></HeaderComponent>
            <MainComponent></MainComponent>
            <FooterComponent></FooterComponent>
        </div>
    );
};
