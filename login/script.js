import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = supabase.createClient(
  'https://ekvmvhqsvtmlyvjaxnql.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdm12aHFzdnRtbHl2amF4bnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTgxMTUsImV4cCI6MjA2NTEzNDExNX0.Ea-sGsQkBuaSeUv5zh_pqR_qGHTQMdhfqFo5ZZFCpks'
);

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    document.getElementById('msg').textContent = error.message;
  } else {
    window.location.href = 'akses.html';
  }
}

async function loadProduk() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert('Harap login terlebih dahulu!');
    window.location.href = 'index.html';
    return;
  }

  const { data, error } = await supabase.from('produk').select('*');
  const container = document.getElementById('produk-container');
  if (error) {
    container.innerText = 'Gagal mengambil data.';
    return;
  }

  container.innerHTML = '';
  data.forEach(p => {
    const card = document.createElement('div');
    card.className = 'produk';
    card.innerHTML = `
      <img src="${p.gambar_url}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p><strong>Rp ${p.harga.toLocaleString()}</strong></p>
    `;
    container.appendChild(card);
  });
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

const path = location.pathname;
if (path.includes('akses.html')) loadProduk();
if (path.includes('logout.html')) logout();
