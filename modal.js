function openModal(productoID) {
    // Cria o background do modal com classes CSS
    const backgroundModal = document.createElement("div");
    backgroundModal.classList.add("modal-background");

    // Cria o conteúdo do modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "w-50", "px-3", "d-flex", "flex-col");

    // Adiciona o contenido modal
    modalContent.innerHTML = `
        <div class="d-flex flex-column justify-content-between align-items-center w-100">
            <div class="d-flex flex-row justify-content-between align-items-center w-100">
                <h3>Detalles del Produto</h3>
                <button id="closeModal" type="button" class="btn btn-primary">Cerrar</button>
            </div>
            <hr>
            <div class="modal-info w-100">
                <div class="w-100" id="productoImage">
                    <!-- Carregar imagem do produto -->
                </div>
                <div class="w-100">
                    <p id="productoDescription"></p>
                </div>
                <div class="w-100 bg-dark bg-gradient border border-1 rounded-3 text-white">
                    <div id="productFeatures">Características</div>
                </div>
                <!--div para precio y botao de compra-->
                <div class="d-flex flex-column align-items-center mt-3">
                    <span class="h4 fw-bold" id="productPrice"></span>
                    <button type="button" class="btn btn-success mt-2" id="addToCartButton">Agregar al Carrito</button>
                </div>
            </div>
        </div>
        
    `;

    // Adiciona o modal de fundo
    backgroundModal.appendChild(modalContent);
    document.body.appendChild(backgroundModal);

    // Muestra un modal con a classe "show"
    setTimeout(() => backgroundModal.classList.add("show"), 10);

    // Fecha o modal ao clicar no botão de fechamento
    document.getElementById("closeModal").addEventListener("click", () => {
        backgroundModal.classList.remove("show");
        setTimeout(() => document.body.removeChild(backgroundModal), 300);
    });

    // Busca o produto usando a lista global
    const producto = productosGlobal.find(p => p.id === productoID);

    if (producto) {
        // Atualiza la descripcion y la imagem de produto
        document.getElementById("productoDescription").innerText = producto.other;
        const productoImage = document.createElement("img");
        productoImage.src = producto.image;
        productoImage.alt = producto.name;
        productoImage.classList.add("img-fluid", "img-stl");
        document.getElementById("productoImage").appendChild(productoImage);

        // Atualiza el precio de produto
        document.getElementById("productPrice").innerText = `U$${producto.price.toLocaleString()}`;

        // Configura el boton de agregar al carrito
        document.getElementById("addToCartButton").addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            alert(`El producto "${producto.name}" fue agregado al carrito con éxito!`);
        });


        // Crea una tabla de caracteristicas
        if (producto.features) {
            const caracteristicasTabla = document.createElement("table");
            caracteristicasTabla.classList.add("table", "table-striped", "text-white");
            let tableContent = `<thead><tr><th>Característica</th><th>Valor</th></tr></thead><tbody>`;
            for (let [feature, value] of Object.entries(producto.features)) {
                tableContent += `<tr><td>${feature}</td><td>${value}</td></tr>`;
            }
            tableContent += `</tbody>`;
            caracteristicasTabla.innerHTML = tableContent;
            document.getElementById("productFeatures").appendChild(caracteristicasTabla);
        }
    }
}
