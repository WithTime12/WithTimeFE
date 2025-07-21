import { Outlet } from 'react-router-dom';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

function Layout() {
    return (
        <div>
            <Header mode="full" />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
