/*Nguyễn Thanh Phúc - B2203464*/

/*------------------------------------------FORM ĐĂNG KÝ NGƯỜI DÙNG----------------------------------------------------------*/
function registerUser(event) {
    // Ngăn form gửi dữ liệu (nếu bạn muốn xử lý dữ liệu trước khi gửi)
    event.preventDefault();

    // Lấy các giá trị từ form
    const firstName = document.getElementsByName("firstname")[0].value;
    const phone = document.getElementsByName("phone")[0].value;
    const address = document.getElementsByName("address")[0].value;
    const username = document.getElementsByName("usernameIn")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('pwconfirm').value;

    // Kiểm tra nếu tất cả các trường đều được điền
    if (!firstName || !phone || !address || !username || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    // Kiểm tra nếu mật khẩu và mật khẩu xác nhận khớp
    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }
    // Kiểm tra số điện thoại (bắt đầu bằng số 0 và có đúng 10 chữ số)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số.");
        return;
    }

    // Kiểm tra định dạng email hợp lệ (biểu thức chính quy đã có sẵn)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ.");
        return;
    }

    // Nếu tất cả hợp lệ, hiển thị thông báo thành công
    document.getElementById('success-message').style.display = 'block';

     // Hiển thị thông báo thành công
     alert("Đăng ký thành công!");

    // Chờ 1 giây rồi chuyển đến trang đăng nhập
    setTimeout(function() {
        window.location.href = 'dangnhap.html';  // Thay đổi 'dangnhap.html' với trang đăng nhập của bạn
    }, 1000); // 1 giây (1000ms) để người dùng có thời gian xem thông báo
}

/*------------------------------------------CHUYỂN SLIDES----------------------------------------------------------*/
// Tự động chuyển động carousel
document.addEventListener('DOMContentLoaded', () => {
    const instagram = document.querySelector('#instagramCarousel');
    const carousel = new bootstrap.Carousel(instagram, {
        interval: 3000, // Thời gian chuyển giữa các slide (ms)
        ride: 'carousel'
    });
});

