// Direct Airtable API integration (no library needed)
export async function submitToAirtable(formData) {
  try {
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Table 1';
    const apiKey = process.env.AIRTABLE_TOKEN;

    if (!baseId || !apiKey) {
      throw new Error('Missing Airtable configuration');
    }

    // Prepare fields for Airtable
    const fields = {
      'Submitted At': new Date().toISOString(),
      'Status': 'New',
    };

    // Map form field names to proper case
    Object.keys(formData).forEach(key => {
      if (key !== 'IP Address' && key !== 'User Agent') {
        const fieldName = key.split('_').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        fields[fieldName] = formData[key];
      } else {
        fields[key] = formData[key];
      }
    });

    console.log('Submitting to Airtable:', { baseId, tableName, fields });

    // Make direct HTTP request to Airtable API
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [{ fields }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Airtable API error:', error);
      throw new Error(`Airtable API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    console.log('Airtable success:', data.records[0].id);

    return { success: true, record: data.records[0] };
  } catch (error) {
    console.error('Airtable error details:', {
      message: error.message,
      error: error
    });
    throw error;
  }
}