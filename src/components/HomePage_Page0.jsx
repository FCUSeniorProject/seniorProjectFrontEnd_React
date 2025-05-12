import SummaryItem from "./SummaryItem.jsx";

function HomePage_Page0({deviceInfo}) {

    return(
        <div className="flex h-full w-full flex-col">
            <p className="w-full p-5 text-center text-4xl font-bold text-white">近期數據摘要</p>
            <div className="w-full flex-grow overflow-y-auto overflow-x-hidden pr-2">
                {Object.entries(deviceInfo).map(([device , HR]) => {
                    return (
                        <SummaryItem deviceName={device} HR={HR}></SummaryItem>
                    )
                })}
                <SummaryItem></SummaryItem>
            </div>
        </div>
    )
}

export default HomePage_Page0