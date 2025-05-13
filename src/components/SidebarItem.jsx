import { useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

function SidebarItem({ select, setSelect, title, contents }) {
  const [isOpen, toggleOpen] = useState(select[0] === title);

  return (
    <div className="mb-7">
      <div
        className="flex h-auto items-center border-black pl-2 border-b-1 w-full cursor-pointer"
        onClick={() => toggleOpen(!isOpen)}
      >
        {isOpen ? <SlArrowDown color="#FFFFFF" size="20" /> : <SlArrowRight color="#FFFFFF" size="20" />}
        <p className="ml-2 text-3xl font-bold text-white">{title}</p>
      </div>

      <ul
        className={`
          transition-all duration-500 overflow-hidden w-full border-black border-b-1 pb-3
          ${isOpen ? "max-h-96 mt-2" : "max-h-0"}
        `}
      >
        {Object.entries(contents).map(([content, func], index) => (
          <li
            key={index}
            className={`pl-9 mt-3 p-2 cursor-pointer font-bold text-white text-base w-full rounded-[10px] ${
              select[0] === title && select[1] === index ? "bg-gray-500" : ""
            }`}
            onClick={() => {
              setSelect([title, index]);
              func();
            }}
          >
            {content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarItem;
