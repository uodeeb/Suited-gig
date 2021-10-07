
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
;
function ready() {
    var removeFavItemButtons = document.getElementsByClassName('remov-btn ');
    for (var i = 0; i < removeFavItemButtons.length; i++) {
        var button = removeFavItemButtons[i];
        button.addEventListener('click', removeFavItem);
    };

    // var quantityInputs = document.getElementsByClassName('fav-quantity-input');
    // for (var i = 0; i < quantityInputs.length; i++) {
    //     var input = quantityInputs[i];
    //     input.addEventListener('change', quantityChanged);
    // };

    var addToFavButtons = document.getElementsByClassName('fav-item-button');
    for (var i = 0; i < addToFavButtons.length; i++) {
        var button = addToFavButtons[i];
        button.addEventListener('click', addToFavClicked);
    };

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
};

function purchaseClicked() {
    alert('Thank you for your purchase');
    var favItems = document.getElementsByClassName('fav-items')[0];
    while (favItems.hasChildNodes()) {
        favItems.removeChild(favItems.firstChild);
    }
    updateFavTotal();
};

function removeFavItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    updateFavTotal();
};

// function quantityChanged(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateFavTotal();
// }

function addToFavClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToFav(title, price, imageSrc);
    updateFavTotal();


};

function addItemToFav(title, price, imageSrc) {
    var favRow = document.createElement('div');
    favRow.classList.add('fav-row');
    var favItems = document.getElementsByClassName('fav-items')[0];
    var favItemNames = favItems.getElementsByClassName('fav-item-title');
    for (var i = 0; i < favItemNames.length; i++) {
        if (favItemNames[i].innerText == title) {
            alert('This item is already added to the favorait');
            return;
        };
    };
    var favRowContents = `
    <div id="add-from-fav" class="fav-item fav-column col-12 pb-3 mb-3 mt-0 text-center" style="background-color:#ffffff; width:100%;">
       <div class="row">
          <div class="imge-fav-view">
             <img class="fav-item-image" src="${imageSrc}" width="100" height="100">
          </div>
          <div class="col-3 col-md-2 p-0 mx-1 my-5 mx-md-0">
              <span class="fav-item-title ">${title}</span>
        
          </div>
          <div class="col-3 col-md-4 my-5">
               <span class="fav-price fav-column mx-0 mx-md-5">${price}</span>
          </div>
               
               <div class="fav-quantity fav-column col-2 my-0 my-md-5">
                 <button class="btn btn-info remov-btn mb-0" type="button" style="">X</button>
                 <button class="btn btn-info mb-0 " type="button" style="" onclick="addTocart()"> <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" class="bi bi-cart3"
                 width="20" height="20" viewBox="0 0 16 16">
                 <path
                     d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  </button>
              </div>
       </div>
 </div>`




    favRow.innerHTML = favRowContents;
    favItems.append(favRow);
    favRow.getElementsByClassName('remov-btn')[0].addEventListener('click', removeFavItem);


};

function updateFavTotal() {
    var favItemContainer = document.getElementsByClassName('fav-items')[0];
    var favRows = favItemContainer.getElementsByClassName('fav-row');
    var total = 0
    for (var i = 0; i < favRows.length; i++) {
        var favRow = favRows[i]
        var priceElement = favRow.getElementsByClassName('fav-price')[0];
        // var quantityElement = favRow.getElementsByClassName('fav-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        // var quantity = quantityElement.value;
        total = total + price;
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('fav-total-price')[0].innerText = total + ' EGP';
};

function addTocart() {
    document.getElementById("add-from-fav").innerHTML = myfunc ;
}