const cart = {};

// เพิ่มหรือลดจำนวนสินค้าในตะกร้าเมื่อกดปุ่มเพิ่มหรือลด
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // ดึงข้อมูลสินค้าและราคาจากแอตทริบิวต์ของปุ่ม
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    // เพิ่มสินค้าในตะกร้าหรือเพิ่มจำนวนหากมีอยู่แล้ว
    if (!cart[productId]) {
      cart[productId] = {
        quantity: 1,
        price: price,
      };
    } else {
      cart[productId].quantity++;
    }
    // อัปเดตแสดงรายการสินค้าในตะกร้า
    updateCartDisplay();
    // แสดงหน้าต่างแจ้งเตือนสำเร็จเมื่อเพิ่มสินค้าเรียบร้อย
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "+ เพิ่มสินค้าเรียบร้อย!",
      showConfirmButton: false,
      timer: 750,
    });
  });
});

// ลบสินค้าออกจากตะกร้าเมื่อกดปุ่มลบ
document.querySelectorAll(".subtract-from-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // ดึงข้อมูลสินค้าและราคาจากแอตทริบิวต์ของปุ่ม
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    // ลดจำนวนสินค้าในตะกร้าหรือลบสินค้าออกเมื่อจำนวนเท่ากับศูนย์
    if (cart[productId]) {
      if (cart[productId].quantity > 0) {
        cart[productId].quantity--;
        if (cart[productId].quantity === 0) {
          delete cart[productId]; // ลบสินค้าออกจากตะกร้าหากจำนวนเท่ากับศูนย์
        }
        // อัปเดตแสดงรายการสินค้าในตะกร้า
        updateCartDisplay();
        // แสดงหน้าต่างแจ้งเตือนสำเร็จเมื่อลบสินค้าเรียบร้อย
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "- ลบสินค้าเรียบร้อย!",
          showConfirmButton: false,
          timer: 750,
        });
      }
    }
  });
});

function updateCartDisplay() {
  // เลือกข้อมูลส่วนของตะกร้าที่จะแสดงผล
  const cartElement = document.getElementById("cart-items");
  // เคลียร์เนื้อหาของตะกร้าที่แสดงอยู่เดิม
  cartElement.innerHTML = "";

  let totalPrice = 0;
  let totalItems = 0; // นับจำนวนรวมของสินค้าทั้งหมด

  // วนลูปผ่านสินค้าที่มีอยู่ในตะกร้า
  for (const productId in cart) {
    const item = cart[productId];
    // คำนวณราคารวมสำหรับแต่ละรายการสินค้า
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice; // เพิ่มราคารวมทั้งหมด
    totalItems += item.quantity; // เพิ่มจำนวนรวมของสินค้า

    // สร้างข้อมูลรายการสินค้าในรูปแบบรายการ
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    listItem.textContent = `สินค้า : ${productId} : ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
    cartElement.appendChild(listItem); // เพิ่มรายการสินค้าลงในตะกร้า
  }

  // อัปเดตจำนวนสินค้าทั้งหมดในสแปน
  const itemCountSpan = document.getElementById("itemCount");
  itemCountSpan.textContent = totalItems;

  // ตรวจสอบว่าตะกร้าว่างหรือไม่ และแสดงข้อความที่เหมาะสม
  if (Object.keys(cart).length === 0) {
    const emptyCartMessage = document.createElement("li");
    emptyCartMessage.classList.add("list-group-item");
    emptyCartMessage.textContent = "ยังไม่มีสินค้าในตระกร้า.";
    cartElement.appendChild(emptyCartMessage);
  } else {
    // แสดงราคารวมทั้งหมดของสินค้าที่อยู่ในตะกร้า
    const totalPriceElement = document.createElement("li");
    totalPriceElement.classList.add("list-group-item", "fw-bold");
    totalPriceElement.textContent = `ราคารวมทั้งหมด : $${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }
}

// สร้างไฟล์ PDF และแสดงข้อความยืนยัน
document
  .getElementById("createBillButton")
  .addEventListener("click", function () {
    // จับเอลิเมนต์คอนเทนเนอร์ใบเสร็จ
    const receiptContainer = document.getElementById("cart");

    // ใช้ dom-to-image เพื่อแปลงคอนเทนเนอร์ใบเสร็จเป็นรูปภาพ
    domtoimage.toBlob(receiptContainer).then(function (blob) {
      // บันทึกรูปภาพเป็นไฟล์โดยใช้ FileSaver.js
      saveAs(blob, "bill.png");
    });
  });

// แสดงหน้าต่างแจ้งเตือนสำหรับการพิมพ์ใบเสร็จ
document
  .getElementById("createBillButton")
  .addEventListener("click", function () {
    Swal.fire({
      title: "พิมพ์ใบเสร็จเรียบร้อย!",
      text: "ขอบคุณสำหรับการซื้อสินค้า",
      icon: "success",
    });
  });
