import { Outlet } from 'react-router-dom';

import MainImg from '../images/main.jpeg';

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="hidden lg:block min-w-[200px] h-full bg-[linear-gradient(to_bottom,_white_0%,_white_40%,_#8ae7c7_50%)]">
                <img src={MainImg} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center px-[80px]">
                <Outlet />
            </div>
        </div>
    );
}
