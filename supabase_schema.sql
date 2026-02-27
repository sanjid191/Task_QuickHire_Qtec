-- Supabase Database Schema for QuickHire

-- Create the Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  type VARCHAR(50) DEFAULT 'Full Time',
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the Applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  resume_link TEXT NOT NULL,
  cover_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some mock jobs so you have data to test with right away
INSERT INTO jobs (title, company, location, category, type, description) VALUES
('Email Marketing', 'Revolut', 'Madrid, Spain', 'Marketing', 'Full Time', 'We are looking for an experienced Email Marketing Manager to join our growing team. You will be responsible for creating and executing email campaigns.'),
('Brand Designer', 'Dropbox', 'San Fransisco, US', 'Design', 'Full Time', 'Dropbox is seeking a Brand Designer to help shape the future of our visual identity. You must have a strong portfolio demonstrating systemic thinking.'),
('Interactive Developer', 'Terraform', 'Hamburg, Germany', 'Technology', 'Contract', 'Join us as an Interactive Developer to build highly engaging, animated web experiences. React and Three.js experience is a plus.'),
('HR Manager', 'Packer', 'Lucern, Switzerland', 'Human Resource', 'Full Time', 'We need an experienced HR Manager to handle onboarding, employee relations, and help shape our company culture as we scale.');
