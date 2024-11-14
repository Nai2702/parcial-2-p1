//Referencia global para el mini carrito cuando hago hover

const carritoBtn = document.querySelector(".carrito");
const miniContainer = document.createElement("div");

miniContainer.className = "mini-cart"
miniContainer.style.display = "none";
carritoBtn.parentNode.appendChild(miniContainer);

//Evento para exhibición y ocultar el mini-cart
carritoBtn.addEventListener("mouseover", showMiniCarrito);
carritoBtn.addEventListener("mouseout", hideMiniCarrito);
miniContainer.addEventListener("mouseover", showMiniCarrito);
miniContainer.addEventListener("mouseout", hideMiniCarrito);

//Funcion

function showMiniCarrito (){
    miniContainer.style.display = "block"
    renderMiniCarrito();
}

function hideMiniCarrito(){
    miniContainer.style.display = "none";
}

//Function de renderización

// Funcion de renderizacion del mini-carritoo
function renderMiniCarrito(){
    // Limpiar o mini-carrito antes de ser renderizado
    miniContainer.innerHTML = "";

    // Container para os items do carrito
    const itemsContainer = document.createElement("div");

    // Variable para almacenar el total
    let total = 0;

    // Loop para los  produtos de carrito
    for (const productId in carrito) {
        const item = carrito[productId];
        total += item.price * item.cantidad;

        // Container do item de mini-carrito
        const itemContainer = document.createElement("div");
        itemContainer.className = "mini-cart-item d-flex align-items-center";

        // Imagem do producto
        const itemImage = document.createElement("img");
        itemImage.src = item.image;  // Acesso a URL da imagem do JSON
        itemImage.alt = item.name;
        itemImage.className = "mini-cart-image img-thumbnail me-2"; // Adicionar classes Bootstrap

        // Nombre y quantida de do productos
        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (x${item.cantidad})`;
        itemName.className = "mini-cart-name";

        // Precio de item
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `U$ ${(item.price * item.cantidad).toFixed(2)}`;
        itemPrice.className = "mini-cart-price ms-auto";

        // Adicionar la imagem, el nombre ey el precio al itemContainer
        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemPrice);

        // Adicionar el itemContainer al itemsContainer
        itemsContainer.appendChild(itemContainer);
    }

    // Adicionar el container de itens al mini-cart
    miniContainer.appendChild(itemsContainer);

    // Seccion de subtotal
    const totalContainer = document.createElement("div");
    totalContainer.className = "mini-cart-total d-flex justify-content-between align-items-center mt-3 text-dark";
    
    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total: U$ ";

    const totalAmount = document.createElement("span");
    totalAmount.textContent = total.toFixed(2);

    totalContainer.appendChild(totalLabel);
    totalContainer.appendChild(totalAmount);

    // Boton de checkout
    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "btn btn-primary btn-sm w-100 mt-2";
    checkoutBtn.textContent = "Finalizar a compra";
    checkoutBtn.addEventListener("click", checkout);

    // Adicionar el subtotal ey el boton de checkout de mini-cart
    miniContainer.appendChild(totalContainer);
    miniContainer.appendChild(checkoutBtn);
}



function checkout(){
    alert("Yendo para finalizar la compra...")
}
