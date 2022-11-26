interface CardProps {
    machineID: string;
    temparture: number;
    cycles: number;
    upTime: string;
}
export const Card = ({ machineID, temparture, cycles, upTime }: CardProps) => {
    return (
        <div className="flex-col justify-between  w-48 h-48 bg-ColorCardBackground m-5 rounded-lg shadow-md shadow-black">
            <div className="flex justify-center items-center bg-ColorCardTopBottom w-full h-8 rounded-t-md ">
                <p className="flex italic text-c text-black">
                    Maschine {machineID}
                </p>
            </div>
            <div className=" flex justify-center items-center w-full text-white text-7xl ml-2">
                {temparture}°
            </div>
            <div className="flex justify-center text-white text-2xl mt-2">
                {cycles} St
            </div>
            <div className="flex justify-center w-full rounded-b-lg text-white mt-2">
                {upTime}
            </div>
        </div>
    );
};
