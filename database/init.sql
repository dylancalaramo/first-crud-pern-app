CREATE TABLE todo( 
    id SERIAL PRIMARY KEY, 
    task VARCHAR(100) NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todo (task) VALUES ('Clean table'), ('Sweep the floor'), ('Wash dishes');