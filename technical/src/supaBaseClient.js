import { createClient } from '@supabase/supabase-js';


const REACT_APP_SUPABASE_URL = "https://jxruoukkgzbdrakhrpau.supabase.co"
const REACT_APP_SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cnVvdWtrZ3piZHJha2hycGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1OTExNTcsImV4cCI6MjA1MDE2NzE1N30.54lOaX5KHEWBTrz89-fvlwpReI9N4h4OtYDbSkwaawI"
        
export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY);
