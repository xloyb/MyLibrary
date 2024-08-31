import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deleteCategory, updateCategory } from '@/lib/category';
import prisma from '@/lib/client';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      await prisma.category.delete({
        where: { id: parseInt(id, 10) },
      });
      return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Failed to delete category:', error);
      return NextResponse.error();
    }
  }

  export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, image,language } = await request.json();
  
    const servername = name
      .trim() 
      .toLowerCase() 
      .replace(/\s+/g, '-'); 
  
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: parseInt(id, 10) },
        data: { name, image,language, servername }, 
      });
      return NextResponse.json(updatedCategory);
    } catch (error) {
      console.error('Failed to update category:', error);
      return NextResponse.error();
    }
  }
