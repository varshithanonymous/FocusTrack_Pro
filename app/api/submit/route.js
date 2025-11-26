import { submitToAirtable } from '../../../lib/airtable.js';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    const headers = request.headers;
    formData['IP Address'] = headers.get('x-forwarded-for') || 'unknown';
    formData['User Agent'] = headers.get('user-agent') || 'unknown';
    
    const result = await submitToAirtable(formData);
    
    return Response.json({ 
      success: true, 
      message: 'Submitted successfully!',
      recordId: result.record.id
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to submit.'
    }, { status: 500 });
  }
}