import { NextResponse } from 'next/server';

const featuredPackages = [
  {
    id: '1',
    title: 'European Adventure',
    description: '7 days exploring the best of Europe',
    price: '₦1,299,000',
    duration: '7 Days',
    group: 'Up to 15 people',
    destination: 'Europe',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    included: ['Flights', 'Hotels', 'Breakfast', 'Tours'],
    rating: 4.9,
    reviews: 156
  },
  {
    id: '2',
    title: 'Tropical Paradise',
    description: '5 days in exotic beach destinations',
    price: '₦899,000',
    duration: '5 Days',
    group: 'Up to 10 people',
    destination: 'Bali',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    included: ['Hotels', 'Meals', 'Transfers', 'Activities'],
    rating: 4.8,
    reviews: 215
  },
  {
    id: '3',
    title: 'Cultural Journey',
    description: '10 days discovering ancient civilizations',
    price: '₦1,599,000',
    duration: '10 Days',
    group: 'Up to 12 people',
    destination: 'Egypt',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    included: ['Flights', 'Hotels', 'Meals', 'Guided Tours', 'Transport'],
    rating: 4.9,
    reviews: 184
  },
  {
    id: '4',
    title: 'African Safari',
    description: '8 days exploring the wild beauty of Africa',
    price: '₦1,899,000',
    duration: '8 Days',
    group: 'Up to 10 people',
    destination: 'Kenya',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    included: ['Flights', 'Safari Lodges', 'Meals', 'Game Drives', 'Guide'],
    rating: 4.9,
    reviews: 223
  }
];

export async function GET() {
  try {
    // In production, fetch from database
    // const packages = await Package.find({ featured: true }).limit(3);
    
    return NextResponse.json({
      success: true,
      data: featuredPackages.slice(0, 3),
      count: 3,
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}