import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let parsedText = '';

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempFilePath = `/tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(tempFilePath, fileBuffer);

      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on('pdfParser_dataError', (errData: any) =>
        console.log(errData.parserError)
      );
      pdfParser.on('pdfParser_dataReady', () => {
        parsedText = (pdfParser as any).getRawTextContent();
      });

      pdfParser.loadPDF(tempFilePath);
    } else {
      console.log('Uploaded file is not in the expected format.');
    }
  } else {
    console.log('No files found.');
  }

  const response = new NextResponse();
  response.headers.set('FileName', fileName);
  return response;
}
