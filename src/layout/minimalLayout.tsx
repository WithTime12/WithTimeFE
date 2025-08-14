import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/Header';

function MinimalLayout() {
    return (
        <div>
            <Header mode="minimal" />
            <Outlet />
        </div>
    );
}

export default MinimalLayout;
