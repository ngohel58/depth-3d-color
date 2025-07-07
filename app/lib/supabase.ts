import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://snfccbaluilzkjlcdxre.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZmNjYmFsdWlsemtqbGNkeHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MzQ3MDcsImV4cCI6MjA2NzQxMDcwN30.94LgvqC1ASoXMB95bksVqf4GoQ6qx8g5WE7SCGoOjcU';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };