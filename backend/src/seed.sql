USE petcare;

-- Create default admin (password to be set via app, this is a placeholder bcrypt for 'admin123')
INSERT INTO users (email, password_hash, full_name, role)
VALUES ('admin@petcare.local', '$2a$10$yLns5wK6k1oWmQ2q1Yx6Iu7nCw3bQp1A3QJt3K6yG6H4b4Y2fV2xS', 'Administrator', 'admin')
ON DUPLICATE KEY UPDATE email=email;

-- Seed comprehensive services for PetsCare
INSERT INTO services (name, description, price_cents, active) VALUES
-- Grooming Services
('Professional Dog Grooming', 'Complete grooming service including bath, brush, nail trim, and styling for dogs of all sizes', 3500, 1),
('Cat Grooming & De-shedding', 'Specialized grooming service for cats including de-shedding treatment and nail trimming', 2800, 1),
('Pet Bath & Brush', 'Basic bathing and brushing service with premium shampoos and conditioners', 2000, 1),
('Nail Trimming Service', 'Professional nail trimming for dogs and cats with safety and comfort priority', 800, 1),

-- Exercise & Walking Services
('Daily Dog Walking', '30-minute daily walks with exercise routines and socialization opportunities', 1200, 1),
('Extended Exercise Session', '60-minute comprehensive exercise session including playtime and training', 2000, 1),
('Pet Playtime & Socialization', 'Supervised play sessions with other pets for socialization and mental stimulation', 1500, 1),

-- Health & Medical Services
('Medicine Administration', 'Professional administration of prescribed medications with detailed reporting', 1800, 1),
('Health Monitoring', 'Regular health checks including temperature, weight, and general wellness assessment', 1200, 1),
('Dental Care Service', 'Professional teeth cleaning and oral health assessment for pets', 2500, 1),
('Senior Pet Care', 'Specialized care for senior pets including gentle handling and health monitoring', 2200, 1),

-- Nutrition & Feeding Services
('Premium Pet Feeding', 'Scheduled feeding with premium pet food and dietary monitoring', 1000, 1),
('Special Diet Management', 'Custom feeding service for pets with special dietary requirements', 1500, 1),
('Puppy/Kitten Care', 'Specialized care for young pets including feeding schedules and growth monitoring', 1800, 1),

-- Specialized Services
('Pet Sitting Service', 'In-home pet sitting with regular updates and photo reports', 2500, 1),
('Emergency Pet Care', '24/7 emergency care service for urgent pet health situations', 4000, 1),
('Pet Transportation', 'Safe transportation service for vet visits or other appointments', 2000, 1),
('Multi-Pet Package', 'Comprehensive care package for households with multiple pets', 5000, 1)
ON DUPLICATE KEY UPDATE name=name;



