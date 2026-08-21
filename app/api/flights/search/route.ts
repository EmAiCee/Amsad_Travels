import { NextRequest, NextResponse } from 'next/server';
import { flightService } from '@/services/flight.service';
import { findAirport, getCityName, getAirportName, getAllAirports } from '@/lib/airport-validator';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const originInput = searchParams.get('origin')?.trim();
    const destinationInput = searchParams.get('destination')?.trim();
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const adults = parseInt(searchParams.get('adults') || '1');

    // Validation
    if (!originInput || !destinationInput || !departureDate) {
      return NextResponse.json(
        { error: 'Origin, destination, and departure date are required' },
        { status: 400 }
      );
    }

    // Find airports by city name or code
    const originAirport = findAirport(originInput);
    const destinationAirport = findAirport(destinationInput);

    if (!originAirport) {
      const suggestions = getAllAirports().slice(0, 15);
      return NextResponse.json({
        error: `"${originInput}" is not a valid city or airport code`,
        suggestion: 'Please enter a valid city name (e.g., "Lagos") or airport code (e.g., "LOS")',
        examples: suggestions.map(a => `${a.code} (${a.city}, ${a.country})`).join(', '),
        validCities: suggestions.map(a => a.city).slice(0, 10).join(', '),
      }, { status: 400 });
    }

    if (!destinationAirport) {
      const suggestions = getAllAirports().slice(0, 15);
      return NextResponse.json({
        error: `"${destinationInput}" is not a valid city or airport code`,
        suggestion: 'Please enter a valid city name (e.g., "London") or airport code (e.g., "LHR")',
        examples: suggestions.map(a => `${a.code} (${a.city}, ${a.country})`).join(', '),
        validCities: suggestions.map(a => a.city).slice(0, 10).join(', '),
      }, { status: 400 });
    }

    if (originAirport.code === destinationAirport.code) {
      return NextResponse.json(
        { error: 'Origin and destination cannot be the same' },
        { status: 400 }
      );
    }

    // Validate date
    const departure = new Date(departureDate);
    if (isNaN(departure.getTime())) {
      return NextResponse.json(
        { error: 'Invalid departure date format' },
        { status: 400 }
      );
    }

    console.log(`🔍 Searching flights: ${originAirport.city} (${originAirport.code}) → ${destinationAirport.city} (${destinationAirport.code}) on ${departureDate}`);
    
    // Search flights with real data
    const flights = await flightService.searchFlights({
      origin: originAirport.code,
      destination: destinationAirport.code,
      departureDate,
      returnDate: returnDate || undefined,
      adults,
      currency: 'NGN',
    });

    // Sort by price
    flights.sort((a, b) => a.price.amount - b.price.amount);

    return NextResponse.json({
      success: true,
      data: flights,
      count: flights.length,
      currency: 'NGN',
      source: 'real-time',
      search: {
        origin: {
          code: originAirport.code,
          city: originAirport.city,
          country: originAirport.country,
        },
        destination: {
          code: destinationAirport.code,
          city: destinationAirport.city,
          country: destinationAirport.country,
        },
        departureDate,
        returnDate: returnDate || undefined,
        adults,
      },
    });
  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights. Please try again.' },
      { status: 500 }
    );
  }
}