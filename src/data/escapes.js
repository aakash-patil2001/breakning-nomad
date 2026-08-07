import mahabaleshwarImage from '../assets/images/6-final.png'
import tarkarliImage from '../assets/images/7-final.png'
import puneImage from '../assets/images/8-final.png'
import mountainsImage from '../assets/images/2-final.png'
import wildlifeImage from '../assets/images/5-final.png'
import beachesImage from '../assets/images/3-final.png'
import cityImage from '../assets/images/4-final.png'
import heroImage from '../assets/images/1-final.png'
import closingImage from '../assets/images/9-final.png'

// Single source of truth for the escapes list — the homepage teaser
// (Escapes.jsx), the full listing (pages/EscapesPage.jsx), and each detail
// page (pages/EscapeDetailPage.jsx) all read from this so none of them can
// drift out of sync.
export const escapes = [
  {
    slug: 'mahabaleshwar',
    name: 'Mahabaleshwar',
    tag: 'Mountains',
    image: mahabaleshwarImage,
    description: 'Misty hill mornings and slow mountain air.',
    tagline: 'Where the clouds sit lower than the hills',
    destination: 'Maharashtra, India',
    groupSize: 'Max 12 Travelers',
    price: 249,
    duration: '5D/4N',
    paragraphs: [
      "Mahabaleshwar sits high in the Sahyadri range, wrapped in mist for most of the year. Mornings start slow — coffee on a balcony, the valley still hidden below cloud line — and the work happens from a quiet desk with a view instead of four walls.",
      "Afternoons are for the parts you came for: strawberry farms, forest viewpoints, and the kind of silence that's hard to find at home. Evenings are open — a bonfire, a slow dinner, or just more of that mountain air.",
    ],
    highlights: [
      'Sunrise at Wilson Point',
      'Strawberry farm visit & tasting',
      "Trek to Arthur's Seat",
      'Bonfire evenings with the group',
      'Coworking space with valley views',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival & Settling In',
        location: 'Mahabaleshwar',
        description:
          'Arrive into Mahabaleshwar, check into your stay, and ease in. No plans for the evening beyond a walk and a good dinner.',
      },
      {
        day: 'Day 2',
        title: 'Work Day + Mapro Garden',
        location: 'Mapro Garden',
        description:
          'Full workday from the shared workspace, then an evening at Mapro Garden for strawberries-and-cream and the sunset.',
      },
      {
        day: 'Day 3',
        title: "Arthur's Seat Trek",
        location: "Arthur's Seat",
        description:
          "Morning trek to Arthur's Seat, known as the “Queen of all Points.” Afternoon back at your desk, evening free.",
      },
      {
        day: 'Day 4',
        title: 'Work Day + Bonfire Night',
        location: 'Basecamp',
        description:
          'Another quiet work day, capped off with a group bonfire under a genuinely dark sky.',
      },
      {
        day: 'Day 5',
        title: 'Departure',
        location: 'Mahabaleshwar',
        description: 'Slow morning, checkout, and a group breakfast before everyone heads home.',
      },
    ],
    inclusions: [
      'Shared accommodation',
      'Dedicated workspace & wifi',
      'Daily breakfast',
      'Airport/station transfers',
      'One group excursion',
    ],
    exclusions: [
      'Flights or trains to Pune/Mumbai',
      'Travel insurance',
      'Lunches & dinners (except Day 5)',
      'Personal spending',
    ],
    gallery: [mountainsImage, wildlifeImage],
  },
  {
    slug: 'tarkarli',
    name: 'Tarkarli',
    tag: 'Beach',
    image: tarkarliImage,
    description: 'Quiet coastline, work with your feet in the sand.',
    tagline: 'Work with the tide as your background noise',
    destination: 'Sindhudurg, Maharashtra, India',
    groupSize: 'Max 12 Travelers',
    price: 199,
    duration: '4D/3N',
    paragraphs: [
      "Tarkarli is the Konkan coast at its quietest — white sand, clear water, and none of the crowds you'd expect from a beach town. Your desk faces the water; your lunch break is a walk to the shore.",
      "Between work blocks there's scuba diving in one of India's clearest coastal waters, a visit to Sindhudurg Fort sitting just offshore, and evenings that end with your feet still sandy.",
    ],
    highlights: [
      'Scuba diving session included',
      'Sindhudurg Fort boat trip',
      'Beachfront workspace',
      'Konkani seafood dinners',
      'Backwater canoe ride',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival & Beach Walk',
        location: 'Tarkarli Beach',
        description:
          'Arrive, settle in, and take a slow first walk along Tarkarli beach as the sun goes down.',
      },
      {
        day: 'Day 2',
        title: 'Work Day + Scuba Diving',
        location: 'Tarkarli Bay',
        description:
          'Morning work block, then an afternoon scuba diving session in the bay — no experience needed.',
      },
      {
        day: 'Day 3',
        title: 'Sindhudurg Fort & Backwaters',
        location: 'Sindhudurg Fort',
        description:
          'A half-day trip out to Sindhudurg Fort and a canoe ride through the backwaters, back at your desk by afternoon.',
      },
      {
        day: 'Day 4',
        title: 'Departure',
        location: 'Tarkarli',
        description: 'Final breakfast by the water before heading out.',
      },
    ],
    inclusions: [
      'Shared accommodation',
      'Dedicated workspace & wifi',
      'Daily breakfast',
      'Scuba diving session',
      'Sindhudurg Fort trip',
    ],
    exclusions: [
      'Flights or trains to Sindhudurg',
      'Travel insurance',
      'Lunches & dinners',
      'Personal spending',
    ],
    gallery: [beachesImage, cityImage],
  },
  {
    slug: 'pune',
    name: 'Pune',
    tag: 'City',
    image: puneImage,
    description: 'City energy, good coffee, better company.',
    tagline: 'A short trip that still feels like a reset',
    destination: 'Maharashtra, India',
    groupSize: 'Max 15 Travelers',
    price: 99,
    duration: '2D/1N',
    paragraphs: [
      "Pune is the trip for when you can't get more than a weekend away but still need out of your usual four walls. Good coffee, reliable wifi, and a city that moves at a pace that's easy to work alongside.",
      "It's short by design — a change of scenery and a bit of company, without needing to clear your calendar.",
    ],
    highlights: [
      'Coworking café crawl',
      'Aga Khan Palace visit',
      'Group dinner at a local favorite',
      'Osho Ashram garden walk',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival & City Coworking',
        location: 'Koregaon Park',
        description:
          'Arrive, check in, and settle into a coworking café for the afternoon. Group dinner in the evening.',
      },
      {
        day: 'Day 2',
        title: 'Aga Khan Palace & Departure',
        location: 'Aga Khan Palace',
        description:
          'Morning visit to Aga Khan Palace, then a relaxed lunch before everyone heads home.',
      },
    ],
    inclusions: ['Shared accommodation', 'Coworking day pass', 'Daily breakfast', 'One group dinner'],
    exclusions: ['Travel to/from Pune', 'Travel insurance', 'Lunch (Day 1)', 'Personal spending'],
    gallery: [heroImage, closingImage],
  },
]
