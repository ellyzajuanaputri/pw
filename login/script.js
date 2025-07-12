const supabase = supabase.createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
);

// LOGIN
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

// CEK LOGIN + TAMPILKAN PRODUK
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

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

// Router otomatis
const path = location.pathname;
if (path.includes('akses.html')) loadProduk();
if (path.includes('logout.html')) logout();
