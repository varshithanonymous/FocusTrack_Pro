const Airtable = require('airtable');

const base = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export async function submitToAirtable(formData) {
  try {
    const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Table 1';
    
    const fields = {
      'Submitted At': new Date().toISOString(),
      'Status': 'New',
      ...formData
    };
    
    const record = await base(tableName).create([{ fields }]);
    
    return { success: true, record: record[0] };
  } catch (error) {
    console.error('Airtable error:', error);
    throw error;
  }
}