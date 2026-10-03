import { ShopItem } from '../types';

export const initialShopItems: ShopItem[] = [
  {
    id: 1,
    slug: 'urdu-study-bible',
    name: 'Complete Urdu Study Bible (Bonded Edition)',
    description: 'High-grade printed Holy Scriptures with commentary notes, maps, and cross-references. All proceeds fund free distribution to illiterate kiln laborers completing our literacy courses.',
    price: 35,
    category: 'Bibles & Scriptures',
    imageUrl: '/assets/images/children-reading-bibles.jpg',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    slug: 'brick-kiln-chronicles-book',
    name: 'Spreading Light in the Kilns — Rev. Azeem Tariq',
    description: 'The definitive biographical account and theological manifesto detailing twenty years of frontline pastoral ministry, miraculous debt rescues, and underground church revivals.',
    price: 25,
    category: 'Ministry Literature',
    imageUrl: '/assets/images/rev-azeem-tariq-dedication.jpg',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    slug: 'children-scripture-primer',
    name: 'Next-Gen Christian Literacy Primer',
    description: 'Illustrated bilingual literacy workbook used across our frontline brick-kiln evening schools, introducing children to Scripture reading and foundational arithmetic.',
    price: 15,
    category: 'Education & Literacy',
    imageUrl: '/assets/images/children-reading-bibles.jpg',
    inStock: true
  },
  {
    id: 4,
    slug: 'frontline-prayer-journal',
    name: 'Annual Mission Prayer Guide & Journal',
    description: 'Structured 52-week devotional guide containing verified prayer requests, monthly missionary letters, and photographic dispatches from our field teams.',
    price: 20,
    category: 'Devotional & Prayer',
    imageUrl: '/assets/images/village-borehole-dedication.jpg',
    inStock: true
  },
  {
    id: 5,
    slug: 'punjabi-new-testament',
    name: 'Vernacular Punjabi New Testament',
    description: 'Clear, large-print vernacular New Testament with the Gospel of John emphasized. Prepared specifically for village believers in rural Punjab.',
    price: 18,
    category: 'Bibles & Scriptures',
    imageUrl: '/assets/images/children-reading-bibles.jpg',
    inStock: true
  }
];
