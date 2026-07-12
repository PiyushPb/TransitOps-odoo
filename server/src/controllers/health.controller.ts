import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getHealthStatus = async (req: Request, res: Response) => {
  try {
    // Optional: check DB connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      success: true,
      message: 'Server is healthy and connected to database.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Server is running, but database connection failed.',
      timestamp: new Date().toISOString(),
    });
  }
};
