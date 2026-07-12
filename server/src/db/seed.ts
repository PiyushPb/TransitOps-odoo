import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database with initial data...');

  // 1. Roles
  const roles = [
    { id: 1, name: 'Admin', description: 'Administrator with full access' },
    { id: 2, name: 'Fleet Manager', description: 'Manages vehicles and drivers' },
    { id: 3, name: 'Driver', description: 'Vehicle driver' },
    { id: 4, name: 'Financial Analyst', description: 'Views financial and analytics data' },
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { id: role.id },
      update: role,
      create: role,
    });
  }

  // 2. Users
  const hash = await bcrypt.hash('password123', 10);
  const users = [
    { role_id: 1, first_name: 'Admin', last_name: 'User', email: 'admin@transit.com', password_hash: hash, is_active: true },
    { role_id: 2, first_name: 'Fleet', last_name: 'Manager', email: 'manager@transit.com', password_hash: hash, is_active: true },
    { role_id: 3, first_name: 'Driver', last_name: 'One', email: 'driver@transit.com', password_hash: hash, is_active: true },
    { role_id: 4, first_name: 'Financial', last_name: 'Analyst', email: 'analyst@transit.com', password_hash: hash, is_active: true },
  ];

  for (const u of users) {
    await prisma.users.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }

  // 3. Vehicles
