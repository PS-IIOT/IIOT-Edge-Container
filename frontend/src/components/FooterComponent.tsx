export const FooterComponent = () => {
    return (
        <div className="flex justify-between items-center w-11/12 mx-auto rounded-xl drop-shadow-xl shadow-md shadow-grey bg-slate-200 text-slate-400 p-1">
            <div id="left" className="grow flex justify-center items-center">
                <img
                    src="/images/logo-hs-esslingen.png"
                    className="h-6"
                    alt="logo hs-esslingen"
                />
            </div>
            <div
                id="center"
                className="grow flex flex-col justify-center items-center"
            >
                <span className="font-bold">SWT Projekt WS2022/23 &copy;</span>
                <span className="text-sm">
                    Leopold Stenger, Friedrich Lohrmann, Marius Wieler, Michael
                    Toetsches
                </span>
            </div>
            <div id="right" className="grow flex justify-center items-center">
                <img
                    src="/images/logo-ads-tec.svg"
                    className="h-6"
                    alt="logo ads-tec"
                />
            </div>
        </div>
    );
};
