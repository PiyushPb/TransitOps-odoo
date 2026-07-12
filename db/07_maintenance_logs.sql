CREATE TABLE maintenance_logs (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON UPDATE NO ACTION,
    created_by INTEGER NOT NULL REFERENCES users(id) ON UPDATE NO ACTION,
    maintenance_type VARCHAR(50) NOT NULL,
    service_center VARCHAR(100),
    maintenance_date DATE NOT NULL,
    completion_date DATE,
    cost DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    description TEXT,
    remarks TEXT,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);
