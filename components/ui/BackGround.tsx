interface BackgroundProps {
    children: React.ReactNode;
}

const BackGround = ({ children }: BackgroundProps) => {
    return (
        <div className="w-full min-h-screen relative bg-transparent overflow-hidden">
            <div className="w-64 h-64 md:w-96 md:h-96 left-[-50px] md:left-[10%] top-[20%] absolute opacity-10 mix-blend-multiply bg-red-600 rounded-full blur-[32px] animate-pulse-slow" />
            <div className="w-64 h-64 md:w-96 md:h-96 right-[-50px] md:right-[10%] bottom-[20%] absolute opacity-10 mix-blend-multiply bg-red-600 rounded-full blur-[32px] animate-bounce-slow" />
            <div className="w-64 h-64 md:w-96 md:h-96 left-[-30px] md:left-[5%] bottom-[15%] absolute opacity-10 mix-blend-multiply bg-green-400 rounded-full blur-[32px] animate-float" />
            <div className="w-64 h-64 md:w-96 md:h-96 right-[10%] top-[-50px] absolute opacity-10 mix-blend-multiply bg-green-400 rounded-full blur-[32px] animate-ping-slow" />
            <div className="w-64 h-64 md:w-96 md:h-96 left-[5%] top-[-30px] absolute opacity-5 mix-blend-multiply bg-blue-800 rounded-full blur-[32px] animate-spin-slow" />
            <div className="w-64 h-64 md:w-96 md:h-96 right-[-30px] md:right-[15%] top-[25%] absolute opacity-5 mix-blend-multiply bg-yellow-400 rounded-full blur-[32px] animate-pulse" />

            <div className="relative z-10">
                {children}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-600 text-sm font-light">
                GDGAlgiers © 2025. All rights reserved.
            </div>
        </div>
    );
};

export default BackGround;