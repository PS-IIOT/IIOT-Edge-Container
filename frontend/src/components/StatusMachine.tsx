export interface statusMachineProps {
    warning: boolean;
    error: boolean;
}
export const StatusMachine = ({ warning, error }: statusMachineProps) => {
    return (
        <div
            className={
                warning
                    ? error
                        ? 'bg-ColorStatusConnectionOffline ml-24 w-5 h-5 rounded-full'
                        : 'bg-yellow-400 ml-24 w-5 h-5 rounded-full'
                    : 'bg-ColorStatusConnectionOnline ml-24 w-5 h-5 rounded-full'
            }
        ></div>
    );
};
