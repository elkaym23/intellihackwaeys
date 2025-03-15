import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wsmqmppgxojpvwqkhcev.supabase.co"; // Replace with your actual Supabase project URL
const SUPABASE_ANON_KEY = "process.env.SUPABASE_KEY"; // Replace with your actual Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


