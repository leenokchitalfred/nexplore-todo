CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    lastUpdateTime TIMESTAMP
);