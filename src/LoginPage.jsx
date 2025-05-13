import Background1 from './assets/LoginPage_Background2.jpg';
import Background2 from './assets/LoginPage_Background3.jpg';
import './LoginPage.css';
import LoginForm from "./components/LoginForm.jsx";
import { useState, useEffect } from "react";



function LoginPage({ onLogin, setToken }) {
    const [isStart, setStart] = useState(false);
    const [index, setIndex] = useState(0);
    const [fade , setFade] = useState(true)

    const rotatingTexts = [
    { zh: "一眼掌握你的健康狀態", en: "Health insights, clearly delivered." },
    { zh: "讓健康數據成為日常習慣", en: "Your health, visualized and simplified." },
    { zh: "簡潔呈現，深刻理解", en: "Simplicity meets meaningful health data." },
    { zh: "數據為你說話", en: "Where numbers tell your health story." },
    { zh: "健康不該複雜", en: "Clear. Concise. Connected." }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % rotatingTexts.length);
                setFade(true);
            }, 1000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = (...args) => {
        setStart(false);
        onLogin(...args);
    };

    return (
        <div className="overflow-x-hidden overflow-y-scroll snap-y snap-mandatory h-screen w-screen scroll-smooth">
            <section
                className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center snap-start relative"
                style={{ backgroundImage: `url(${Background1})` }}
            >
                <div className="absolute top-0 w-full flex justify-between items-center bg-white h-[50px] px-[5%] z-20">
                    <p className="text-2xl font-bold">健康檢測系統 Health monitor System</p>
                    <div className="flex gap-2">
                        <button
                            className="rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-500"
                            onClick={() => setStart(false)}
                        >
                            首頁
                        </button>
                        <button
                            className="rounded bg-blue-400 px-4 py-1 text-white hover:bg-blue-500"
                            onClick={() => setStart(true)}
                        >
                            登入
                        </button>
                    </div>
                </div>

                <div className="text-center px-4 z-10">
                    <p className={`text-white text-5xl font-bold text-center transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>{rotatingTexts[index].zh}</p>
                    <p className={`text-white text-5xl font-bold text-center transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>{rotatingTexts[index].en}</p>
                </div>

                <button
                    className="mt-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 py-2 font-medium text-white w-[120px] hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 z-10"
                    onClick={() => setStart(true)}
                >
                    開始使用
                </button>

                {isStart && (
                    <div
                        className="absolute inset-0 z-30 flex items-center justify-center"
                        onClick={() => setStart(false)} 
                    >
                        <div
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <LoginForm onLogin={handleLogin} setToken={setToken} />
                        </div>
                    </div>
                )}

            </section>

            <section className="h-screen w-screen flex items-center justify-center bg-black snap-start relative">
                <img src={Background2} alt="watch" className="h-full w-full object-cover" />
            </section>

            <section className="w-screen flex justify-start bg-white py-12 px-[5%] snap-start">
                <div className="text-left leading-relaxed">
                    <p className="text-black text-2xl font-bold">健康檢測系統</p>
                    <p className="text-black text-md">Health monitor system</p>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;