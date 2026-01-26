CREATE TABLE todo( 
    id SERIAL PRIMARY KEY, 
    task VARCHAR(255) NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deadline TIMESTAMPTZ NOT NULL
);

INSERT INTO todo (task, deadline) VALUES 
('Clean table', '2026-1-30'), 
('Sweep the floor', '2026-1-29'), 
('Wash dishes', '2026-1-28');