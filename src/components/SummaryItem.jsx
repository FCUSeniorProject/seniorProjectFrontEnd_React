import {SlArrowDown, SlArrowRight} from "react-icons/sl";
import {useState} from "react";

function SummaryItem() {
    const [isOpen , setOpen] = useState(false);

    return (
        <div className="mt-2 mb-2 w-full border-gray-500 border-2 p-5 text-white rounded-2xl">
            <div className="w-full flex items-center pl-7 cursor-pointer" onClick={() => setOpen(!isOpen)}>
                <div className="w-full flex items-center">
                    {isOpen ? <SlArrowDown color="#FFFFFF" size="20"></SlArrowDown> : <SlArrowRight color="#FFFFFF" size="20"></SlArrowRight>}
                    <p className="ml-5 text-2xl">Device1 的監控數據</p>
                </div>
                <div className="bg-green-500 rounded-[50%] h-[20px] w-[20px] border-white border-1"></div>
            </div>
            {isOpen && <div className="mt-5 flex justify-center border-gray-500 border-t-2 w-full">
                <div className="m-5 h-[200px] w-[30%] bg-gray-700 rounded-2xl">
                </div>
                <div className="m-5 h-[200px] w-[30%] bg-gray-700 rounded-2xl">
                </div>
                <div className=" m-5 h-[200px] w-[30%] bg-gray-700 rounded-2xl">
                </div>
            </div>}
        </div>
    )
}

export default SummaryItem;