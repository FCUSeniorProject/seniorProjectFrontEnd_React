import SummaryItem from "./SummaryItem.jsx";

function HomePage_Page0() {

    return(
        <div className="w-full h-full flex flex-col">
            <p className="w-full text-center text-white font-bold text-4xl p-5">近期數據摘要</p>
            <div className="w-full flex-grow overflow-y-auto overflow-x-hidden pr-2">
                <SummaryItem></SummaryItem>
                <SummaryItem></SummaryItem>
                <SummaryItem></SummaryItem>
            </div>
        </div>
    )
}

export default HomePage_Page0