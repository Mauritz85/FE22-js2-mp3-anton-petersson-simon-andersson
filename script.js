import { ref, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"
import { db } from "./modules/firebase.js"


let cartAmount = 0
let cartArray = []

checkCart()
function checkCart() {
    if (localStorage.getItem("cartArray") === null) {
    }
    else {
        cartArray = JSON.parse(localStorage.getItem("cartArray"))
        cartAmount = cartArray.length
        const cartLink = document.getElementById('cart-amount')
        cartLink.innerText = cartAmount
    }
}


let productsArray = []
let productsNameArray = []

async function getProducts() {
    const firebaseProducts = await get(ref(db, '/products/'))
    for (let i = 0; i < firebaseProducts.val().length; i++) {
        productsArray.push(firebaseProducts.val()[i])
        productsNameArray.push(firebaseProducts.val()[i].name)
    }

    showProducts(productsArray)
    addToCart(productsArray, productsNameArray)

}

getProducts()

function showProducts() {
    for (let i = 0; i < productsArray.length; i++) {
        const productContainer = document.getElementById('product-container')
        const productCard = document.createElement('div')
        productCard.classList.add('product-card')
        productContainer.append(productCard)
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('img-container')
        productCard.append(imgContainer)
        const productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = productsArray[i].imgUrl
        imgContainer.append(productImg)
        const productName = document.createElement('h3')
        productName.innerHTML = productsArray[i].name
        const productPrice = document.createElement('h2')
        productPrice.innerHTML = productsArray[i].price
        const amountInput = document.createElement('input')
        amountInput.type = 'number';
        amountInput.placeholder = "0";
        amountInput.min = "0";

        const toCartBtn = document.createElement('button')
        toCartBtn.setAttribute('class', 'btn btn-danger mt-2 btn-round ')
        toCartBtn.innerHTML = 'Add to cart'

        productCard.append(productName, productPrice, amountInput, toCartBtn)

    }


}



function addToCart() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => button.addEventListener("click", function (event) {
        event.preventDefault()
        
        if (event.target.parentNode.childNodes[3].value == 0) {
            alert('Please select amount')
        }


        else {
            
            const IndexOfProduct = productsNameArray.indexOf(event.target.parentNode.childNodes[1].innerText)

            if (productsArray[IndexOfProduct].inStock < 1) {
                alert('Unfortunately, this item is out of stock')
            }
            else if (event.target.parentNode.childNodes[3].value > productsArray[IndexOfProduct].inStock) {
                alert('Unfortunately, there is only ' + productsArray[IndexOfProduct].inStock + 'items left in stock')
            }

            else {
                 cartArray.push({
                imgUrl: event.target.parentNode.childNodes[0].firstChild.currentSrc,
                name: event.target.parentNode.childNodes[1].innerText,
                price: event.target.parentNode.childNodes[2].innerText,
                amount: event.target.parentNode.childNodes[3].value,
                index: IndexOfProduct
            })

                productsArray[IndexOfProduct].inStock = productsArray[IndexOfProduct].inStock - event.target.parentNode.childNodes[3].value

            }


            cartAmount = cartArray.length
            const cartLink = document.getElementById('cart-amount')
            cartLink.innerText = cartAmount
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
            event.target.parentNode.childNodes[3].value = ''

        }
    }

    ));

}
