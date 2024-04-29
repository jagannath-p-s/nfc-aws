import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://coxblzsivuqumwkcfaop.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNveGJsenNpdnVxdW13a2NmYW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMTM3MzIsImV4cCI6MjAyOTY4OTczMn0.j-G7Un4Glyp7SzjFhB6u8nd_R9n0ObCRl3ciYVRc7dM'; // Replace with your Supabase anonymous key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
