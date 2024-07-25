import { Inter, Space_Grotesk, Montserrat_Subrayada } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const montserrat_subrayada = Montserrat_Subrayada({
  subsets: ['latin'],
  display: 'auto',
  weight: ['400', '700'],
  variable: '--montserrat_subrayada',
});

export const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'optional',
  variable: '--space_grotesk',
});
