import { Outlet } from 'react-router-dom';

import { ClearOnLeave } from '@/utils/clearStorageOnLeave';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import RouteChangeReset from '@/app/routeChangeReset';

function Layout() {
    return (
        <div>
            <Header mode="full" />
            <Outlet />
            <Footer />
            <ClearOnLeave from="/makeCourse/result" keys={['signature']} />
            <RouteChangeReset />
        </div>
    );
}

export default Layout;
