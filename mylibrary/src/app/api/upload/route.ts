// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";

// export const POST = async (req: Request) => {
//   try {
//     const formData = await req.formData();
    
//     const file = formData.get("file") as File;
//     if (!file) {
//       return NextResponse.json({ error: "No files received." }, { status: 400 });
//     }
    
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const filename = Date.now() + file.name.replaceAll(" ", "_");
    
//     await writeFile(
//       path.join(process.cwd(), "public/images/books/" + filename),
//       buffer
//     );
    
//     // Return the filename along with the success message
//     return NextResponse.json({ message: "Success", filename: filename, status: 201 });
//   } catch (error) {
//     console.log("Error occurred", error);
//     return NextResponse.json({ message: "Failed", status: 500 });
//   }
// };

// src/app/api/upload/route.ts
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false
  }
};

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/images/books'),
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Failed to parse form' });
    }

    // Type guard to check if files.file is defined
    if (!files.file || !Array.isArray(files.file)) {
      return res.status(400).json({ error: 'No files received.' });
    }

    const file = files.file[0];
    if (!file) {
      return res.status(400).json({ error: 'No files received.' });
    }

    const filename = path.basename(file.filepath);
    
    try {
      fs.renameSync(file.filepath, path.join(process.cwd(), 'public/images/books', filename));
      return res.status(201).json({ message: 'Success', filename });
    } catch (error) {
      console.error('Error saving file:', error);
      return res.status(500).json({ message: 'Failed to save file' });
    }
  });
};

export default uploadHandler;
