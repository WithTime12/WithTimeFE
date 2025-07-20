import { create } from 'zustand';

interface IAuthState {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    resetAuth: () => void;
}

const useAuthStore = create<IAuthState>((set) => ({
    email: '',
    password: '',
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    resetAuth: () => set({ email: '', password: '' }),
}));

export default useAuthStore;
