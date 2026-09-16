import { createContext } from 'svelte';

export interface SlideshowContext {
  currentDisplayIndex: number;
  direction: number;
  setIndex: (index: number) => void;
  setDirection: (dir: number) => void;
}

export const [getSlideshowContext, setSlideshowContext] = createContext<SlideshowContext>();
