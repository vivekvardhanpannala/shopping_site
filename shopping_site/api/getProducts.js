import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ data });
}
