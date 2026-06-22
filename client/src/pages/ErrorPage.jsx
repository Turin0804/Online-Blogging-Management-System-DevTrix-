import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [dots, setDots] = useState(".");

    // Animated dots for "searching..."
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 overflow-hidden relative">

            {/* Background floating blobs */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full opacity-40 animate-pulse" />
            <div
                className="absolute bottom-16 right-16 w-48 h-48 bg-orange-200 rounded-full opacity-30"
                style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
            />
            <div
                className="absolute top-1/2 left-4 w-24 h-24 bg-orange-100 rounded-full opacity-50"
                style={{ animation: "pulse 4s ease-in-out infinite 0.5s" }}
            />

            {/* Torn newspaper effect */}
            <div className="relative z-10 text-center max-w-lg w-full">

                {/* Brand */}
                <p className="font-rye text-2xl font-bold text-orange-600 mb-6 tracking-wide">
                    Openpage
                </p>

                {/* Newspaper card */}
                <div
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden"
                    style={{ animation: "fadeSlideUp 0.6s ease-out both" }}
                >
                    {/* Decorative top rule */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                            Breaking News
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Giant 404 */}
                    <div
                        className="text-[120px] md:text-[160px] font-extrabold leading-none select-none"
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #a855f7)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            animation: "floatY 3s ease-in-out infinite",
                        }}
                    >
                        404
                    </div>

                    {/* Headline */}
                    <h1 className="font-rye text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3 leading-snug">
                        Article Not Found
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-500 text-sm md:text-base mb-2">
                        Our reporters searched every corner of the web
                        {dots}
                    </p>
                    <p className="text-gray-400 text-sm mb-8">
                        The page you're looking for has been moved, deleted, or never existed.
                    </p>

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-200 mb-8" />

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 hover:border-orange-300 transition-all duration-200"
                        >
                            ← Go Back
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 shadow-md hover:shadow-orange-200 hover:shadow-lg transition-all duration-200"
                            style={{ animation: "fadeSlideUp 0.8s ease-out both" }}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>

                {/* Footer hint */}
                <p className="text-gray-400 text-xs mt-6">
                    Error code: <span className="font-mono text-orange-400">PAGE_NOT_FOUND</span>
                </p>
            </div>

            {/* Keyframe styles */}
            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes floatY {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-12px); }
                }
            `}</style>
        </div>
    );
};

export default ErrorPage;
