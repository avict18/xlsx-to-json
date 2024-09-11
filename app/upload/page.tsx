import { NextResponse } from 'next/server';
import Person from '@/models/Person';
import connectDB from '@/utils/db';
import * as XLSX from 'xlsx';
import { Readable } from 'stream';

// Helper to convert file buffer to stream (if needed)
const bufferToStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export async function POST(request: Request) {
  try {
    // Read the file from the request
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file to a buffer
    const fileBuffer = Buffer.from(await (file as Blob).arrayBuffer());

    // Parse the XLSX data using the xlsx library
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(worksheet); // Convert to JSON

    // Connect to the database
    await connectDB();

    // Loop over the parsed data and add it to the database
    const promises = parsedData.map(async (row: any) => {
      const { name, age } = row;
      if (name && age) {
        const newPerson = new Person({ name, age: Number(age) });
        await newPerson.save();
      }
    });

    await Promise.all(promises);

    return NextResponse.json({ message: 'XLSX data uploaded successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error processing XLSX:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}