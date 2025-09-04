import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey || process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and ANON KEY are required!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
