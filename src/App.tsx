import '@/App.css';

import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { DeviceTokenProvider } from '@/providers/deviceTokenProvider';
import { alarmKeys } from '@/queryKey/queryKey';
import router from '@/routes/routes';

function App() {
    const refetchKeys = useMemo(() => [alarmKeys._def], []);
    return (
        <DeviceTokenProvider refetchKeys={refetchKeys}>
            <RouterProvider router={router} />
        </DeviceTokenProvider>
    );
}

export default App;
