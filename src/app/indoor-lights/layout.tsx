import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indoor Lights',
  description: 'Browse our full range of indoor lighting — chandeliers, pendant lights, spotlights, LED strips, track lights, and more. Premium quality for homes and offices across UAE.',
  openGraph: {
    title: 'Indoor Lights | Relight EAL',
    description: 'Chandeliers, pendant lights, spotlights, LED strips and more. Premium indoor lighting for UAE homes and offices.',
  },
  alternates: { canonical: 'https://www.sklighthouse.com/indoor-lights' },
};

export default function IndoorLightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
