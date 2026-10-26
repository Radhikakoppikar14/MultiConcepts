export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface PromiseItem {
  id: string;
  title: string;
  pillar: string;
  description: string;
  iconName: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  milestone: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Architecture' | 'Interiors';
  imageSrc: string;
  description: string;
  location?: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  location?: string;
  rating: number;
  message: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  imageSrc: string;
}

export const COMPANY_INFO = {
  name: 'MultiConcepts',
  parentOf: 'Paramount Enterprises',
  headline: 'Construction par Excellence',
  tagline: 'Your dreams made a reality',
  subheading: 'Welcome to Multiconcepts, your trusted partner for all your construction needs. With years of experience in this industry, dedicated to delivering outstanding construction projects that exceed all expectations.',
  fullAboutIntro: 'Welcome to Multiconcepts, parent company of Paramount Enterprises, where creativity meets excellence in construction. With a legacy spanning over 25 years, we take immense pride in shaping dreams and crafting spaces that inspire.',
  address: '2073, BCC Layout, Blue Building, Near Vajarahalli Metro station, Raghuvanahalli, Kanakapura Main Road, Bangalore-560062',
  mapUrl: 'https://maps.google.com/?q=2073,+BCC+Layout,+Blue+Building,+Near+Vajarahalli+Metro+station,+Raghuvanahalli,+Kanakapura+Main+Road,+Bangalore-560062',
  phones: ['+91-9886032343', '+91-9845026262'],
  email: 'reach@multiconcepts.in',
  hours: {
    weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 2:00 PM',
    sunday: 'Sunday: Closed',
  },
  logo: '/assests/images/logo.jpg',
  badge: '/assests/images/log.jpg',
  heroBg: '/assests/images/hero2.jpg',
  aboutHeroBg: '/assests/images/hero.png',
  developerCredit: 'Developed by: FLIONE TECHNOLOGIES',
  developerUrl: 'https://flionetech.com/',
  copyrightYear: 2026,
};

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects Completed', description: 'Delivered across residential and commercial sectors' },
  { value: 200, suffix: '+', label: 'Happy Clients', description: 'Families and businesses satisfied with our craftsmanship' },
  { value: 25, suffix: '+', label: 'Years Experience', description: 'Over two decades of architectural and construction mastery' },
  { value: 25, suffix: '+', label: 'Awards Won', description: 'Recognized for structural integrity, innovation & design' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'construction',
    title: 'Residential & Commercial Construction',
    tagline: 'Building Quality, Shaping Futures',
    description: 'Delivering expert construction execution for both residential and commercial projects to bring structural blueprints to life.',
    iconName: 'Building2',
    features: ['Residential villa and independent home construction', 'Commercial complex and corporate building development', 'On-site quality control and structural durability standards', 'Timely project milestone delivery and execution'],
  },
  {
    id: 'real-estate-consultancy',
    title: 'Real Estate Consultancy',
    tagline: 'Your Trusted Guide in Property Investment',
    description: 'Providing professional guidance, market insights, and strategic assistance to clients for purchasing land, plots, and properties.',
    iconName: 'Landmark',
    features: ['Land and plot acquisition guidance', 'Market trend analysis and location scouting', 'Legal verification and title deed assistance', 'Investment portfolio advisory for optimal returns'],
  },
  {
    id: 'property-management',
    title: 'Property Management Services',
    tagline: 'Total Care for Your Valued Assets',
    description: 'Managing properties completely on behalf of owners and NRIs, taking care of every operational and administrative detail.',
    iconName: 'ShieldCheck',
    features: ['Tenant sourcing, screening, and agreement handling', 'Regular maintenance, upkeep, and cleaning coordination', 'Rental collection and tax payment administration', 'Periodic property inspection reports for remote owners'],
  },
  {
    id: 'interior-works',
    title: 'Project Distribution / Interior Works',
    tagline: 'Transforming Spaces, Maximizing Reach',
    description: 'Showcasing expert project distribution services alongside sophisticated interior design and execution works.',
    iconName: 'Palette',
    features: ['Comprehensive interior styling and layout planning', 'Commercial and residential interior execution', 'Strategic project distribution and marketing support', 'Custom spatial aesthetics and finish optimization'],
  },
  {
    id: 'solar-power',
    title: 'Solar Power',
    tagline: 'Harnessing Clean Energy for Tomorrow',
    description: 'Integrating sustainable, renewable energy solutions and solar power installations to modernize properties and reduce energy costs.',
    iconName: 'Sun',
    features: ['Rooftop solar panel design and installation', 'Grid-tied and off-grid system integration', 'Energy efficiency consultation and carbon footprint reduction', 'Long-term maintenance and power output optimization'],
  },
  {
    id: 'architectural',
    title: 'Architectural Design',
    tagline: 'Where Imagination Meets Reality',
    description: 'Designing structures that push boundaries, merging form with functionality to leave a lasting impression.',
    iconName: 'Compass',
    features: ['2D space planning & statutory sanction layouts', 'High-definition 3D visualization & walkthroughs', 'Passive daylight and ventilation optimization', 'Structural engineering & soil stability assessment'],
  },
];

