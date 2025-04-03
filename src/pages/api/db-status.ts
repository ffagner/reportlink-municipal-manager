
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Simple query to check if we can connect to the database
    const count = await prisma.municipality.count();
    return res.status(200).json({ status: 'connected', count });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to connect to database' });
  }
}
