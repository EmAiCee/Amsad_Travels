import { NextResponse } from 'next/server';

// Mock data - In production, this would come from a database
const popularDestinations = [
  {
    id: '1',
    name: 'Paris, France',
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '₦450,000',
    rating: 4.8,
    reviews: 1243,
    currency: 'NGN'
  },
  {
    id: '2',
    name: 'Bali, Indonesia',
    city: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '₦280,000',
    rating: 4.9,
    reviews: 2156,
    currency: 'NGN'
  },
  {
    id: '3',
    name: 'Rome, Italy',
    city: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '₦380,000',
    rating: 4.7,
    reviews: 987,
    currency: 'NGN'
  },
  {
    id: '4',
    name: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '₦550,000',
    rating: 4.9,
    reviews: 1845,
    currency: 'NGN'
  },
  {
    id: '5',
    name: 'Dubai, UAE',
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '₦420,000',
    rating: 4.8,
    reviews: 2156,
    currency: 'NGN'
  },
  {
    id: '6',
    name: 'New York, USA',
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '₦600,000',
    rating: 4.7,
    reviews: 1987,
    currency: 'NGN'
  }
];

export async function GET() {
  try {
    // In production, fetch from database
    // const destinations = await Destination.find({ popular: true }).limit(8);
    
    return NextResponse.json({
      success: true,
      data: popularDestinations,
      count: popularDestinations.length,
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}