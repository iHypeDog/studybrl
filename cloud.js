const SUPABASE_URL = 'https://kgwqucuqeptxdricugrb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Q4LfCnzMk9NDqe5F3UbClw_LZq_FDmi';

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/* =========================
   NOTES
========================= */

async function cloudLoadNotes(disc) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('disc', disc)
    .order('id', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

async function cloudCreateNote(disc, title, author) {
  const { error } = await supabase
    .from('notes')
    .insert({
      disc,
      title,
      html: '',
      author
    });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function cloudSaveNote(id, html, author) {
  const { error } = await supabase
    .from('notes')
    .update({
      html,
      author
    })
    .eq('id', id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function cloudDeleteNote(id) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}