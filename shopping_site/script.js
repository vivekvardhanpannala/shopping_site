async function loadProducts() {
  const res = await fetch('/api/getProducts');
  const { data } = await res.json();

  const container = document.getElementById('products');
  container.innerHTML = '';
  data.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" width="100"><br>
        <strong>${p.name}</strong><br>
        $${p.price}
      </div>`;
  });
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;

  const res = await fetch('/api/addProduct', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, price, image })
  });

  const result = await res.json();
  if (result.success) {
    alert('Product added!');
    loadProducts();
  } else {
    alert('Error adding product');
  }
});

loadProducts();
