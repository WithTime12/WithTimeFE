import { Outlet } from 'react-router-dom';

import MainImg from '../images/main_edit.png';

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-between h-[100dvh] overflow-hidden">
            <section className="hidden lg:block min-w-[200px] h-full bg-[linear-gradient(to_bottom,_white_0%,_white_40%,_#86e3c3_40%)]">
                <img src={MainImg} alt="위티 메인 일러스트" className="h-full w-full object-contain" />
            </section>
            <section className="flex-1 flex flex-col justify-center items-center px-[56px] h-full overflow-y-auto min-w-fit">
                <Outlet />
            </section>
        </div>
    );
}
