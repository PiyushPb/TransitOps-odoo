CREATE TABLE fuel_logs (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON UPDATE NO ACTION,
    trip_id INTEGER REFERENCES trips(id) ON UPDATE NO ACTION,
    liters DECIMAL(8, 2) NOT NULL,
    price_per_liter DECIMAL(8, 2) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    odometer INTEGER NOT NULL,
    fuel_station VARCHAR(100),
    fuel_date DATE NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);
