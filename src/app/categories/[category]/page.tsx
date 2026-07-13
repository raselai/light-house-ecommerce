import { Metadata } from 'next';
import CategoryContent from './CategoryContent';

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  'hanging-lights':   { name: 'Hanging Lights',    description: 'Elegant hanging lights and crystal chandeliers for homes and commercial spaces in UAE. Energy-efficient LED options available.' },
  'spotlight':        { name: 'Spotlights',         description: 'Precision LED spotlights with adjustable beam angles for accent and task lighting. Dimmable options available across UAE.' },
  'pendant-lights':   { name: 'Pendant Lights',     description: 'Contemporary and classic pendant lights for kitchens, dining areas and living rooms. Multiple finishes and height adjustments.' },
  'magnetic-light':   { name: 'Magnetic Lights',    description: 'Innovative magnetic track lighting systems for flexible, modular illumination in homes and offices across UAE.' },
  'led-tube':         { name: 'LED Tube Lights',    description: 'High-performance LED tube lights for commercial and residential use. Up to 50,000 hours lifespan with instant start capability.' },
  'office-lights':    { name: 'Office Lights',      description: 'Professional anti-glare office lighting with high CRI and motion sensor options. Boost productivity with the right lighting.' },
  'warehouse-light':  { name: 'Warehouse Lights',   description: 'Industrial-grade high-output lighting for warehouses and large commercial spaces. Wide beam angles and durable construction.' },
  'led-strip':        { name: 'LED Strip Lights',   description: 'Flexible LED strip lights for accent, under-cabinet, and decorative lighting. RGB options with remote control and waterproof variants.' },
  'aluminum-profile': { name: 'Aluminum Profile Lights', description: 'Professional aluminum profile lighting systems for architectural and commercial applications. Sleek design with excellent light distribution.' },
  'mirror-light':     { name: 'Mirror Lights',      description: 'Elegant mirror lighting for bathrooms, dressing rooms, and vanity areas. Soft flattering illumination with easy installation.' },
  'led-track-lights': { name: 'LED Track Lights',   description: 'Versatile LED track lighting for galleries, retail spaces, and accent lighting. Easily repositioned and energy efficient.' },
  'wall':             { name: 'Wall Lights',         description: 'Beautiful wall-mounted sconces and wall washers for ambient and decorative lighting in homes and hospitality spaces across UAE.' },
  'stand':            { name: 'Stand Lights',        description: 'Freestanding floor lamps combining illumination and decorative appeal. Perfect for living rooms and reading areas.' },
  'garden-light':     { name: 'Garden Lights',       description: 'Weather-resistant garden and landscape lighting for UAE outdoor spaces. Solar-powered and security lighting options available.' },
  'floodlight':       { name: 'Floodlights',         description: 'High-intensity LED floodlights for security, sports facilities, and large outdoor areas. Powerful and energy-efficient.' },
  'solar-light':      { name: 'Solar Lights',        description: 'Eco-friendly solar-powered outdoor lighting. Automatic dusk-to-dawn operation with no wiring required. Sustainable UAE lighting.' },
  'others':           { name: 'Other Lighting',      description: 'Specialty and custom lighting solutions that don\'t fit traditional categories. Unique designs and one-of-a-kind fixtures.' },
};

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const slug = decodeURIComponent(category);
  const meta = CATEGORY_META[slug];
  const name = meta?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const description = meta?.description ?? `Shop our ${name} collection at SK Light House. Premium lighting products available in UAE.`;
  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | SK Light House`,
      description,
    },
    alternates: { canonical: `https://www.sklighthouse.com/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categorySlug = decodeURIComponent(category);
  return <CategoryContent categorySlug={categorySlug} />;
}
