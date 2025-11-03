import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, price, image } = req.body;

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, image }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ success: true, data });
}