export const PROMISES: PromiseItem[] = [
  {
    id: 'quality',
    title: 'Crafting Perfection',
    pillar: 'Quality',
    description: 'Quality is the cornerstone of our work. We believe that excellence is achieved through attention to detail, the use of top-tier materials, and a dedication to the highest construction standards. Each project is a testament to our unwavering pursuit of perfection, resulting in structures that stand the test of time.',
    iconName: 'Award',
  },
  {
    id: 'time',
    title: 'Punctuality at its Best',
    pillar: 'Time',
    description: 'We value your time as much as you do. Our streamlined processes and expert project management ensure that deadlines are not just met but exceeded. We understand the significance of timely project delivery, and our efficient practices make it possible without compromising on quality or design.',
    iconName: 'Clock',
  },
  {
    id: 'cost',
    title: 'Transparency and Value',
    pillar: 'Cost',
    description: 'We comprehend the significance of managing costs without compromising on quality. Our transparent pricing, combined with effective resource management, ensures that your project is not just a financial investment but a valuable endeavor that delivers remarkable returns.',
    iconName: 'Coins',
  },
];

export const ASSURANCE = {
  title: 'Our Assurance: Your Vision, Our Priority',
  paragraphs: [
    'By selecting Paramount Enterprises, you’re choosing a partner dedicated to transforming your aspirations into reality. Our commitment to Quality, Time, and Cost excellence goes beyond words—it’s a commitment that’s reflected in the satisfaction of our clients and the structures that stand as a testament to our dedication.',
    'Experience the Paramount Promise firsthand. Reach out to us today to embark on a journey where your vision is nurtured, executed with precision, and celebrated through exceptional quality, timely delivery, and cost-effectiveness. Your dreams, our unwavering commitment.',
  ],
};