/*------------------------------------------THANH ĐIỀU HƯỚNG---------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".sticky-header .navbar");

    // Ẩn thanh điều hướng ban đầu
    navbar.classList.add("hidden");

    // Hiển thị thanh điều hướng sau khi tải trang
    setTimeout(() => {
        navbar.classList.remove("hidden");
    }, 500); // Đợi 500ms để tạo hiệu ứng trượt ban đầu

    // Thêm hiệu ứng khi cuộn
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

/*------------------------------------------ẨN-HIỆN NÚT TÌM KIẾM----------------------------------------------------------*/
// Phần nút tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('icon-search-btn');
    const searchC= document.getElementById('search-container');
    const closeBtn = document.getElementById('close-btn');

    search.addEventListener('click', () => {
        searchC.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        searchC.style.display = 'none';
    });
});
/*------------------------------------------TÌM KIẾM SẢN PHẨM (HƯỚNG PHÁT TRIỂN THÊM)----------------------------------------------------------*/
// Tìm kiếm sản phẩm
function searchProduct() {
    const query = document.getElementById("searchQuery").value.trim();

    // Gửi yêu cầu đến PHP
    fetch("search.php?query=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById("results");
            results.innerHTML = "";

            if (data.length > 0) {
                data.forEach(product => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <strong>${product.name}</strong><br>
                        ${product.description}<br>
                        <em>Giá: ${product.price.toFixed(2)} USD</em>
                    `;
                    results.appendChild(li);
                });
            } else {
                results.innerHTML = "<li class='no-results'>Không tìm thấy sản phẩm nào!</li>";
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
        });
}
/*------------------------------------------ĐĂNG NHẬP (HAI TÀI KHOẢN)----------------------------------------------------------*/
// Đăng nhập vào tài khoản thường và admin
function checkLogin() {
    // Lấy giá trị của tên tài khoản và mật khẩu
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Kiểm tra thông tin đăng nhập
    if (username === "ntPhuc" && password === "Thanhphuc1") {
        // Chuyển hướng đến trang tài khoản
        window.location.href = "taikhoan.html";
    } 
    else if (username === "admin" && password === "12345"){
        // Chuyển hướng đến trang quản trị
        window.location.href = "trangquantri.html";
    }
    else {
        // Nếu thông tin đăng nhập không đúng, thông báo lỗi
        alert("Thông tin đăng nhập không đúng.");
    }
}

/*------------------------------------------BACK_TO_TOP----------------------------------------------------------*/
 // Lấy nút Back to Top
 const backToTop = document.getElementById("back-to-top");

 // Hiển thị nút khi cuộn xuống
 window.addEventListener("scroll", function () {
     if (window.scrollY > 300) { // Khi cuộn hơn 200px
         backToTop.classList.add("show");
     } else {
         backToTop.classList.remove("show");
     }
 });

 // Xử lý sự kiện khi nhấn vào nút
 backToTop.addEventListener("click", function (e) {
     e.preventDefault();
     window.scrollTo({
         top: 0,
         behavior: "smooth"
     });
 });

/*------------------------------------------CHATBOX----------------------------------------------------------*/
// Hiển thị / ẩn hộp chat khi nhấn vào biểu tượng chat
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    const chatIcon = document.getElementById('chat-icon');
    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
        chatbox.style.display = 'flex'; // Hiện hộp chat
        chatIcon.style.display = 'none'; // Ẩn biểu tượng chat
    }
}

// Đóng chatbox và hiển thị lại biểu tượng chat
function closeChatbox() {
    const chatbox = document.getElementById('chatbox');
    const chatIcon = document.getElementById('chat-icon');
    chatbox.style.display = 'none'; // Ẩn hộp chat
    chatIcon.style.display = 'block'; // Hiện lại biểu tượng chat
}

// Kiểm tra nếu người dùng nhấn phím Enter
function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Gửi tin nhắn khi nhấn nút gửi
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessage('Bạn: ' + userInput, 'user');
        generateResponse(userInput);
        document.getElementById('user-input').value = ''; // Xóa nội dung nhập sau khi gửi
    }
}

// Thêm tin nhắn vào chat log
function addMessage(message, sender) {
    const chatLog = document.getElementById('chat-log');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = sender;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight; // Cuộn xuống cuối mỗi khi có tin nhắn mới
}

// Tạo phản hồi cho tin nhắn người dùng
function generateResponse(input) {
    const lowerInput = input.toLowerCase();
    let response;

    if (lowerInput.includes('shop mình bán những loại nào thế.')) {
        response = 'Chào bạn! Shop chúng tôi chuyên cung cấp các loại trái cây tươi ngon, đa dạng như táo, cam, chuối, dưa hấu, nho, và nhiều loại trái cây khác theo mùa. Bạn đang tìm loại trái cây nào để thưởng thức hôm nay?';
    } else if (lowerInput.includes('chào bạn') || lowerInput.includes('hi')) {
        response = 'Chào bạn! Mình có thể giúp gì cho bạn hôm nay?';
    } else if (lowerInput.includes('giá trái cây ở shop mình thế nào?')) {
        response = 'Giá trái cây của chúng tôi rất hợp lý và cạnh tranh. Tùy vào loại trái cây và mùa vụ, giá sẽ có sự thay đổi. Bạn cần hỏi giá cụ thể của loại trái cây nào không?';
    } else if (lowerInput.includes('shop mình có khuyến mãi gì không?')) {
        response = 'Chúng tôi luôn có các chương trình khuyến mãi đặc biệt cho khách hàng. Hãy theo dõi chúng tôi để không bỏ lỡ những ưu đãi hấp dẫn!';
    } else if (lowerInput.includes('shop có giao hàng không?')) {
        response = 'Chúng tôi cung cấp dịch vụ giao hàng tận nơi. Bạn có thể cung cấp địa chỉ và chúng tôi sẽ sắp xếp giao hàng cho bạn trong thời gian sớm nhất!';
    } else if (lowerInput.includes('trái cây của shop mình có nguồn gốc từ đâu?')) {
        response = 'Trái cây của chúng tôi đều được nhập khẩu từ các nguồn cung uy tín và chất lượng, chủ yếu từ các vườn trái cây tại Việt Nam và các quốc gia khác. Bạn yên tâm về chất lượng nhé!';
    } else if (lowerInput.includes('làm sao để bảo quản trái cây tươi lâu?')) {
        response = 'Để bảo quản trái cây tươi lâu, bạn có thể giữ chúng trong tủ lạnh hoặc bảo quản ở nơi khô ráo, thoáng mát tùy loại. Nếu cần lời khuyên cụ thể cho loại trái cây nào, bạn cứ hỏi nhé!';
    } else if (lowerInput.includes('mình có thể liên hệ với bộ phận chăm sóc khách hàng như thế nào?')) {
        response = 'Bạn có thể liên hệ với chúng tôi qua email hoặc hotline. Chúng tôi luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào!';
    } else {
        response = 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
    }

    addMessage('Shop: ' + response, 'bot');
}

/*------------------------------------------LỌC SẢN PHẨM(PHẦN CỦA TRANG CHỦ)----------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả các nút và danh sách sản phẩm
    const buttons = document.querySelectorAll('.filter-button-group button');
    const items = document.querySelectorAll('.special-grid');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Loại bỏ class 'active' khỏi tất cả nút
            buttons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });

            // Thêm class 'active' vào nút được nhấn
            this.classList.remove('btn-outline-primary');
            this.classList.add('active', 'btn-primary');

            // Lọc các mục dựa trên giá trị của nút
            const filterValue = this.getAttribute('data-bs-filter');

            // Hiển thị hoặc ẩn các phần tử
            items.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});


//  LIÊN HỆ-------------------------------
//thông tin liên hệ
document.getElementById("contactForm").addEventListener("submit", function (event) {
    // Lấy giá trị các trường
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Biểu thức kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Biểu thức kiểm tra số điện thoại: Bắt đầu bằng 0 và có đúng 10 chữ số
    const phoneRegex = /^0[0-9]{9}$/;

    // Kiểm tra họ tên
    if (name === "") {
        alert("Vui lòng nhập họ tên!");
        event.preventDefault(); // Ngăn form gửi đi
        return;
    }

    // Kiểm tra email đúng định dạng
    if (!emailRegex.test(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ!");
        event.preventDefault(); // Ngăn form gửi đi
        return;
    }

    // Kiểm tra số điện thoại đúng định dạng
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ! Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.");
        event.preventDefault(); // Ngăn form gửi đi
        return;
    }

    // Nếu không có lỗi, form sẽ được gửi đi
    alert("Thông tin đã được gửi!");
    this.reset(); // Reset lại form
});

//Thông tin khuyến mãi
function validatePhoneNumber() {
    // Lấy giá trị từ ô nhập số điện thoại
    const phoneInput = document.getElementById("phone-input").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Biểu thức kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^0\d{9}$/;

    // Kiểm tra số điện thoại
    if (phoneRegex.test(phoneInput)) {
        // Nếu hợp lệ
        alert("Đăng ký thành công!");
        errorMessage.style.display = "none"; // Ẩn thông báo lỗi
        document.getElementById("phone-input").value = ""; // Reset ô nhập liệu
    } else {
        // Nếu không hợp lệ
        errorMessage.style.display = "block"; // Hiển thị thông báo lỗi
    }
}

//  THANH TOÁN-------------------------------
//thông tin thanh toán
function checkout(event) {
    // Ngăn chặn hành vi mặc định của nút gửi
    event.preventDefault();

    // Lấy giá trị từ các trường
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const district = document.getElementById('district').value;
    const ward = document.getElementById('ward').value;
    const address = document.getElementById('address').value.trim();

    // Kiểm tra điều kiện
    if (!name) {
        alert('Vui lòng nhập họ và tên.');
        return; // Ngừng thực hiện nếu không có tên
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Vui lòng nhập địa chỉ email hợp lệ.');
        return; // Ngừng thực hiện nếu email không hợp lệ
    }

    // Kiểm tra số điện thoại
    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(phone)) {
        alert('Số điện thoại phải bắt đầu bằng 0 và có 10 số.');
        return; // Ngừng thực hiện nếu số điện thoại không hợp lệ
    }

    // Kiểm tra các trường thông tin khác
    if (!city || district === 'Chọn quận huyện' || ward === 'Chọn xã/phường' || !address) {
        alert('Vui lòng điền đầy đủ thông tin địa chỉ.');
        return; // Ngừng thực hiện nếu thông tin địa chỉ không đầy đủ
    }

    // Nếu tất cả thông tin hợp lệ, có thể gửi biểu mẫu
    // Tại đây bạn có thể thêm mã để gửi dữ liệu đến máy chủ hoặc thực hiện hành động khác
    alert('Xác nhận thanh toán!');
    window.location.href = 'thanhtoanthanhcong.html'; // Chuyển hướng đến trang thanh toán thành công
}

// Gán sự kiện cho nút thanh toán
const checkoutButton = document.querySelector('.checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
}


// -------------------------------------------------GIỎ HÀNG------------------------------------------------------

