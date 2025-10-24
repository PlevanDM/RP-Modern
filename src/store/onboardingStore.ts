import { create } from 'zustand';
import { User, Device, WorkExperience } from '../../types/models';

interface OnboardingState {
  role: 'client' | 'master' | null;
  profile: Partial<User>;
  devices: Device[];
  specialization: Partial<User>;
  experience: WorkExperience[];
  tools: string[];

  setRole: (role: 'client' | 'master') => void;
  updateProfile: (profileData: Partial<User>) => void;
  addDevice: (device: Device) => void;
  updateSpecialization: (specializationData: Partial<User>) => void;
  addExperience: (exp: WorkExperience) => void;
  updateTools: (tools: string[]) => void;

  reset: () => void;
}

const initialState = {
  role: null,
  profile: {},
  devices: [],
  specialization: {},
  experience: [],
  tools: [],
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setRole: (role) => set({ role }),

  updateProfile: (profileData) => set((state) => ({
    profile: { ...state.profile, ...profileData }
  })),

  addDevice: (device) => set((state) => ({
    devices: [...state.devices, device]
  })),

  updateSpecialization: (specializationData) => set((state) => ({
    specialization: { ...state.specialization, ...specializationData }
  })),

  addExperience: (exp) => set((state) => ({
    experience: [...state.experience, exp]
  })),

  updateTools: (tools) => set({ tools }),

  reset: () => set(initialState),
}));
