import SummaryItem from "./SummaryItem.jsx";

function HomePage_Page0() {

    return(
        <div className="flex h-full w-full flex-col">
            <p className="w-full p-5 text-center text-4xl font-bold text-white">近期數據摘要</p>
            <div className="w-full flex-grow overflow-y-auto overflow-x-hidden pr-2">
                <SummaryItem></SummaryItem>
                <SummaryItem></SummaryItem>
                <SummaryItem></SummaryItem>
            </div>
        </div>
    )
}

export default HomePage_Page0