export const ABOUT_DETAILS = {
  heroTitle: 'About Our Company',
  journeyTitle: 'Our Journey',
  journeyText: 'At Paramount Enterprises, our journey began more than two decades ago with a vision to redefine the art of construction. Throughout these years, we have transformed countless ideas into reality, creating architectural marvels that stand the test of time. Our unwavering commitment to quality, innovation, and customer satisfaction has made us a trusted name in the industry.',
  expertiseTitle: 'Unparalleled Expertise',
  expertiseText: 'What sets us apart is our team of in-house architects, structural engineers, 2D & 3D designers, and a construction crew equipped with skill and knowledge. Each member of our team brings in a wealth of expertise to the table, working with perfect harmony to deliver projects that exceed all expectations. We combine creative vision with technical expertise, ensuring every project is an embodiment of art and engineering put together.',
  philosophyTitle: 'Our Philosophy',
  philosophyItems: [
    {
      title: 'Trust',
      description: 'We believe in building lasting relationships based on trust and integrity.',
      icon: '/assests/images/icon1.png',
      alt: 'Trust Icon',
    },
    {
      title: 'Quality',
      description: 'Our commitment to the highest standards of quality is unwavering in every project.',
      icon: '/assests/images/icon3.png',
      alt: 'Quality Icon',
    },
    {
      title: 'Transparency',
      description: 'We maintain clear and open communication throughout the entire construction process.',
      icon: '/assests/images/icon2.png',
      alt: 'Transparency Icon',
    },
  ],
  clientCentricTitle: 'Client-Centric Approach',
  clientCentricText: 'At Paramount Enterprises, we keep our clients at the heart of everything we do. We take our time to understand their requirements, preferences, and needs, tailoring solutions to suit their vision. With a keen eye for detail and a passion for perfection, we bring dreams to life, ensuring an experience that is seamless and stress-free.',
  timelineTitle: 'Our History: A Timeline of Excellence',
  timeline: [
    {
      year: '1999',
      title: 'The year we started',
      description: 'The first residential project delivered with meticulous engineering and client trust.',
      milestone: 'Inaugural residential milestone',
    },
    {
      year: '2003',
      title: 'The year we grew',
      description: 'Completed 8+ residential homes and took our first bold step into commercial project execution.',
      milestone: 'Commercial sector expansion',
    },
    {
      year: '2006',
      title: 'The Year we transformed',
      description: 'Completed 17+ residential, 3+ commercial developments and initiated our first major apartment project.',
      milestone: 'Multi-unit residential breakthrough',
    },
    {
      year: '2025',
      title: 'Our Current year',
      description: 'Completed 60+ Residential, 6+ Apartment complexes, 4+ commercial projects and multiple ongoing flagship sites.',
      milestone: 'Over 25 years of construction excellence',
    },
  ],
};

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Contemporary Brick & Cantilever Multi-Storey Residence',
    category: 'Residential',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf75f48b3f4.12846191.jpg',
    description: 'Multi-level architectural residence featuring exposed terracotta brickwork, cantilevered window bays, rooftop terrace garden, and modern plumbing integration.',
    location: 'Bangalore South',
    tag: 'Completed Residence',
  },
  {
    id: 'proj-2',
    title: 'Paramount Apartments - 5-Storey Residential Complex',
    category: 'Commercial',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf74b5e75e9.31078058.jpg',
    description: 'Flagship 5-storey apartment building executed by Paramount Enterprises featuring spacious balconies, stilt parking, central elevator core, and contemporary facade styling.',
    location: 'Kanakapura Main Road',
    tag: 'Flagship Complex',
  },
  {
    id: 'proj-3',
    title: 'JJ Home - 5-Storey Contemporary Apartment Complex',
    category: 'Commercial',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf696ad30b9.41820980.jpg',
    description: 'Modern multi-unit residential project with striking blue and grey exterior accents, private glass-railing balconies, secure boundary gates, and covered ground-floor parking.',
    location: 'Bangalore Urban',
    tag: 'Apartment Complex',
  },
  {
    id: 'proj-4',
    title: 'A.N.N Lake Residency - Multi-Storey Residential Tower',
    category: 'Commercial',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf680010ea2.75112851.jpg',
    description: 'Distinctive 5-storey residential tower featuring arched architectural balconies, warm ochre and cream facade finishes, and dedicated stilt parking.',
    location: 'BCC Layout, Kanakapura Road',
    tag: 'Landmark Residency',
  },
  {
    id: 'proj-5',
    title: 'Modern Timber Clad Cantilever Villa',
    category: 'Architecture',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf673cc67d8.57022544.jpg',
    description: 'Striking cubic architectural villa with warm natural timber cladding, dramatic floating cantilevered first-floor mass, corner ribbon windows, and stone paved entry.',
    location: 'Raghuvanahalli',
    tag: 'Architectural Masterpiece',
  },
  {
    id: 'proj-6',
    title: 'Kerala-Style Heritage Villa Estate with Mangalore Tiles',
    category: 'Residential',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf668430ba7.89454066.jpg',
    description: 'Timeless luxury estate villa featuring traditional pitched Mangalore red-tile roofs, exposed brick perimeter compound wall, ornate boundary gates, and lush landscaped garden.',
    location: 'South Bangalore',
    tag: 'Heritage Luxury Villa',
  },
  {
    id: 'proj-7',
    title: 'Pristine White & Terracotta Villa with Manicured Lawn',
    category: 'Residential',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf62f168a97.69785994.jpg',
    description: 'Custom independent bungalow with multi-tier terracotta roof gables, natural stone compound wall with black metal railings, paved driveway, and manicured green lawn.',
    location: 'Bangalore South',
    tag: 'Independent Bungalow',
  },
  {
    id: 'proj-8',
    title: 'Grand Stone Turret Villa with Stilt Garage',
    category: 'Residential',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf609625d32.19206164.jpg',
    description: 'Sophisticated multi-tier villa with curved natural stone bay windows, red-tile pitched roof, covered underground two-car garage, and cobblestone access road.',
    location: 'Kanakapura Corridor',
    tag: 'Custom Luxury Villa',
  },
  {
    id: 'proj-9',
    title: 'Elegant Dual-Storey Ochre Villa Residence',
    category: 'Residential',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf613f1f8f5.37710786.jpg',
    description: 'Modern two-storey residence with arched balcony pediments, warm terracotta and cream dual-tone facade, covered car porch, and green rooftop terrace.',
    location: 'South Bangalore',
    tag: 'Modern Residence',
  },
  {
    id: 'proj-10',
    title: 'Contemporary Arched Villa with Natural Stone Facade',
    category: 'Architecture',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf6209acf22.95563658.jpg',
    description: 'Sophisticated modern home with semicircular roof arches, textured natural granite lower wall cladding, wide covered front porch, and expansive terrace balcony.',
    location: 'Bangalore Urban',
    tag: 'Contemporary Architecture',
  },
  {
    id: 'proj-11',
    title: 'Architectural Stone Pergola & Exterior Staircase Craft',
    category: 'Interiors',
    imageSrc: '/assests/uploads/gallery/gallery_68ecf65b1a7e51.85611401.jpg',
    description: 'Detailed craftsmanship showcase featuring horizontal cut-stone masonry walls, reinforced concrete pergola roof beams, stainless steel balustrade staircase, and stepped stone paving.',
    location: 'Bangalore West',
    tag: 'Masonry & Pergola Craft',
  },
];

