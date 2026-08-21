import { NextRequest, NextResponse } from 'next/server';
import { hotelService } from '@/services/hotel.service';
import { findAirport } from '@/lib/airport-validator';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const destinationInput = searchParams.get('destination')?.trim();
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = parseInt(searchParams.get('guests') || '2');

    // Validation
    if (!destinationInput || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Destination, check-in, and check-out dates are required' },
        { status: 400 }
      );
    }

    // Try to find the destination as an airport/city
    const airport = findAirport(destinationInput);
    const destinationCity = airport ? airport.city : destinationInput;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out must be after check-in' },
        { status: 400 }
      );
    }

    console.log(`🔍 Searching hotels: ${destinationCity} from ${checkIn} to ${checkOut}`);
    
    // Search hotels with real data
    const hotels = await hotelService.searchHotels({
      destination: destinationCity,
      checkIn,
      checkOut,
      guests,
      rooms: Math.ceil(guests / 2),
      currency: 'NGN',
    });

    // Sort by price
    hotels.sort((a, b) => a.price.amount - b.price.amount);

    return NextResponse.json({
      success: true,
      data: hotels,
      count: hotels.length,
      currency: 'NGN',
      source: 'real-time',
      search: {
        destination: destinationCity,
        checkIn,
        checkOut,
        guests,
      },
    });
  } catch (error) {
    console.error('Hotel search error:', error);
    return NextResponse.json(
      { error: 'Failed to search hotels. Please try again.' },
      { status: 500 }
    );
  }
}