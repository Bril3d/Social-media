import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import slugify from 'slugify';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('Creating user with data:', { name, email, password: '***' });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        slug: slugify(name),
      },
    })

    console.log('User created:', user);

    // Omit the password when sending the response
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ message: 'User created successfully', user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}
