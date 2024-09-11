import { NextResponse } from 'next/server';
import Person from '@/models/Person';
import connectDB from '@/utils/db';
import { parse } from 'papaparse';
import { Readable } from 'stream'; // Import Readable from 'stream'

// Helper to convert file buffer to stream
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

    const fileBuffer = Buffer.from(await (file as Blob).arrayBuffer());

    // Convert file buffer to stream
    const fileStream = bufferToStream(fileBuffer);

    // Parse CSV data
    const parseCsv = await new Promise((resolve, reject) => {
      let parsedData: any[] = [];
      parse(fileStream, {
        header: true,
        complete: (results: any) => resolve(results.data),
        error: (error: any) => reject(error),
      });
    });

    // Connect to the database
    await connectDB();

    // Loop over CSV data and add to the database
    const promises = (parseCsv as any[]).map(async (row) => {
      const { name, age } = row;
      if (name && age) {
        const newPerson = new Person({ name, age: Number(age) });
        await newPerson.save();
      }
    });

    await Promise.all(promises);

    return NextResponse.json({ message: 'CSV data uploaded successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error processing CSV:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
