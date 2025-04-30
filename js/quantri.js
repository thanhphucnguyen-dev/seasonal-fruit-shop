document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const submenu = document.querySelector('.submenu');

  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (event) {
      event.preventDefault();
      submenu.classList.toggle('show');
    });
  }

  updateProductTable();
  document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchProduct();
    }
  });
});
function toggleMenu(menuId, event) {
  event.preventDefault();
  const menu = document.getElementById(menuId);
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}
function showAddProductSection(event) {
  event.preventDefault();
  hideProductManagement();
  document.getElementById("addProductSection").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}
function showDeleteProductSection(event) {
  event.preventDefault();
  hideProductManagement();
  document.getElementById("deleteProductSection").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function showProductList(event) {
  event.preventDefault();
  hideProductManagement();
  document.getElementById("productListSection").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.querySelector(".product-list").scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideProductManagement() {
  document.getElementById("addProductSection").style.display = "none";
  document.getElementById("deleteProductSection").style.display = "none";
  document.getElementById("productListSection").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function addProduct() {
  const id = document.getElementById("newProductId").value;
  const name = document.getElementById("newProductName").value;
  const price = document.getElementById("newProductPrice").value;
  const quantity = document.getElementById("newProductQuantity").value;
  const description = document.getElementById("newProductDescription").value;

  if (id && name && price && quantity && description) {
    const newProduct = { id, name, price, description, image: "default.png", quantity: parseInt(quantity) };
    products.push(newProduct);

    hideProductManagement();
    clearAddProductForm();
    alert("Đã thêm sản phẩm thành công!");
    updateProductTable();
  } else {
    alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
  }
}

function deleteProduct() {
  const productId = document.getElementById('deleteProductId').value;
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

  if (confirmDelete) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      alert('Sản phẩm với ID ${productId} đã được xóa thành công.');
      updateProductTable();
    } else {
      alert('Không tìm thấy sản phẩm với ID ${productId}.');
    }
    document.getElementById('deleteProductId').value = '';
  } else {
    alert("Hủy bỏ xóa sản phẩm.");
  }
}

function updateProductTable() {
  const tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td><img src="${product.image}" alt="${product.name}" class="product-image" width="50"></td>
      <td>${product.description}</td>
      <td><button onclick="openEditProductForm('${product.id}')">Sửa</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function openEditProductForm(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    document.getElementById("editProductId").value = product.id;
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductPrice").value = product.price;
    document.getElementById("editProductQuantity").value = product.quantity;
    document.getElementById("editProductDescription").value = product.description;
    document.getElementById("editProductSection").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }
}

function saveProductChanges() {
  const id = document.getElementById("editProductId").value;
  const name = document.getElementById("editProductName").value;
  const price = document.getElementById("editProductPrice").value;
  const quantity = document.getElementById("editProductQuantity").value;
  const description = document.getElementById("editProductDescription").value;

  const product = products.find(p => p.id === id);
  if (product) {
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description;
  }

  updateProductTable();
  hideProductManagement();
}

function searchProduct() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const tableBody = document.getElementById("productTableBody");
  const rows = tableBody.getElementsByTagName("tr");
  let visibleRowCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const idCell = rows[i].getElementsByTagName("td")[0];
    const nameCell = rows[i].getElementsByTagName("td")[1];

    if (idCell || nameCell) {
      const idText = idCell.textContent.toLowerCase();
      const nameText = nameCell.textContent.toLowerCase();

      if (idText.includes(input) || nameText.includes(input)) {
        rows[i].style.display = "";
        visibleRowCount++;
      } else {
        rows[i].style.display = "none";
      }
    }
  }

  const noResultsMessage = document.getElementById("noResultsMessage");
  noResultsMessage.style.display = visibleRowCount === 0 ? "block" : "none";
}

function clearAddProductForm() {
  document.getElementById("newProductId").value = "";
  document.getElementById("newProductName").value = "";
  document.getElementById("newProductPrice").value = "";
  document.getElementById("newProductQuantity").value = "";
  document.getElementById("newProductDescription").value = "";
}

