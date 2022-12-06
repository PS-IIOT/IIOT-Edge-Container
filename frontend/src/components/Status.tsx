interface statusSignal {
    online: boolean;
    warning: boolean;
    alert: boolean;
}
export const Status = ({ online, warning, alert }: statusSignal) => {
    return (
        <div
            className={
                online
                    ? warning
                        ? alert
                            ? 'bg-ColorStatusConnectionOffline ml-24 w-5 h-5 rounded-full'
                            : 'bg-yellow-400 ml-24 w-5 h-5 rounded-full'
                        : 'bg-ColorStatusConnectionOnline ml-24 w-5 h-5 rounded-full'
                    : 'bg-grey ml-24 w-5 h-5 rounded-full'
            }
        ></div>
    );
};
