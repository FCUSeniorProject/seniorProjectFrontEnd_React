import Background from './assets/LoginPage_Background2.jpg';
import './LoginPage.css';
import LoginForm from "./components/LoginForm.jsx";
import { useEffect, useState } from "react";


function LoginPage({onLogin , setToken}) {

    const [titleIndex , setTitleIndex] = useState(0);
    const [fade , setFade] = useState(true)
    const [isStart , setStart] = useState(false);
    const content = ["一眼掌握你的健康狀況" , "讓健康數據誠為日常習慣" , "簡潔呈現，深刻理解" , "數據為你說話" , "健康不該複雜"];
    const contentEn =["Health insights, clearly delivered" , "Your health, visualized and simplified" , "Simplicity meets meaning health data" , "Where numbers tell your health story" , "Clear. Concise. Connected."]

    useEffect(() => {
        const interval = setInterval(() => {
            // 先淡出
            setFade(false);
            setTimeout(() => {
                // 換字後淡入
                setTitleIndex((prev) => (prev + 1) % content.length);
                setFade(true);
            }, 1000); // 這裡要小於 interval 的間隔時間
        }, 3000); // 每 3 秒切換一次

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="flex h-screen w-screen flex-col items-center justify-between bg-cover bg-center"
            style={{
                backgroundImage: `url(${Background})`,
            }}
        >
            <div className="flex w-screen items-center bg-white h-[50px] justify-between">
                <p className="text-2xl font-bold ml-[5%]">健康檢測系統 Health monitor System</p>
                <button
                    className="mr-[5%] rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 py-2 text-sm font-medium text-white w-[100px] hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                        setStart(false)
                    }}
                >
                    首頁
                </button>
            </div>
            {isStart ? <LoginForm onLogin={onLogin} setToken={setToken}></LoginForm> :
                <div className="flex flex-col items-center">
                    <p className={`text-white text-5xl font-bold text-center transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>{content[titleIndex]}</p>
                    <p className={`text-white text-5xl font-bold text-center transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>{contentEn[titleIndex]}</p>
                    <button
                        className="mt-15 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 py-2 text-sm font-medium text-white w-[120px] hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={() => {
                            setStart(true)
                        }}
                    >
                        開始使用
                    </button>
                </div>
            }
            <div className="flex w-screen items-center bg-white h-[100px]">
                <p className="ml-[7.5%]">健康檢測系統<br/>Health monitor System</p>
            </div>
        </div>
    );
}

export default LoginPage;