import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    
    await writeFile(
      path.join(process.cwd(), "public/images/books/" + filename),
      buffer
    );
    
    // Return the filename along with the success message
    return NextResponse.json({ message: "Success", filename: filename, status: 201 });
  } catch (error) {
    console.log("Error occurred", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};
