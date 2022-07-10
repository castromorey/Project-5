const searchParams = new URLSearchParams(location.search);
const orderId = searchParams.get('orderId');

document.querySelector('#orderId').innerHTML = orderId

