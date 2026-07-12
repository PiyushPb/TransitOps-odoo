CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    vehicle_name VARCHAR(50) NOT NULL,
    model VARCHAR(50),
    manufacturer VARCHAR(50),
    manufacture_year INTEGER,
    vehicle_type VARCHAR(30) NOT NULL,
    max_load_capacity DECIMAL(10, 2) NOT NULL,
    acquisition_cost DECIMAL(12, 2),
    fuel_type VARCHAR(20),
    current_odometer INTEGER DEFAULT 0,
    status VARCHAR(20) NOT NULL,
    region VARCHAR(50),
    notes TEXT,
    purchase_date DATE,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);
