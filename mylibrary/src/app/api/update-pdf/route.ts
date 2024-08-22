import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';
import path from 'path';

// Make sure you use the correct path to the public directory
const PUBLIC_DIR = path.join(process.cwd(), 'public/books/MyDevify-pdf');

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let parsedText = '';

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[0]; // Use the first file

    if (uploadedFile instanceof File) {
      fileName = uuidv4() + '.pdf';
      const tempFilePath = path.join(PUBLIC_DIR, fileName);
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      
      try {
        await fs.writeFile(tempFilePath, fileBuffer);
      } catch (error) {
        console.error('Failed to save file:', error);
        return NextResponse.json({ error: 'Failed to save file.' }, { status: 500 });
      }

      const pdfParser = new (PDFParser as any)(null, 1);

      return new Promise<NextResponse>((resolve, reject) => {
        pdfParser.on('pdfParser_dataError', (errData: any) => {
          console.error('PDF Parsing Error:', errData.parserError);
          reject(errData.parserError);
        });
        pdfParser.on('pdfParser_dataReady', () => {
          parsedText = (pdfParser as any).getRawTextContent();

          // Construct the response
          resolve(NextResponse.json({ path: `/public/${fileName}`, parsedText }));
        });

        pdfParser.loadPDF(tempFilePath);
      });
    } else {
      console.log('Uploaded file is not in the expected format.');
      return NextResponse.json({ error: 'Uploaded file is not in the expected format.' }, { status: 400 });
    }
  } else {
    console.log('No files found.');
    return NextResponse.json({ error: 'No files found.' }, { status: 400 });
  }
}
