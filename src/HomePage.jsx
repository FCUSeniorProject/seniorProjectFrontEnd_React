import {useEffect, useState} from "react";
import { CiLogout } from "react-icons/ci";
import { SlArrowRight , SlArrowDown  } from "react-icons/sl";
import SidebarItem from "./components/SidebarItem.jsx";
import HomePage_Page0 from "./components/HomePage_Page0.jsx";

function HomePage({token , setToken}) {
    const [HR, setHR] = useState(87.0);
    const [TestData , setTestData] = useState("init");
    const [select , setSelect] = useState(["總攬" , 0]);
    const [page , setPage] = useState(0);
    const Sidebar = {
        "總攬": {
            "今日摘要":() => {setPage(0)},
            "近期趨勢":() => {setPage(1)},
            "通知與提醒":() => {setPage(2)}
        },
        "生理數據": {
            "心率":() => {setPage(3)},
            "呼吸速率":() => {setPage(4)},
            "體溫":() => {setPage(5)},
            "血氧/血壓":() => {setPage(6)}
        },
        "活動數據": {
            "活動量": () => {setPage(7)},
            "每日/每周 活動趨勢": () => {setPage(8)},
            "工作與休息比例": () => {setPage(9)}
        },
        "睡眠數據": {
            "睡眠時長/深淺眠比": () => {setPage(10)},
            "入睡與起床時間": () => {setPage(11)},
            "睡眠趨勢圖表": () => {setPage(12)}
        },
        "設定": {
            "主題與介面":() => {setPage(13)},
            "隱私權限設定":() => {setPage(14)},
            "監控管理":() => {setPage(15)}
        }
    }

    //-----別動-----
    useEffect(() => {
        async function updateHR() {
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            };

            let head = await fetch("/api/get", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    id: "123456"
                })
            })

            let body = await head.json();
            setHR(body.HR);
        }

        function SSE() {

            let eventSource = new EventSource(`https://app-ctoszxbbsa-uc.a.run.app/api/events?token=${token}`);

            eventSource.onmessage = (event) => {
                setTestData(event.data);
            }

            eventSource.onerror = (err) => {
                console.log(err.message);
                SSE();
                return eventSource.close()
            }

            console.log('test')

            return () => {
                return eventSource.close()
            }
        }

    }, []);
    //----------

    return (
        <div className="flex h-screen flex-col justify-between bg-gray-900">

            {/* Header */}
            <div className="flex w-screen items-center bg-white h-[50px]">
                <p className="text-2xl font-bold ml-[5%]">
                    健康檢測系統 Health monitor System
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-grow overflow-hidden">

                {/* Sidebar */}
                <div className="flex flex-col h-full w-[20%] bg-gray-950 min-w-[200px]">
                    <div className="mb-5 flex items-center justify-between rounded-2xl border-b-2 border-gray-700 p-3">
                        <div className="bg-white rounded-full w-[40px] h-[40px]"></div>
                        <CiLogout color="#FFFFFF" size="25"/>
                        <p
                            className="mr-7 cursor-pointer font-bold text-white text-1xl"
                            onClick={() => {
                                sessionStorage.removeItem("token");
                                setToken(null);
                            }}
                        >
                            Log Out
                        </p>
                    </div>

                    {/* 滾動選單 */}
                    <div className="flex-grow overflow-y-auto">
                        <SidebarItem select={select} setSelect={setSelect} title="總攬" contents={Sidebar["總攬"]}/>
                        <SidebarItem select={select} setSelect={setSelect} title="生理數據" contents={Sidebar["生理數據"]}/>
                        <SidebarItem select={select} setSelect={setSelect} title="活動數據" contents={Sidebar["活動數據"]}/>
                        <SidebarItem select={select} setSelect={setSelect} title="睡眠數據" contents={Sidebar["睡眠數據"]}/>
                        <SidebarItem select={select} setSelect={setSelect} title="設定" contents={Sidebar["設定"]}/>
                    </div>
                </div>

                {/* Main Display Area */}
                <div className="flex flex-col items-center w-full h-full p-5">
                    {page === 0 && <HomePage_Page0></HomePage_Page0>}
                    {page === 1 && <p className="w-full text-center text-white font-bold text-4xl p-5">近期趨勢</p>}
                    {page === 2 && <p className="w-full text-center text-white font-bold text-4xl p-5">通知與提醒</p>}
                    {page === 3 && <p className="w-full text-center text-white font-bold text-4xl p-5">心率</p>}
                    {page === 4 && <p className="w-full text-center text-white font-bold text-4xl p-5">呼吸速率</p>}
                    {page === 5 && <p className="w-full text-center text-white font-bold text-4xl p-5">體溫</p>}
                    {page === 6 && <p className="w-full text-center text-white font-bold text-4xl p-5">血氧/血壓</p>}
                    {page === 7 && <p className="w-full text-center text-white font-bold text-4xl p-5">活動量</p>}
                    {page === 8 && <p className="w-full text-center text-white font-bold text-4xl p-5">每日/每周 活動趨勢</p>}
                    {page === 9 && <p className="w-full text-center text-white font-bold text-4xl p-5">工作與休息比例</p>}
                    {page === 10 && <p className="w-full text-center text-white font-bold text-4xl p-5">睡眠時長/深淺眠比</p>}
                    {page === 11 && <p className="w-full text-center text-white font-bold text-4xl p-5">入睡與起床時間</p>}
                    {page === 12 && <p className="w-full text-center text-white font-bold text-4xl p-5">睡眠趨勢圖表</p>}
                    {page === 13 && <p className="w-full text-center text-white font-bold text-4xl p-5">主題與介面</p>}
                    {page === 14 && <p className="w-full text-center text-white font-bold text-4xl p-5">隱私權限設定</p>}
                    {page === 15 && <p className="w-full text-center text-white font-bold text-4xl p-5">監控管理</p>}
                </div>
            </div>
        </div>
    )
}

export default HomePage;