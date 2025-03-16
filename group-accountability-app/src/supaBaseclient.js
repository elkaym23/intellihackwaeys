import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wsmqmppgxojpvwqkhcev.supabase.co"; // Replace with your actual Supabase project URL
const SUPABASE_ANON_KEY = "process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbXFtcHBneG9qcHZ3cWtoY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNTg2ODgsImV4cCI6MjA1NzYzNDY4OH0.9WemPPuN9gddae14piHypgmxW99spRrz9JUWKQL2Zvo.env.SUPABASE_KEY"; // Replace with your actual Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("SUPABASE_URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.REACT_APP_SUPABASE_KEY);
