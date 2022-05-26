
const colorsElm = document.querySelector('#colors');
const qtyElm = document.querySelector('#quantity');

const searchParams = new URLSearchParams(location.search);
const productId = searchParams.get('id')

function fetchProduct(){
    fetch('http://localhost:3000/api/products/' + productId).then(res=>res.json()).then(product=>{
        
        document.querySelector('#title').innerHTML=product.name;
        document.querySelector('#price').innerHTML=product.price;
        document.querySelector('#description').innerHTML=product.description;
        document.querySelector(".item__img").innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}" />`;
        
        product.colors.map((color) => {
            colorsElm.innerHTML+=`<option value="${color}">${color}</option>`;
        });
        
        
    })
}

fetchProduct();

const addToCart = () => {



    const data = {
        productId,
        color: colorsElm.value,
        qty: Number(qtyElm.value)
    }

    const errors = {};

    if(!data.color) errors.color = 'Must select a color.'
    if(!data.qty) errors.qty = 'Quantity must be 1 or more'

    if(Object.keys(errors).length === 0 ) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem('cart', JSON.stringify([...cart, data]))
    }else{
        console.log({errors})
    }

}

document.querySelector('#addToCart').addEventListener('click', addToCart );


