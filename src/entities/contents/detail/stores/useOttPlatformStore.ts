import { create } from 'zustand';
import { OttPlatform } from '@/shared/types/contents';

type OttPlatformStore = {
  platforms: OttPlatform[];
  setPlatforms: (platforms: OttPlatform[]) => void;
};

export const useOttPlatformStore = create<OttPlatformStore>((set) => ({
  platforms: [],
  setPlatforms: (platforms) => set({ platforms }),
}));
