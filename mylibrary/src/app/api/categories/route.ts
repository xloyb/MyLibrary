import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { createCategory, getAllCategories } from '@/lib/category';

export async function GET(request: NextRequest) {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clerkUserId, name, image } = await request.json(); 

    if (!(await isAdmin(clerkUserId))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const newCategory = await createCategory(name, image);
    return NextResponse.json(newCategory, { status: 201 }); 
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