const vehicles = [
  {
    registration_number: 'MH 12 AB 1001',
    vehicle_name: 'Volvo FH16',
    vehicle_type: 'Truck',
    max_load_capacity: 18000,
    status: 'Available',
    current_odometer: 15000,
    fuel_type: 'Diesel',
  },
  {
    registration_number: 'MH 14 CD 2056',
    vehicle_name: 'Scania R500',
    vehicle_type: 'Truck',
    max_load_capacity: 20000,
    status: 'In Progress',
    current_odometer: 42000,
    fuel_type: 'Diesel',
  },
  {
    registration_number: 'MH 43 EF 3124',
    vehicle_name: 'Mercedes Actros',
    vehicle_type: 'Truck',
    max_load_capacity: 22000,
    status: 'In Shop',
    current_odometer: 120000,
    fuel_type: 'Diesel',
  },
  {
    registration_number: 'MH 46 GH 4589',
    vehicle_name: 'Ford Transit',
    vehicle_type: 'Van',
    max_load_capacity: 3500,
    status: 'Available',
    current_odometer: 8000,
    fuel_type: 'Petrol',
  },
  {
    registration_number: 'MH 04 JK 5298',
    vehicle_name: 'Sprinter 2500',
    vehicle_type: 'Van',
    max_load_capacity: 4000,
    status: 'Available',
    current_odometer: 19000,
    fuel_type: 'Electric',
  },
];

  for (const v of vehicles) {
    await prisma.vehicles.upsert({
      where: { registration_number: v.registration_number },
      update: v,
      create: v,
    });
  }

  // 4. Drivers
  const drivers = [
    { first_name: 'John', last_name: 'Doe', email: 'john@transit.com', phone: '1234567890', license_number: 'DL-1001', license_category: 'Heavy', license_issue_date: new Date('2020-01-01'), license_expiry_date: new Date('2028-01-01'), status: 'Available' },
    { first_name: 'Jane', last_name: 'Smith', email: 'jane@transit.com', phone: '0987654321', license_number: 'DL-1002', license_category: 'Heavy', license_issue_date: new Date('2019-05-15'), license_expiry_date: new Date('2029-05-15'), status: 'On Trip' },
    { first_name: 'Robert', last_name: 'Brown', email: 'robert@transit.com', phone: '1122334455', license_number: 'DL-1003', license_category: 'Light', license_issue_date: new Date('2021-11-20'), license_expiry_date: new Date('2026-11-20'), status: 'On Leave' },
    { first_name: 'Emily', last_name: 'Davis', email: 'emily@transit.com', phone: '5566778899', license_number: 'DL-1004', license_category: 'Light', license_issue_date: new Date('2022-03-10'), license_expiry_date: new Date('2027-03-10'), status: 'Available' },
  ];

  for (const d of drivers) {
    await prisma.drivers.upsert({
      where: { license_number: d.license_number },
      update: d,
      create: d,
    });
  }

  // 5. Routes
  const routesData = [
    { route_name: 'North Express', source: 'New York', destination: 'Boston', distance: 350, estimated_hours: 4, status: 'Active' },
    { route_name: 'South Line', source: 'Houston', destination: 'Dallas', distance: 385, estimated_hours: 4.5, status: 'Active' },
    { route_name: 'West Coast Rider', source: 'Los Angeles', destination: 'San Francisco', distance: 615, estimated_hours: 6.5, status: 'Active' },
    { route_name: 'Midwest Haul', source: 'Chicago', destination: 'Detroit', distance: 455, estimated_hours: 5, status: 'Active' },
  ];

  for (const r of routesData) {
    const existing = await prisma.routes.findFirst({ where: { route_name: r.route_name } });
    if (!existing) {
      await prisma.routes.create({ data: r });
    }
  }

  // We need actual DB objects for foreign keys
  const dbVehicles = await prisma.vehicles.findMany();
  const dbDrivers = await prisma.drivers.findMany();
  const dbRoutes = await prisma.routes.findMany();
  const dbUsers = await prisma.users.findMany();

  const adminUser = dbUsers.find(u => u.role_id === 1);

  // 6. Trips (Random data generation for analytics)
  if (dbVehicles.length > 0 && dbDrivers.length > 0 && dbRoutes.length > 0 && adminUser) {
    const existingTrips = await prisma.trips.count();
    
    if (existingTrips === 0) {
      console.log('Generating dummy trips for analytics...');
      const statuses = ['Completed', 'Completed', 'Completed', 'In Progress', 'Dispatched', 'Cancelled'];
      const pastDates = [1, 2, 5, 10, 15, 20, 25, 30, 45, 60].map(days => {
        const d = new Date();
        d.setDate(d.getDate() - days);
        return d;
      });

      for (let i = 1; i <= 20; i++) {
        const vehicle = dbVehicles[i % dbVehicles.length];
        const driver = dbDrivers[i % dbDrivers.length];
        const route = dbRoutes[i % dbRoutes.length];
        const status = statuses[i % statuses.length];
        const pastDate = pastDates[i % pastDates.length];

        await prisma.trips.create({
          data: {
            trip_number: `TR-${10000 + i}`,
            vehicle_id: vehicle.id,
            driver_id: driver.id,
            route_id: route.id,
            created_by: adminUser.id,
            source: route.source,
            destination: route.destination,
            cargo_type: ['Electronics', 'Furniture', 'Groceries', 'Machinery'][i % 4],
            cargo_weight: 1000 + (i * 200),
            planned_distance: route.distance,
            actual_distance: status === 'Completed' ? Number(route.distance) + (i * 5) : null,
            planned_start: pastDate,
            actual_start: status !== 'Scheduled' ? pastDate : null,
            actual_end: status === 'Completed' ? new Date(pastDate.getTime() + (Number(route.estimated_hours) * 3600000)) : null,
            fuel_consumed: status === 'Completed' ? 50 + (i * 2) : null,
            start_odometer: vehicle.current_odometer! - 1000 + (i * 50),
            end_odometer: status === 'Completed' ? vehicle.current_odometer! - 1000 + (i * 50) + Number(route.distance) : null,
            revenue: status === 'Completed' ? 500 + (i * 150) : null,
            status: status,
            created_at: pastDate,
          }
        });
      }
    }
  }

  // 7. Maintenance Logs
  if (dbVehicles.length > 0 && adminUser) {
    const existingLogs = await prisma.maintenance_logs.count();
    
    if (existingLogs === 0) {
      console.log('Generating dummy maintenance logs...');
      const statuses = ['Completed', 'Completed', 'In Progress', 'Scheduled'];
      
      for (let i = 1; i <= 8; i++) {
        const vehicle = dbVehicles[i % dbVehicles.length];
        const status = statuses[i % statuses.length];
        const date = new Date();
        date.setDate(date.getDate() - (i * 3));

        await prisma.maintenance_logs.create({
          data: {
            vehicle_id: vehicle.id,
            created_by: adminUser.id,
            maintenance_type: ['Oil Change', 'Brake Replacement', 'Tire Rotation', 'Engine Tune-up'][i % 4],
            service_center: 'AutoCare Center ' + (i % 3 + 1),
            maintenance_date: date,
            completion_date: status === 'Completed' ? new Date(date.getTime() + 86400000 * 2) : null,
            cost: 150 + (i * 50),
            status: status,
            created_at: date,
          }
        });
      }
    }
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
