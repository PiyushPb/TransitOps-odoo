import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/db';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { generateToken } from '../utils/jwt';
import { ZodError } from 'zod';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);

    // Default to role 3 (Driver) if not specified, but for safety in transitops, it's a good default
    const defaultRoleId = 3; 

    const newUser = await prisma.users.create({
      data: {
        f_name: data.f_name,
        l_name: data.l_name,
        email: data.email,
        password_hash,
        role_id: defaultRoleId,
        phone_number: data.phone_number,
      },
    });

    const token = generateToken({ userId: newUser.id, roleId: newUser.role_id });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        f_name: newUser.f_name,
        l_name: newUser.l_name,
        email: newUser.email,
        role_id: newUser.role_id,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.is_active) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or account inactive' });
    }

    const isMatch = await bcrypt.compare(data.password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Update last_login
    await prisma.users.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    const token = generateToken({ userId: user.id, roleId: user.role_id });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        f_name: user.f_name,
        l_name: user.l_name,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        f_name: true,
        l_name: true,
        email: true,
        role_id: true,
        is_active: true,
        profile_image: true,
        phone_number: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
