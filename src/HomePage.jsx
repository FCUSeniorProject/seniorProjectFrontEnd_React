import {useEffect, useState} from "react";
import SidebarItem from "./components/SidebarItem.jsx";

function HomePage({token , setToken}) {

    const [HR, setHR] = useState(87.0);
    const [TestData , setTestData] = useState("init");

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

            const eventSource = new EventSource(`/api/events?token=${token}`);

            eventSource.onmessage = (event) => {
                setTestData(event.data);
            }

            eventSource.onerror = (err) => {
                console.log(err.message);
                return eventSource.close()
            }

            console.log('test')

            return () => {
                return eventSource.close()
            }
        }

        SSE();
    }, []);
    //----------

    return (
        <div className="flex h-screen flex-col justify-between bg-gray-900">
            <div className="flex w-screen items-center bg-white h-[50px]">
                <p className="text-2xl font-bold ml-[5%]">健康檢測系統 Health monitor System</p>
            </div>
            <div className="m-0 flex flex-grow overflow-hidden p-0 h-[100%]">
                <div className="overflow-y-auto h-[100%] w-[20%] bg-gray-950 min-w-[200px]">
                    <SidebarItem title="總攬" contents={{"今日摘要":null, "近期趨勢":null, "通知與提醒":null}}></SidebarItem>
                    <SidebarItem title="生理數據" contents={{"心率":null, "呼吸速率":null, "體溫":null, "血氧/血壓":null}}></SidebarItem>
                    <SidebarItem title="活動數據" contents={{"Opt1": null, "Opt2": null, "Opt3": null}}></SidebarItem>
                    <SidebarItem title="睡眠數據" contents={{"Opt1": null, "Opt2": null, "Opt3": null}}></SidebarItem>
                    <SidebarItem title="設定" contents={{"帳號資訊":null , "登出":() => {sessionStorage.removeItem("token"); setToken(null);}}}></SidebarItem>
                </div>
                <div className="flex flex-col items-center w-[100%] h-[100%]">
                    <p className="text-4xl font-bold text-white mt-30">歡迎回來，User</p>
                    <div className="mt-10 grid grid-cols-1 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
                        <div className="m-5 flex flex-col justify-between rounded-3xl border-white h-[175px] w-[225px] border-1">
                            <p className="mt-3 ml-5 font-bold text-gray-400">當前心率</p>
                            <p className="text-center text-5xl text-blue-500">65.0</p>
                            <p className="mr-5 mb-5 text-end text-gray-400"> BPM</p>
                        </div>
                        <div
                            className="m-5 flex flex-col justify-between rounded-3xl border-white h-[175px] w-[225px] border-1">
                            <p className="mt-3 ml-5 font-bold text-gray-400">睡眠紀錄</p>
                            <p className="text-center text-4xl text-blue-500">7.5 小時</p>
                            <p className="mr-5 mb-5 text-end text-gray-400">睡眠品質:良好</p>
                        </div>
                        <div
                            className="m-5 flex flex-col justify-between rounded-3xl border-white h-[175px] w-[225px] border-1">
                            <p className="mt-3 ml-5 font-bold text-gray-400">活動總攬</p>
                            <p className="text-center text-4xl text-yellow-600">8500 步</p>
                            <p className="mr-5 mb-5 text-end text-gray-400">達成率:85%</p>
                        </div>
                        <div className="m-5 flex items-center justify-center rounded-3xl border-white h-[175px] w-[225px] border-1">
                            <p className="text-3xl font-bold text-white">
                                {TestData}
                            </p>
                        </div>
                        <div className="m-5 rounded-3xl border-white h-[175px] w-[225px] border-1"></div>
                        <div className="m-5 rounded-3xl border-white h-[175px] w-[225px] border-1"></div>
                        <div className="m-5 rounded-3xl border-white h-[175px] w-[225px] border-1"></div>
                        <div className="m-5 rounded-3xl border-white h-[175px] w-[225px] border-1"></div>
                        <div className="m-5 rounded-3xl border-white h-[175px] w-[225px] border-1"></div>
                    </div>
                </div>
            </div>
            <div className="flex w-screen items-center bg-white h-[100px]">
                <p className="ml-[7.5%]">健康檢測系統<br/>Health monitor System</p>
            </div>
        </div>
    )
}

export default HomePage;