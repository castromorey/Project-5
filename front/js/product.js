
const colorsElm = document.querySelector('#colors');
const qtyElm = document.querySelector('#quantity');

const searchParams = new URLSearchParams(location.search);
const productId = searchParams.get('id');

let data = {};

function fetchProduct(){
    fetch('http://localhost:3000/api/products/' + productId).then(res=>res.json()).then(({name, price, imageUrl, ...product})=>{
        
        data = {
            name,
            price, 
            imageUrl
        };
        
        document.title = name;
        document.querySelector('#title').innerHTML=name;
        document.querySelector('#price').innerHTML=price;
        document.querySelector('#description').innerHTML=product.description;
        document.querySelector(".item__img").innerHTML=`<img src="${imageUrl}" alt="${product.altTxt}" />`;
        
        product.colors.map((color) => {
            colorsElm.innerHTML+=`<option value="${color}">${color}</option>`;
        });
        
        
    })
}

fetchProduct();

const addToCart = () => {



    data = {
        ...data,
        productId,
        color: colorsElm.value,
        qty: Number(qtyElm.value)
    }


    const errors = {};

    if(!data.color) errors.color = 'Must select a color.'
    if(!data.qty) errors.qty = 'Quantity must be 1 or more'
    

    //list from local storage
    if(Object.keys(errors).length === 0 ) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        //aqui debe estar la falla
     const product = cart.find(item => item.productId === data.productId && item.color === data.color );
        if(product) {
            product.qty = product.qty + data.qty;

            //console.log({cart})

            cart = cart.filter(item => {
                return product.productId !== item.productId
            })

            //console.log({cart})

            localStorage.setItem('cart', JSON.stringify([...cart, product]))
        }else{
            localStorage.setItem('cart', JSON.stringify([...cart, data]))
        }

    }else{
        console.log({errors})
    }

}

document.querySelector('#addToCart').addEventListener('click', addToCart );


