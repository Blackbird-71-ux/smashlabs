import { NextRequest, NextResponse } from 'next/server';

interface CorporateBookingData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  jobTitle: string;
  teamSize: string;
  date: string;
  time: string;
  duration: string;
  eventType: string;
  specialRequests: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CorporateBookingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'jobTitle', 'teamSize', 'date', 'time', 'duration', 'eventType'];
    const missingFields = requiredFields.filter(field => !body[field as keyof CorporateBookingData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }
    
    // Here you would typically save to a database
    // For now, we'll log the data and return success
    console.log('Corporate booking received:', {
      ...body,
      timestamp: new Date().toISOString(),
      id: `CORP-${Date.now()}`
    });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, you might also:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admin/sales team
    // 4. Integration with CRM
    
    return NextResponse.json(
      {
        success: true,
        message: 'Corporate booking request submitted successfully',
        bookingId: `CORP-${Date.now()}`,
        data: {
          companyName: body.companyName,
          contactPerson: body.contactPerson,
          email: body.email,
          eventType: body.eventType,
          teamSize: body.teamSize,
          date: body.date,
          time: body.time
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing corporate booking:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 