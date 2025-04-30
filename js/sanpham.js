const fruitsBase = [
    { id: "sp01", name: "Đào", price: 5000, category: "fresh", quality: 100 },
    { id: "sp02", name: "Dưa Hấu", price: 10000, category: "fresh", quality: 100 },
    { id: "sp03", name: "Táo", price: 15000, category: "fresh", quality: 100 },
    { id: "sp04", name: "Bưởi", price: 20000, category: "fresh", quality: 100 },
    { id: "sp05", name: "Ép Dâu", price: 20000, category: "juice", quality: 100 },
    { id: "sp06", name: "Ép Dứa", price: 25000, category: "juice", quality: 100 },
    { id: "sp07", name: "Ép Táo", price: 30000, category: "juice", quality: 100 },
    { id: "sp08", name: "Ép Cam", price: 35000, category: "juice", quality: 100 },
    { id: "sp09", name: "Đào Khô", price: 35000, category: "dried", quality: 100 },
    { id: "sp10", name: "Khóm Khô", price: 40000, category: "dried", quality: 100 },
    { id: "sp11", name: "Táo Khô", price: 45000, category: "dried", quality: 100 },
    { id: "sp12", name: "Mít Khô", price: 40000, category: "dried", quality: 100 },
    { id: "sp13", name: "Combo Tươi", price: 50000, category: "fruitcart", quality: 100 },
    { id: "sp14", name: "Combo Ép", price: 60000, category: "fruitcart", quality: 100 },
    { id: "sp15", name: "Combo Khô", price: 70000, category: "fruitcart", quality: 100 },
    { id: "sp16", name: "Combo Khô Ép Tươi", price: 80000, category: "fruitcart", quality: 100 },
];
// Lấy giỏ hàng từ Local Storage khi tải trang
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const productElement = document.querySelector(`.product-item[data-id="${productId}"]`);
    if (!productElement) return;

    const productName = productElement.querySelector('.content-section').innerText;
    const productPrice = parseInt(productElement.querySelector('.price').innerText.replace(/[^0-9]/g, ''));
    const productImage = productElement.querySelector('.img').src;
    const itemInCart = cart.find(item => item.id === productId);

    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();  // Cập nhật Local Storage
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
}

// Hiển thị giỏ hàng khi người dùng nhấp vào icon giỏ hàng
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    let total = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartRow = document.createElement('div');
        cartRow.className = 'cart-row';
        cartRow.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image" style="width: 50px; height: 50px; margin-right: 10px;">
            <span>${item.name}</span>
            <span>${item.price} VND x ${item.quantity}</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity('${item.id}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')">+</button>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="remove-item">Xóa</button>
        `;
        cartItemsContainer.appendChild(cartRow);
    });

    const itemCount = cart.reduce((totalItems, item) => totalItems + item.quantity, 0);
    updateCartCount(itemCount, total);
}
function increaseQuantity(productId) {
    const itemInCart = cart.find(item => item.id === productId);
    if (itemInCart) {
        itemInCart.quantity++;
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Hàm giảm số lượng sản phẩm
function decreaseQuantity(productId) {
    const itemInCart = cart.find(item => item.id === productId);
    if (itemInCart && itemInCart.quantity > 1) {
        itemInCart.quantity--;
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    } else if (itemInCart) {
        removeFromCart(productId);
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount(count, totalPrice) {
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    if (cartCount) cartCount.innerText = count;
    if (cartTotalPrice) cartTotalPrice.innerText = totalPrice + ' VND';
}

// Tải giỏ hàng khi trang sản phẩm tải xong
window.onload = () => {
    updateCartDisplay();
};


function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
        return;
    }
    alert("Checkout successful!");
    cart = [];
    updateCartDisplay();
}

function toggleInfo(id) {
    const productInfo = document.getElementById(id);
    if (productInfo) {
        productInfo.style.display = (productInfo.style.display === "none" || productInfo.style.display === "") ? "block" : "none";
    }
}

function showCategory(categoryId) {
    document.getElementById('search-input').value = "";
    const contents = document.querySelectorAll('.category-content');
    contents.forEach(content => {
        content.style.display = 'none';
        const products = content.querySelectorAll('.product-item');
        products.forEach(product => product.style.display = 'block');
    });
    const selectedContent = document.getElementById(categoryId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

function home() {
    document.getElementById('search-input').value = "";
    const contents = document.querySelectorAll('.category-content');
    contents.forEach(content => {
        content.style.display = 'block';
        const products = content.querySelectorAll('.product-item');
        products.forEach(product => product.style.display = 'block');
    });
}

window.onload = home;

function searchProducts(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categories = document.querySelectorAll('.category-content');
    let isProductFound = false;

    categories.forEach(category => {
        let categoryHasMatchingProduct = false;
        const products = category.querySelectorAll('.product-item');
        products.forEach(product => {
            const productName = product.querySelector('.content-section').innerText.toLowerCase();
            if (productName.includes(searchInput)) {
                product.style.display = 'block';
                categoryHasMatchingProduct = true;
                isProductFound = true;
            } else {
                product.style.display = 'none';
            }
        });
        category.style.display = categoryHasMatchingProduct ? 'block' : 'none';
    });

    if (!isProductFound) {
        alert("Không tìm thấy sản phẩm nào phù hợp với từ khóa tìm kiếm.");
    }
}

let cartVisible = false;

function toggleCart() {
    const cart = document.getElementById('cart');
    cartVisible = !cartVisible;
    cart.classList.toggle('show', cartVisible);
}

function closeCart() {
    const cart = document.getElementById('cart');
    cartVisible = false;
    cart.classList.remove('show');
}



/*xác nhận thanh toán*/
function checkout() {
    // Hiển thị thông báo xác nhận thanh toán
    const userConfirmed = confirm("Xác nhận thanh toán!");

    // Kiểm tra nếu người dùng nhấn "OK"
    if (userConfirmed) {
        // Chuyển đến trang thanh toán thành công
        window.location.href = 'thanhtoanthanhcong.html';
    } else {
        // Nếu người dùng nhấn "Cancel", có thể thực hiện hành động khác nếu cần
        console.log("Người dùng đã hủy thanh toán.");
    }
}


