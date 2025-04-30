document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discountApplied = { code: null, rate: 0 }; // Thông tin mã giảm giá
    let originalTotal = 0; // Tổng tiền gốc trước khi giảm giá

    // Hiển thị giỏ hàng khi trang tải xong
    updateCartDisplay();

    // Hàm tính tổng tiền giỏ hàng
    function calculateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        originalTotal = total; // Lưu tổng tiền gốc vào biến
        return total;
    }

    // Cập nhật giỏ hàng và hiển thị các sản phẩm
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;

        let total = calculateCartTotal(); // Tính tổng tiền giỏ hàng
        cartItemsContainer.innerHTML = ''; // Xóa nội dung giỏ hàng hiện tại

        // Hiển thị từng sản phẩm trong giỏ hàng
        cart.forEach(item => {
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

        // Hiển thị tổng tiền giỏ hàng
        document.getElementById('cart-total-price').innerText = `${originalTotal} VND`;

        // Hiển thị số tiền giảm
        updateDiscountAmount();

        // Đề xuất mã giảm giá tự động
        suggestDiscountCode(originalTotal);
    }

    // Hàm cập nhật số tiền giảm
    function updateDiscountAmount() {
        const discountAmount = originalTotal * discountApplied.rate;
        document.getElementById('discount-amount').innerText = `${discountAmount.toFixed(0)} VND`;
    }

    // Đề xuất mã giảm giá tự động nếu tổng tiền đạt ngưỡng
    function suggestDiscountCode(total) {
        const discountDisplay = document.getElementById('discount-feedback');

        // Danh sách mã giảm giá
        const discountConditions = [
            { code: "SALE20K", threshold: 20000, discountRate: 0.10 },
            { code: "SALE40K", threshold: 40000, discountRate: 0.15 },
            { code: "SALE60K", threshold: 60000, discountRate: 0.20 },
            { code: "SALE80K", threshold: 80000, discountRate: 0.25 }
        ];

        // Tìm mã giảm giá cao nhất có thể áp dụng
        const bestDiscount = discountConditions
            .filter(condition => total >= condition.threshold) // Chọn mã giảm giá hợp lệ
            .sort((a, b) => b.threshold - a.threshold)[0]; // Chọn mã giảm giá có mức giảm cao nhất

        // Hiển thị mã giảm giá nếu có
        if (bestDiscount) {
            discountDisplay.innerText = `Mã giảm giá: ${bestDiscount.code}`;
            discountApplied.code = bestDiscount.code;
            discountApplied.rate = bestDiscount.discountRate;
        } else {
            discountDisplay.innerText = "Không có mã giảm giá";
            discountApplied = { code: null, rate: 0 };
        }
    }

    // Hàm lấy mã giảm giá tự động
    window.getSuggestedDiscountCode = function() {
        const total = calculateCartTotal();
        suggestDiscountCode(total);
        document.getElementById('discount-input').value = discountApplied.code || '';
    };

    // Hàm áp dụng mã giảm giá từ ô nhập
    window.applySavedDiscountCode = function() {
        const discountCode = document.getElementById('discount-input').value.trim();

        if (discountCode && discountCode === discountApplied.code) {
            const discountAmount = originalTotal * discountApplied.rate;
            const discountedTotal = originalTotal - discountAmount;
            document.getElementById('cart-total-price').innerText = `${discountedTotal.toFixed(0)} VND`;

            // Cập nhật số tiền giảm
            updateDiscountAmount();
            document.getElementById('discount-feedback').innerText = 'Mã giảm giá áp dụng thành công!';
        } else {
            document.getElementById('discount-feedback').innerText = 'Mã giảm giá không hợp lệ!';
        }
    };

    // Hàm hủy mã giảm giá
    window.cancelDiscountCode = function() {
        document.getElementById('cart-total-price').innerText = `${originalTotal} VND`;
        document.getElementById('discount-amount').innerText = `0 VND`;
        document.getElementById('discount-feedback').innerText = ''; // Xóa thông báo lỗi
    };

    // Hàm tăng số lượng sản phẩm
    window.increaseQuantity = function(productId) {
        const itemInCart = cart.find(item => item.id === productId);
        if (itemInCart) {
            itemInCart.quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    };

    // Hàm giảm số lượng sản phẩm
    window.decreaseQuantity = function(productId) {
        const itemInCart = cart.find(item => item.id === productId);
        if (itemInCart && itemInCart.quantity > 1) {
            itemInCart.quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        } else if (itemInCart) {
            removeFromCart(productId);
        }
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Cập nhật giỏ hàng khi trang tải
    updateCartDisplay();
});
