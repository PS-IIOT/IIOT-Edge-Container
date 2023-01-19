export interface statusMachineProps {
    warning: boolean;
    error: boolean;
}
export const StatusMachine = ({ warning, error }: statusMachineProps) => {
    return (
        <div className="flex items-center">
            <span className="px-2 font-bold text-green-500">Online</span>
            <div
                className={`w-8 h-8 rounded-xl ${
                    warning
                        ? error
                            ? 'bg-red-500'
                            : 'bg-yellow-400'
                        : 'bg-green-500'
                }`}
            ></div>
        </div>
    );
};
