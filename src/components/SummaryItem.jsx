import {SlArrowDown, SlArrowRight} from "react-icons/sl";
import {useState} from "react";

function SummaryItem() {
    const [isOpen , setOpen] = useState(false);

    return (
        <div className="mt-2 mb-2 w-full rounded-2xl border-2 border-gray-500 p-5 text-white">
            <div className="flex w-full cursor-pointer items-center pl-7" onClick={() => setOpen(!isOpen)}>
                <div className="flex w-full items-center">
                    {isOpen ? <SlArrowDown color="#FFFFFF" size="20"></SlArrowDown> : <SlArrowRight color="#FFFFFF" size="20"></SlArrowRight>}
                    <p className="ml-5 text-2xl">Device1 的監控數據</p>
                </div>
                <div className="border-white bg-green-500 rounded-[50%] h-[20px] w-[20px] border-1"></div>
            </div>
            {isOpen && <div className="mt-5 flex w-full justify-center border-t-2 border-gray-500">
                <div className="m-5 rounded-2xl bg-gray-700 h-[200px] w-[30%]">
                </div>
                <div className="m-5 rounded-2xl bg-gray-700 h-[200px] w-[30%]">
                </div>
                <div className="m-5 rounded-2xl bg-gray-700 h-[200px] w-[30%]">
                </div>
            </div>}
        </div>
    )
}

export default SummaryItem;