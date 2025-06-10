import {useEffect, useRef, useState} from "react";
import { CiLogout } from "react-icons/ci";
import { SlArrowRight , SlArrowDown  } from "react-icons/sl";
import SidebarItem from "./components/SidebarItem.jsx";
import HomePage_Page0 from "./components/HomePage_Page0.jsx";
import MapBoxTesting from "./components/MapBoxTesting.jsx";
import GoogleMapTesting from "./components/GoogleMapTesting.jsx";
import { EventSourcePolyfill } from 'event-source-polyfill';


function HomePage({token , setToken}) {

    const [select , setSelect] = useState(["總攬" , 0]); //設定當前Sidebar選項，供選項反白用
    const [page , setPage] = useState(0); //設定顯示何種畫面
    const [devicesInfo , setDevicesInfo] = useState({});
    const eventSourceRef = useRef(null);
    const reconnectTimerRef = useRef(null);


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
        },
        "測試": {
            "Mapbox": () => {setPage(16)},
            "Google": () => {setPage(17)}
        }
    }

    //-----別動-----
    useEffect(() => {
        function connectSSE() {
            // 建立連線
            //https://app-ctoszxbbsa-uc.a.run.app
            //http://127.0.0.1:5001/seniorproject-9a41a/us-central1/app
            let eventSource = new EventSourcePolyfill('http://127.0.0.1:5001/seniorproject-9a41a/us-central1/app/api/events' , {
                headers: {
                    withCredentials:true,
                    Authorization: `Bearer ${token}`
                }
            });
            eventSourceRef.current = eventSource;

            eventSource.onmessage = (event) => {

                try {
                    const data = JSON.parse(event.data);
                    console.log('Received:', data);
                    setDevicesInfo(prev => ({
                        ...prev,
                        [data.device]: data.HR
                    }));
                } catch (e) {
                    console.error('Failed to parse SSE data:', e);
                }
            };

            eventSource.onerror = () => {
                console.warn('SSE disconnected. Will retry in 2 seconds...');
                eventSource.close();
                reconnectTimerRef.current = setTimeout(connectSSE, 1000); // 延遲 2 秒後重連
            };
        }

        connectSSE(); // 初次建立連線

        return () => {
            // 清除所有連線與定時器
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
        };
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
                <div className="flex h-full flex-col w-[250px] bg-gray-950">
                    <div className="mb-5 flex items-center gap-4 px-6 rounded-2xl border-b-2 border-gray-700 p-3">
                        <div className="rounded-full bg-white w-[40px] h-[40px]"></div>

                        <div
                            className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded transition-colors"
                            onClick={() => {
                            sessionStorage.removeItem("token");
                            setToken(null);
                            }}
                        >
                            <CiLogout color="#FFFFFF" size={25} />
                            <p className="font-bold text-white text-base">Log Out</p>
                        </div>
                    </div>

                    {/* 滾動選單 */}
                    <div className="flex-grow overflow-y-auto">
                        {Object.entries(Sidebar).map(([title , contents]) => {
                            return (
                                <SidebarItem select={select} setSelect={setSelect} title={title} contents={contents}/>
                            )
                        })}
                    </div>
                </div>

                {/* Main Display Area */}
                <div className="flex h-full w-full flex-col items-center p-5">
                    {page === 0 && <HomePage_Page0 deviceInfo={devicesInfo}></HomePage_Page0>}
                    {page === 1 && <p className="w-full p-5 text-center text-4xl font-bold text-white">近期趨勢</p>}
                    {page === 2 && <p className="w-full p-5 text-center text-4xl font-bold text-white">通知與提醒</p>}
                    {page === 3 && <p className="w-full p-5 text-center text-4xl font-bold text-white">心率</p>}
                    {page === 4 && <p className="w-full p-5 text-center text-4xl font-bold text-white">呼吸速率</p>}
                    {page === 5 && <p className="w-full p-5 text-center text-4xl font-bold text-white">體溫</p>}
                    {page === 6 && <p className="w-full p-5 text-center text-4xl font-bold text-white">血氧/血壓</p>}
                    {page === 7 && <p className="w-full p-5 text-center text-4xl font-bold text-white">活動量</p>}
                    {page === 8 && <p className="w-full p-5 text-center text-4xl font-bold text-white">每日/每周 活動趨勢</p>}
                    {page === 9 && <p className="w-full p-5 text-center text-4xl font-bold text-white">工作與休息比例</p>}
                    {page === 10 && <p className="w-full p-5 text-center text-4xl font-bold text-white">睡眠時長/深淺眠比</p>}
                    {page === 11 && <p className="w-full p-5 text-center text-4xl font-bold text-white">入睡與起床時間</p>}
                    {page === 12 && <p className="w-full p-5 text-center text-4xl font-bold text-white">睡眠趨勢圖表</p>}
                    {page === 13 && <p className="w-full p-5 text-center text-4xl font-bold text-white">主題與介面</p>}
                    {page === 14 && <p className="w-full p-5 text-center text-4xl font-bold text-white">隱私權限設定</p>}
                    {page === 15 && <p className="w-full p-5 text-center text-4xl font-bold text-white">監控管理</p>}
                    {page === 16 && <p className="w-full p-5 text-center text-4xl font-bold text-white">監控管理</p>}
                    {page === 17 && <p className="w-full p-5 text-center text-4xl font-bold text-white">監控管理</p>}
                </div>
            </div>
        </div>
    )
}

export default HomePage;