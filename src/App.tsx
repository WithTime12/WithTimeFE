import './App.css';

import { RouterProvider } from 'react-router-dom';

import { DeviceTokenProvider } from './providers/deviceTokenProvider';
import { alarmKeys } from './queryKey/queryKey';

import router from '@/routes/routes';

function App() {
    return (
        <DeviceTokenProvider refetchKeys={[alarmKeys.all().queryKey]}>
            <RouterProvider router={router} />
        </DeviceTokenProvider>
    );
}

export default App;
