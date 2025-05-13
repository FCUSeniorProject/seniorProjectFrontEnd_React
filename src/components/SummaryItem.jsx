import {SlArrowDown, SlArrowRight} from "react-icons/sl";
import {useState} from "react";

function SummaryItem({deviceName , HR}) {
    const [isOpen , setOpen] = useState(false);

    return (
        <div className="mt-2 mb-2 w-full rounded-2xl border-2 border-gray-500 p-5 text-white">
            <div className="flex w-full cursor-pointer items-center pl-7" onClick={() => setOpen(!isOpen)}>
                <div className="flex w-full items-center">
                    {isOpen ? <SlArrowDown color="#FFFFFF" size="20"></SlArrowDown> : <SlArrowRight color="#FFFFFF" size="20"></SlArrowRight>}
                    <p className="ml-5 text-2xl">{deviceName} 的監控數據</p>
                </div>
                <div className="border-white bg-green-500 rounded-[50%] h-[20px] w-[20px] border-1"></div>
            </div>
            <div
                className={`
                    transition-all duration-500 overflow-hidden w-full mt-2 border-t-2 border-gray-500
                    ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                <div className="mt-5 flex w-full justify-center">
                    <div className="m-5 flex flex-col justify-between rounded-2xl bg-gray-700 p-3 h-[200px] w-[30%]">
                    <p className="w-full text-3xl text-white">及時心率:</p>
                    <p className="w-full text-center text-3xl text-white">{HR ? HR : "Waiting"}</p>
                    <p className="w-full text-end text-xl text-white">BMP</p>
                    </div>
                    <div className="m-5 rounded-2xl bg-gray-700 h-[200px] w-[30%]"></div>
                    <div className="m-5 rounded-2xl bg-gray-700 h-[200px] w-[30%]"></div>
                </div>
            </div>

        </div>
    )
}

export default SummaryItem;