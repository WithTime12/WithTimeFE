import './App.css';

import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import Modal from './components/common/modal';

import router from '@/routes/routes';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <RouterProvider router={router} />
            <div>
                <button onClick={() => setOpen(true)}>모달 열기</button>
                <Modal isOpen={open} title="제목" onClose={() => setOpen(false)}>
                    <div className="text-[22px]">내용</div>
                </Modal>
            </div>
        </>
    );
}

export default App;