export const VENTURE_HAFELE = {
  partnerName: 'Hafele India',
  tagline: 'Functionality for You',
  logo: '/assests/images/haefele_logo.png',
  officialUrl: 'https://www.hafeleindia.com/en/',
  aboutTitle: 'About Hafele',
  aboutParagraphs: [
    'Hafele is an international company providing hardware and fitting systems and electronic access control systems. With a history spanning nearly a century, Hafele has become a leading global name in the industry, known for its German quality, innovation, and functionality.',
    'In India, Hafele has established a strong presence, offering a vast range of solutions that combine smart concepts, innovative products, and complete solutions for homes and commercial projects. They are committed to understanding the specific needs of the Indian market and delivering products that enhance the quality of life.',
  ],
  productWorldTitle: 'Our Product World',
  productWorldLead: "Hafele's product range is designed to bring efficiency and elegance to any space. The offerings are broadly categorized to cater to every need of an interior.",
  sections: [
    {
      title: 'Kitchen and Furniture Fittings',
      description: 'From state-of-the-art drawer systems and hinges to advanced kitchen appliances and clever storage solutions, Hafele transforms the kitchen into a highly functional and beautiful space. Their furniture fittings ensure that cabinets and wardrobes are not just stylish but also practical and durable.',
      points: [
        'Soft-close concealed hinges and lift systems',
        'Heavy-duty tandem drawer runners & corner storage carousels',
        'Built-in kitchen appliances & designer sinks',
        'Ergonomic wardrobe accessories and pull-out organizers',
      ],
    },
    {
      title: 'Architectural Hardware',
      description: 'This range includes everything needed for doors, windows, and glass systems. Hafele provides high-quality door handles, locks, sliding door systems, and access control solutions that are trusted by architects and builders for their reliability and design.',
      points: [
        'Commercial and residential mortise locks & architectural levers',
        'Smooth synchronized glass sliding systems',
        'Biometric, digital and RFID access control solutions',
        'Heavy-duty floor springs and concealed door closers',
      ],
    },
  ],
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh & Sunita Kulkarni',
    company: 'Homeowners, Kanakapura Road',
    location: 'Bangalore',
    rating: 5,
    message: 'MultiConcepts built our independent villa from foundation to final interior styling. Their commitment to on-time handover and transparent billing was extraordinary. Every small detail we requested was honored with great patience.',
    date: 'February 2026',
  },
  {
    id: 'test-2',
    name: 'Suresh V. Shetty',
    company: 'Managing Director, Apex Logistics',
    location: 'Bangalore South',
    rating: 5,
    message: 'We engaged Paramount Enterprises for our 4-storey commercial office facility. The structural execution was flawless, and having the Hafele architectural hardware fittings integrated directly gave our offices an executive international feel.',
    date: 'January 2026',
  },
  {
    id: 'test-3',
    name: 'Ananya Deshmukh',
    company: 'Architect & Interior Designer',
    location: 'Bangalore',
    rating: 5,
    message: 'As an architect, working with a builder who truly respects drawings and tolerances is rare. MultiConcepts possesses top-tier in-house engineering and an eye for aesthetics. A truly dependable partner.',
    date: 'December 2025',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Modern Residential Architecture in Bangalore: Balancing Climate & Luxury',
    slug: 'modern-residential-architecture-bangalore',
    category: 'Architecture',
    date: 'March 15, 2026',
    readTime: '4 min read',
    summary: 'Discover how contemporary residential designs blend cross-ventilation, shaded overhangs, and natural stone textures to thrive in Bangalore’s micro-climates.',
    content: [
      'Bangalore’s distinct climate offers a prime opportunity for architectural designs that merge open-plan living with climate adaptability. In contemporary villa projects, maximizing natural light while mitigating radiant afternoon heat is achieved through deep cantilevered balconies and vertical terracotta fins.',
      'By integrating central courtyards and double-height atriums, hot air rises naturally and exits through clerestory windows, reducing the reliance on artificial air conditioning. MultiConcepts approaches every residential blueprint with this harmony between thermodynamics and aesthetic elegance.',
      'Selecting durable local granite coping and weather-coated exterior textures ensures that the structure maintains its pristine visual appeal throughout monsoons and intense sun seasons alike.',
    ],
    imageSrc: '/assests/uploads/gallery/gallery_68ecf75f48b3f4.12846191.jpg',
  },
  {
    id: 'blog-2',
    title: 'The Art of Precision Joinery: Integrating German Hardware in Modular Interiors',
    slug: 'precision-joinery-german-hardware',
    category: 'Interior Design',
    date: 'February 28, 2026',
    readTime: '5 min read',
    summary: 'How premium fittings from Hafele elevate kitchens and wardrobes from everyday storage into lifetime functional art.',
    content: [
      'A luxury kitchen is defined not merely by its countertop stone or door finish, but by what happens behind the scenes. German-engineered hardware guarantees smooth glide, silent dampening, and reliable load bearing across tens of thousands of cycles.',
      'Through our venture partnership with Hafele India, MultiConcepts incorporates synchronized sliding mechanisms and heavy-duty tandem runners directly into the architectural layout, eliminating dead corners and maximizing every cubic inch.',
      'Whether specifying concealed soft-close hinges or digital touch-latch systems, the outcome is effortless ergonomics and a tranquil living environment.',
    ],
    imageSrc: '/assests/uploads/gallery/gallery_68ecf668430ba7.89454066.jpg',
  },
  {
    id: 'blog-3',
    title: 'The Three Pillars of Project Execution: Quality, Time, and Transparent Costing',
    slug: 'three-pillars-project-execution',
    category: 'Engineering & Construction',
    date: 'January 18, 2026',
    readTime: '3 min read',
    summary: 'An insider look into how streamlined stage-wise milestones eliminate construction delays and unexpected budget inflation.',
    content: [
      'Construction projects frequently suffer from ambiguity, scope creep, and vague timelines. At MultiConcepts and Paramount Enterprises, we tackle these systemic industry challenges through rigorous milestone-driven contracts.',
      'Every project commences with comprehensive 3D coordination drawings, structural load modeling, and a detailed Bill of Quantities (BOQ). Clients know exactly what materials will be deployed at every foundation, slab, and finishing phase.',
      'Our on-site supervisors perform daily checklist audits, guaranteeing structural soundness while keeping the delivery timeline firmly on track.',
    ],
    imageSrc: '/assests/uploads/gallery/gallery_68ecf62f168a97.69785994.jpg',
  },
];