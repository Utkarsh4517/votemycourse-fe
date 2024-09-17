import { Playfair_Display, Vina_Sans, Sahitya } from "next/font/google";


const vinaSans = Vina_Sans({ subsets: ['latin'], weight: ['400']});
const playFairDisplay = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '400'],
  style: ['normal', 'italic'],
});
const sahitya = Sahitya({ 
  subsets: ['latin'], 
  weight: ['400', '400'],
  style: ['normal'],
});

export const vinaSansFont = vinaSans.className;
export const playFairDisplayFont = playFairDisplay.className;
export const sahityaFont = sahitya.className;