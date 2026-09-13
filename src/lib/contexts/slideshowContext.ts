import { createContext } from 'svelte';

export interface SlideshowContext {
  currentDisplayIndex: number;
  direction: number;
}

export const [getSlideshowContext, setSlideshowContext] = createContext<SlideshowContext>();
