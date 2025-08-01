
export const categories = [
  // Indoor Lights
  {
    name: 'Chandeliers',
    image: '/images/categories/chandeliers.jpg',
    href: '/categories/chandeliers',
    type: 'indoor'
  },
  {
    name: 'Ceiling Lights',
    image: '/images/categories/ceiling-lights.jpg',
    href: '/categories/ceiling-lights',
    type: 'indoor'
  },
  {
    name: 'Wall Lamps',
    image: '/images/categories/wall-lamps.jpg',
    href: '/categories/wall-lamps',
    type: 'indoor'
  },
  {
    name: 'Pendant Lights',
    image: '/images/categories/pendant-lights.jpg',
    href: '/categories/pendant-lights',
    type: 'indoor'
  },
  // Outdoor Lights
  {
    name: 'Garden Lights',
    image: '/images/categories/garden-lights.jpg',
    href: '/categories/garden-lights',
    type: 'outdoor'
  },
  {
    name: 'Street Lamps',
    image: '/images/categories/street-lamps.jpg',
    href: '/categories/street-lamps',
    type: 'outdoor'
  },
  {
    name: 'Flood Lights',
    image: '/images/categories/flood-lights.jpg',
    href: '/categories/flood-lights',
    type: 'outdoor'
  },
  {
    name: 'Wall Fixtures',
    image: '/images/categories/wall-fixtures.jpg',
    href: '/categories/wall-fixtures',
    type: 'outdoor'
  },
];

export const indoorCategories = categories.filter(cat => cat.type === 'indoor');
export const outdoorCategories = categories.filter(cat => cat.type === 'outdoor');
