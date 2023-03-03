let orderId = new URL(window.location.href).searchParams;
let id = orderId.get('orderId');
function getOrderId(){
    const displayOrderId = document.getElementById('orderId');
    displayOrderId.textContent = id;
    localStorage.clear();
}
getOrderId();