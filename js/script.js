// =========================================================
// 1. GLOBAL DATA & HELPER FUNCTIONS
// =========================================================

const dashboardData = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000,
};

let productsData = [
    { id: 1, name: "Capucino", price: 25000, stock: 50 },
    { id: 2, name: "Teh Botol Sosro", price: 18000, stock: 30 },
    { id: 3, name: "Kopi Tubruk", price: 30000, stock: 10 },
];

// Menggunakan arrow function untuk fungsi helper
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// =========================================================
// 2. LOGIN LOGIC
// =========================================================

const handleLogin = () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('errorMessage');

        if (!email || !password) {
            errorMessage.textContent = 'Email dan Password tidak boleh kosong!';
            errorMessage.style.display = 'block'; // Pastikan terlihat
        } else {
            errorMessage.textContent = '';
            alert('Login Berhasil! Selamat Datang.');
            window.location.href = 'dashboard.html';
        }
    });
};

// =========================================================
// 3. DASHBOARD LOGIC
// =========================================================

const renderDashboard = () => {
    const elTotalProd = document.getElementById('totalProducts');
    if (!elTotalProd) return;

    // Mengupdate teks dashboard secara efisien
    elTotalProd.textContent = dashboardData.totalProducts;
    document.getElementById('totalSales').textContent = dashboardData.totalSales;
    document.getElementById('totalRevenue').textContent = formatRupiah(dashboardData.totalRevenue);
};

// =========================================================
// 4. PRODUCTS LOGIC
// =========================================================

const renderProductTable = () => {
    const tableBody = document.getElementById('productTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = productsData.map((product, index) => `
        <tr id="row-${product.id}">
            <td>${index + 1}</td>
            <td class="font-weight-bold">${product.name}</td>
            <td class="text-right">${formatRupiah(product.price)}</td>
            <td class="text-center">
                <span class="badge ${product.stock < 15 ? 'badge-danger' : 'badge-success'}">
                    ${product.stock}
                </span>
            </td>
            <td class="action-cell">
                <button class="action-btn edit-btn" data-id="${product.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" data-id="${product.id}">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');

    attachTableEventListeners();
};

// Memisahkan listener agar lebih rapi
const attachTableEventListeners = () => {
    document.querySelectorAll('.edit-btn').forEach(btn => 
        btn.addEventListener('click', handleEdit));
    
    document.querySelectorAll('.delete-btn').forEach(btn => 
        btn.addEventListener('click', handleDelete));
};

const handleEdit = (event) => {
    const id = event.currentTarget.dataset.id;
    const product = productsData.find(p => p.id == id);
    if (product) alert(`Mengedit: ${product.name}`);
};

const handleDelete = (event) => {
    const id = parseInt(event.currentTarget.dataset.id);
    const index = productsData.findIndex(p => p.id === id);

    if (index > -1 && confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        productsData.splice(index, 1);
        renderProductTable(); // Render ulang untuk memperbarui nomor urut
        alert("Produk berhasil dihapus!");
    }
};

// =========================================================
// 5. INITIALIZATION
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    handleLogin();
    renderDashboard();
    renderProductTable();
});