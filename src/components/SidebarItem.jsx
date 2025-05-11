import {useState} from "react";
import { SlArrowRight , SlArrowDown  } from "react-icons/sl";

function SidebarItem({select , setSelect , title , contents}) {
    const [isOpen , toggleOpen] = useState(select[0] === title);

    return (
        <div className="mb-7">
            <div className="flex h-auto items-center border-black pl-2 border-b-1 w-[100%]">
                {isOpen ? <SlArrowDown color="#FFFFFF" size="20"/> : <SlArrowRight color="#FFFFFF" size="20"/>}
                <p className="ml-2 cursor-pointer text-3xl font-bold text-white" onClick={() => toggleOpen(!isOpen)}>{title}</p>
            </div>
            {isOpen && (
                <ul className="mb-3 border-black pb-3 border-b-1 w-[100%]">
                    {Object.entries(contents).map(([content , func] , index) => {
                        return (
                            <li key={index} className={`pl-9 mt-3 p-2 cursor-pointer font-bold text-white text-1xl w-[100%] rounded-[10px] ${select[0] === title && select[1] === index ? "bg-gray-500" : ""}`} onClick={() => {
                                setSelect([title , index]);
                                func();
                            }} >{content}</li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default SidebarItem;