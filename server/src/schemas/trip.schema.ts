import { z } from 'zod';

export const createTripSchema = z.object({
  trip_number: z.string().min(1, 'Trip number is required'),
  vehicle_id: z.number().int(),
  driver_id: z.number().int(),
  source: z.string().min(1, 'Source is required'),
  destination: z.string().min(1, 'Destination is required'),
  cargo_type: z.string().optional(),
  cargo_weight: z.number().positive('Cargo weight must be positive'),
  planned_distance: z.number().positive('Planned distance must be positive'),
  planned_start: z.string().datetime().or(z.date()),
  start_odometer: z.number().int().nonnegative(),
  revenue: z.number().nonnegative().optional(),
  remarks: z.string().optional(),
});

export const completeTripSchema = z.object({
  actual_distance: z.number().positive(),
  actual_end: z.string().datetime().or(z.date()),
  fuel_consumed: z.number().nonnegative().optional(),
  end_odometer: z.number().int().nonnegative(),
  remarks: z.string().optional(),
});
