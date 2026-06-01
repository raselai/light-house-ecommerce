import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor Lights',
  description: 'Explore our outdoor lighting collection — garden lights, floodlights, solar lights, wall fixtures, and street lamps. Weatherproof and built for UAE conditions.',
  openGraph: {
    title: 'Outdoor Lights | Relight EAL',
    description: 'Garden lights, floodlights, solar lights and more. Weatherproof outdoor lighting built for UAE conditions.',
  },
  alternates: { canonical: 'https://www.relighteal.com/outdoor-lights' },
};

export default function OutdoorLightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