let products = [
  { id: "sp01", name: "Đào", price: 5000, description: "Đào giòn ngọt mọng nước", image: "ảnh/dao.png.jpg", quality: 100 },
  { id: "sp02", name: "Dưa Hấu", price: 10000, description: "Dưa dấu mỏng vỏ , giòn ngọt tươi mát", image: "ảnh/duahau.png", quality: 100 },
  { id: "sp03", name: "Táo", price: 15000, description: "Táo xanh giòn nhập khẩu", image: "ảnh/táo.png", quality: 100 },
  { id: "sp04", name: "Bưởi", price: 20000, description: "Bưởi ruột hồng ngọt mọng nước", image: "ảnh/bưởi.png", quality: 100 },
  { id: "sp05", name: "Ép Dâu", price: 20000, description: "Dâu tươi ép thanh mát", image: "ảnh/epdau.jpg", quality: 100 },
  { id: "sp06", name: "Ép Dứa", price: 25000, description: "Nước ép dứa giải khát", image: "ảnh/epdua.jpg", quality: 100 },
  { id: "sp07", name: "Ép Táo", price: 30000, description: "Táo tươi ép ngọt thanh giải khát", image: "ảnh/eptao.jpg", quality: 100 },
  { id: "sp08", name: "Ép Cam", price: 35000, description: "Cam tươi mát", image: "ảnh/epcam.jpg", quality: 100 },
  { id: "sp09", name: "Đào Khô", price: 35000, description: "Đào khô dẻo ngọt thanh", image: "ảnh/daokho.png", quality: 100 },
  { id: "sp10", name: "Khóm Khô", price: 40000, description: "Chua chua ngọt ngọt bắt miệng", image: "ảnh/khomkho.jpg", quality: 100 },
  { id: "sp11", name: "Táo Khô", price: 45000, description: "Táo khô dinh dưỡng ngọt dẻo", image: "ảnh/taokho.jpg", quality: 100 },
  { id: "sp12", name: "Mít Khô", price: 40000, description: "Giòn ngọt thơm ngon", image: "ảnh/mitkho.jpg", quality: 100 },
  { id: "sp13", name: "Combo Tươi", price: 50000, description: "Combo tiết kiện đầy đủ trái cây tươi", image: "ảnh/combotuoi.jpg", quality: 100 },
  { id: "sp14", name: "Combo Ép", price: 60000, description: "Nhiều sự lựa cho cho ngày hè", image: "ảnh/comboep.jpg", quality: 100 },
  { id: "sp15", name: "Combo Khô", price: 70000, description: "Đa dạng trái cây khô", image: "ảnh/khô.jpg", quality: 100 },
  { id: "sp16", name: "Combo Khô Ép Tươi", price: 80000, description: "Tiết kiệm đầy đủ chất dinh dưỡng và ngon miệng", image: "ảnh/khoeptuoi.webp", quality: 100 },
];
function showEditProductSection(event) {
  event.preventDefault();
  const productId = prompt("Nhập ID sản phẩm cần sửa:");

  if (productId) {
    const productTableBody = document.getElementById('productTableBody');
    const rows = productTableBody.getElementsByTagName('tr');
    let productFound = false;
    for (let row of rows) {
      const id = row.cells[0].textContent;
      if (id === productId) {
        document.getElementById('editProductId').value = id;
        document.getElementById('editProductName').value = row.cells[1].textContent;
        document.getElementById('editProductPrice').value = row.cells[2].textContent;
        document.getElementById('editProductQuantity').value = row.cells[3].textContent;
        document.getElementById('editProductDescription').value = row.cells[4].textContent;
        document.getElementById('editProductSection').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        productFound = true;
        break;
      }
    }
    if (!productFound) {
      alert('Không tìm thấy sản phẩm với ID này.');
    }
  }
}
function hideProductManagement() {
  document.getElementById("addProductSection").style.display = "none";
  document.getElementById("deleteProductSection").style.display = "none";
  document.getElementById("editProductSection").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
document.getElementById("overlay").addEventListener("click", function () {
  hideProductManagement(); 
});
function hideProductList() {
  const productListSection = document.getElementById('productListSection');
  productListSection.style.display = 'none';
}
document.addEventListener("DOMContentLoaded", function () {
  showProductList(); 
});

function showProductList() {
  const productListSection = document.getElementById("productListSection");
  if (productListSection) {
    productListSection.style.display = "block";
  }
}
function toggleVisibility(menuId) {
  const menu = document.getElementById(menuId);
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
let orders = []; 
let pendingOrders = []; 
let approvedOrders = []; 

function toggleVisibility(menuId) {
  const menu = document.getElementById(menuId);
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function addProductToOrder() {
  const productId = document.getElementById("productId").value.trim(); 
  const quantity = parseInt(document.getElementById("productQuantity").value); 

  if (!productId || !quantity || quantity <= 0) {
    alert("Vui lòng nhập ID sản phẩm và số lượng hợp lệ.");
    return;
  }

  const product = products.find((p) => p.id === productId); 
  if (product) {
    const totalPrice = product.price * quantity;
    const row = `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${quantity}</td>
        <td>${product.price.toLocaleString()} VND</td>
        <td>${totalPrice.toLocaleString()} VND</td>
      </tr>
    `;
 
    document.getElementById('orderTableBody').innerHTML += row;  
  } else {
    alert("Sản phẩm không tồn tại.");
  }
}
function saveOrder() {
  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
    return;
  }

  const orderTableBody = document.getElementById("orderTableBody");
  if (orderTableBody.rows.length === 0) {
    alert("Vui lòng thêm sản phẩm vào đơn hàng.");
    return;
  }

  const products = Array.from(orderTableBody.rows).map(row => ({
    id: row.cells[0].textContent,
    name: row.cells[1].textContent,
    quantity: parseInt(row.cells[2].textContent),
    price: parseInt(row.cells[3].textContent.replace(/\D/g, ""))
  }));

  const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const order = {
    customer: {
      name: customerName,
      phone: customerPhone,
      address: customerAddress
    },
    products,
    totalAmount,
    status: "pending", 
  };
  pendingOrders.push(order); 
  alert("Đơn hàng đã được lưu vào danh sách chờ duyệt.");
  orderTableBody.innerHTML = ""; 
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";

  showPendingOrders(); 
}
function approveOrder(orderIndex) {
  const approvedOrder = pendingOrders.splice(orderIndex, 1)[0];
  approvedOrders.push(approvedOrder);
  showApprovedOrdersList(); 
  showPendingOrders();  
}

function showPendingOrders() {
  const tableBody = document.getElementById("pendingOrdersTableBody");
  tableBody.innerHTML = ""; 

  pendingOrders.forEach((order, index) => {
    const productsList = order.products
      .map((product) => `<p>${product.name} x ${product.quantity} (${product.price.toLocaleString()} VND)</p>`)
      .join("");

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>
          <strong>Tên:</strong> ${order.customer.name} <br>
          <strong>SĐT:</strong> ${order.customer.phone} <br>
          <strong>Địa chỉ:</strong> ${order.customer.address}
        </td>
        <td>${productsList}</td>
        <td>${order.totalAmount.toLocaleString()} VND</td>
        <td><button onclick="approveOrder(${index})">Duyệt</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function showApprovedOrdersList() {
  const tableBody = document.getElementById("approvedOrdersTableBody");
  tableBody.innerHTML = ""; 

  if (approvedOrders.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='5'>Chưa có đơn hàng nào đã duyệt</td></tr>";
    return;
  }

  approvedOrders.forEach((order, index) => {
    const productsList = order.products
      .map(product => `<p>${product.name} x ${product.quantity} (${product.price.toLocaleString()} VND)</p>`)
      .join("");

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>
          <strong>Tên khách hàng:</strong> ${order.customer.name} <br>
          <strong>SĐT:</strong> ${order.customer.phone} <br>
          <strong>Địa chỉ:</strong> ${order.customer.address}
        </td>
        <td>${productsList}</td>
        <td>${order.totalAmount.toLocaleString()} VND</td>
        <td><button onclick="createInvoice(${index})">Tạo Hóa Đơn</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}
function approveOrder(orderIndex) {
  const approvedOrder = pendingOrders.splice(orderIndex, 1)[0];
  approvedOrders.push(approvedOrder);
  console.log(approvedOrders); 

  showApprovedOrdersList(); 
  showPendingOrders(); 
}

const approvedOrder= [
  {
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, TP HCM"
    },
    products: [
      { name: "Táo", quantity: 2, price: 50000 },
      { name: "Chuối", quantity: 5, price: 30000 }
    ],
    totalAmount: 150000
  },
  {
    customer: {
      name: "Trần Thị B",
      phone: "0912345678",
      address: "456 Đường XYZ, Hà Nội"
    },
    products: [
      { name: "Nho", quantity: 1, price: 80000 },
      { name: "Cam", quantity: 3, price: 40000 }
    ],
    totalAmount: 200000
  }
];
function toggleVisibility(menuId) {
  const menu = document.getElementById(menuId);
  if (menuId === "approvedOrdersSection") {
    showApprovedOrdersList();
  }
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function showApprovedOrders() {
  const approvedOrdersSection = document.getElementById('approvedOrdersSection');
  approvedOrdersSection.style.display = 'block';

  const pendingOrdersSection = document.getElementById('pendingOrdersSection');
  pendingOrdersSection.style.display = 'none';

  const completedOrdersSection = document.getElementById('completedOrdersSection');
  completedOrdersSection.style.display = 'none';

  showApprovedOrdersList();
}
function createInvoice(orderIndex) {
  const order = approvedOrders[orderIndex];

  document.getElementById('customerNameInvoice').textContent = order.customer.name;
  document.getElementById('customerPhoneInvoice').textContent = order.customer.phone;
  document.getElementById('customerAddressInvoice').textContent = order.customer.address;

  const productList = document.getElementById('productList');
  productList.innerHTML = ''; 
  order.products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} x ${product.quantity} - ${product.price.toLocaleString()} VND`;
    productList.appendChild(li);
  });
  document.getElementById('totalAmountInvoice').textContent = order.totalAmount.toLocaleString();
  document.getElementById('invoiceForm').style.display = 'block';
  document.getElementById('overlay').style.display = 'block'; 
}
function hideInvoiceForm() {
  document.getElementById('invoiceForm').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}
function showCreateOrderSection() {
  document.getElementById('createOrderSection').style.display = 'block';
  document.getElementById('pendingOrdersSection').style.display = 'block';
}

function hideCreateOrderSection() {
  document.getElementById('createOrderSection').style.display = 'none';
  document.getElementById('pendingOrdersSection').style.display = 'none';
}
function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}
function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}
