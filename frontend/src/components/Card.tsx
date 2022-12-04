interface CardProps {
    machineID: string;
    temparture: number;
    cycles: number;
    upTime: number;
    status: boolean;
}

export const Card = ({
    machineID,
    temparture,
    cycles,
    upTime,
    status,
}: CardProps) => {
    return (
        <div className="flex-col justify-between  w-48 h-48 bg-ColorCardBackground m-5 rounded-lg shadow-md shadow-black">
            <div className="flex justify-around items-center bg-ColorCardTopBottom w-full h-8 rounded-t-md ">
                <h3 className=" flex italic text-c text-black">{machineID}</h3>
                <div
                    className={
                        status
                            ? 'bg-ColorStatusConnectionOnline ml-24 w-5 h-5 rounded-full'
                            : 'bg-ColorStatusConnectionOffline ml-24 w-5 h-5 rounded-full'
                    }
                ></div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center w-full text-white text-4xl ml-2 mt-4">
                    {temparture.toPrecision(4)}°C
                </div>
                <div className="flex justify-center text-white text-2xl mt-4">
                    {cycles} St
                </div>
                <div className="flex justify-center w-full rounded-b-lg text-white mt-4">
                    {upTime}s
                </div>
            </div>
        </div>
    );
};
