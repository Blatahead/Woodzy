const product = [
    {
        id: 0,
        image: 'img/logo_leonoel_ia.jpg',
        title: 'Sapin de Noël',
        price: 19.99,
    },
    {
        id: 1,
        image: 'img/logo_leonoel_ia.jpg',
        title: 'Boule de flocons',
        price: 25,
    }
];

const categories = [...new Set(product.map((item) =>
{
    return item;
}))];
let i = 0;

// document.getElementById('root').innerHTML = categories.map((item) =>
// {
//     var { image, title, price } = item;
//     return (
//         `<div class='box'>
//             <div class='img-box'>
//                 <img class='images' src=${image}></img>
//             </div>
//             <div class='bottom'>
//                 <p>${title}</p>
//                 <h2>€ ${price}</h2>` +
//                 "<button onclick='addtocart(" + (i++) + ")'>Ajouter au panier</button>" +
//             `</div>
//         </div>`
//     );
// }).join('');

var cart = [];

function addtocart(a) {
    cart.push({...categories[a]});
    displaycart();
}

function displaycart() {
    let j = 0, total=0;
	document.getElementById("cart-counter").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Votre panier est vide";
		document.getElementById('total').innerHTML = 0+",00 €";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((items) =>
        {
            var { image, title, price } = items;
			total = total + price;
			document.getElementById('total').innerHTML = total.toFixed(2)+" €";
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size: 15px;'>${price} €</h2>` +
                    `<i class='fa-solid fa-trash' onclick='delElement(${j++})'></i></div>`
            );
        }).join('');
    }
}

function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}
