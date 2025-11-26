import Airtable from 'airtable';

// Initialize Airtable base
const getBase = () => {
  if (!process.env.AIRTABLE_TOKEN) {
    throw new Error('AIRTABLE_TOKEN is not set');
  }
  if (!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
    throw new Error('NEXT_PUBLIC_AIRTABLE_BASE_ID is not set');
  }

  return new Airtable({
    apiKey: process.env.AIRTABLE_TOKEN
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
};

export async function submitToAirtable(formData) {
  try {
    const base = getBase();
    const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Table 1';

    // Prepare fields for Airtable
    const fields = {
      'Submitted At': new Date().toISOString(),
      'Status': 'New',
    };

    // Add form fields
    Object.keys(formData).forEach(key => {
      if (key !== 'IP Address' && key !== 'User Agent') {
        // Map form field names to Airtable field names
        const fieldName = key.split('_').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        fields[fieldName] = formData[key];
      } else {
        fields[key] = formData[key];
      }
    });

    console.log('Submitting to Airtable:', { tableName, fields });

    const records = await base(tableName).create([{ fields }]);

    console.log('Airtable success:', records[0].id);

    return { success: true, record: records[0] };
  } catch (error) {
    console.error('Airtable error details:', {
      message: error.message,
      statusCode: error.statusCode,
      error: error
    });
    throw error;
  }
}