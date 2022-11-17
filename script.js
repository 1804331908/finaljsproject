var home = [];
var prodId = 1;
$(document).ready(function () {
        $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function (data) {
                home = data;
                // console.log(home);

                home?.forEach(function (item, i) {
                        // console.log(item)
                        $(`.card_flex1 .card:nth-child(${i + 1}) img`).attr('src', item.preview);
                        $(`.card_flex1 .card:nth-child(${i + 1}) img`).bind('click', function () {
                                $(`#homepage`).css("display", "none");
                                $(`.product-detail`).css("display", "block");
                                localStorage.setItem('id', item.id);
                                prodId = localStorage.getItem('id');
                                $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + prodId, function (data) {
                                        // console.log(data);
                                        // console.log(array);
                                        localStorage.setItem("data", JSON.stringify(data));
                                        $('#left-image').attr('src', data.preview);
                                        $(`#name`).text(data.name);
                                        $(`#united`).text(data.brand);
                                        $(`#price`).text('Price: Rs' + ' ' + data.price);
                                        $(`#para`).text(data.description);
                                        data.photos?.forEach(function (elems, j) {
                                                $(`.product-image img:nth-child(${j + 1})`).attr('src', data.photos[j])
                                                $(`.product-image img:nth-child(${j + 1})`).bind('click', function (e) {
                                                        $('#left-image').attr('src', e.target.src);
                                                });
                                        });
                                });
                        });
                        $(`.card_flex1 .card:nth-child(${i + 7}) img`).bind('click', function () {
                                $(`#homepage`).css("display", "none");
                                $(`.product-detail`).css("display", "block");
                                localStorage.setItem('id', home[i + 5].id);
                                prodId = localStorage.getItem('id');
                                $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + prodId, function (data) {
                                        $('#left-image').attr('src', data.preview);
                                        $(`#name`).text(data.name);
                                        $(`#united`).text(data.brand);
                                        $(`#price`).text('Price: Rs' + ' ' + data.price);
                                        $(`#para`).text(data.description);
                                        data.photos?.forEach(function (item, j) {
                                                $(`.product-image img:nth-child(${j + 1})`).attr('src', data.photos[j])
                                                $(`.product-image img:nth-child(${j + 1})`).bind('click', function (e) {
                                                        $('#left-image').attr('src', e.target.src);
                                                });
                                        });
                                });

                        });
                        $(`.card_flex1 .card:nth-child(${i + 1}) .card-body h5`).text(item.name);
                        // console.log(data.name)
                        $(`.card_flex1 .card:nth-child(${i + 1}) .card-body .card-text`).text(home[i].brand);
                        $(`.card_flex1 .card:nth-child(${i + 1}) .card-body .card-price`).text('Rs' + ' ' + home[i].price);
                        $(`.card_flex1 .card:nth-child(${i + 7}) img`).attr('src', home[i + 5].preview);
                        $(`.card_flex1 .card:nth-child(${i + 7}) .card-body h5`).text(home[i + 5].name);
                        $(`.card_flex1 .card:nth-child(${i + 7}) .card-body .card-text`).text(home[i + 5].brand);
                        $(`.card_flex1 .card:nth-child(${i + 7}) .card-body .card-price`).text('Rs' + ' ' + home[i + 5].price);


                });
        });
        $(`.card:nth-child(6)`).before('<h3 class="accessories-div" id="accessoriesLink">Accessories for Men and Women</h3>');
});

var cartClick = document.querySelector("#click-cart");
var showCartbox = document.querySelector(".cart-page")
var showHome = document.querySelector("#homepage");
var productCount = document.querySelector(".product-count")

var productData = document.querySelector(".product-detail");
function checkoutBox() {
        showHome.style.display = "none";
        showCartbox.style.display = "block"
        productData.style.display = "none";
}
cartClick.addEventListener("click", checkoutBox);

var orderPlaced = document.querySelector('btn-place-order');
var getOrder = document.querySelector('orderPlaced');
function orderSuccess() {
        orderPlaced.style.display = 'block'
        getOrder.style.display = 'none'
}
function openHomepage() {
        showHome.style.display = "block";
        showCartbox.style.display = "none"
        productData.style.display = "none";
}
var image = document.querySelectorAll('.product-image img');
image.forEach(items => {
        items.addEventListener("click", () => {
                removeBorder();
                items.classList.add('activeBorder');
        })
})
// var productData = [];
function removeBorder() {
        image.forEach(items => {
                items.classList.remove('activeBorder');
        })
}
var productImg = document.querySelector(".img");
// orderPlaced.addEventListener("click", orderSuccess);
var totalproduct = 0;
var count = 0;
document.querySelector("#add-to-cart").addEventListener("click", function () {
        document.querySelector('#totalItem').innerHTML = 'Total Items:'+ " " + ++totalproduct;
});

function displayitemCount(event) {
        localStorage.setItem("countValue", ++count);
        productCount.innerHTML = localStorage.getItem("countValue");
}
// productCount.innerHTML = localStorage.getItem("countValue");

var grandTotal  = 0;
$("#priceRs").text(grandTotal);


$('#add-to-cart').bind('click', function (cartBox) {
        var element1 = document.createElement('div');
        element1.classList.add('checkout-box');
        var element2 = document.createElement('div');
        element2.classList.add('checkout-box-img');
        var element3 = document.createElement('img');
        element3.classList.add('checkout-img')
        element1.appendChild(element2)
        element2.appendChild(element3)
        var element4 = document.createElement('div');
        element4.classList.add('checkout-content');
        element1.appendChild(element4);
        var element5 = document.createElement('h4');
        element5.classList.add('checkout-heading');
        var element6 = document.createElement('p');
        element6.classList.add('quantity')
        var element7 = document.createElement('p');
        element7.classList.add('amount')
        element4.appendChild(element5)
        element4.appendChild(element6)
        element4.appendChild(element7)
        // console.log(data)
        var getItems = localStorage.getItem("data");
        var localData = JSON.parse(getItems)
        element5.innerText = localData.name;
        element3.src = localData.preview;
        $('.cart-left').append(element1)
        element6.innerText = 'x1';
        element7.innerText = 'Amount: Rs'+ ' ' + localData.price;

        grandTotal += localData.price;
        $("#priceRs").text(grandTotal)
        
       

})



// var count = 0;
// var productCount = document.getElementsByClassName("product-count");

// productCount.innerHTML = count;
// console.log(productCount);
// var addToCart = document.querySelector('#add-to-cart')

//         addToCart.addEventListener('click', function(){
//                 count++
//                 productCount.innerHTML = count;
//         })
