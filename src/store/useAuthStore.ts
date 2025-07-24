import { create } from 'zustand';

interface IAuthState {
    email: string;
    password: string;
    socialId: number;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setSocialId: (socialId: number) => void;
    resetAuth: () => void;
}

const useAuthStore = create<IAuthState>((set) => ({
    email: '',
    password: '',
    socialId: -1,
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setSocialId: (socialId) => set({ socialId }),
    resetAuth: () => set({ email: '', password: '' }),
}));

export default useAuthStore;
