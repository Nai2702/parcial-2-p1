// Variáble global para almacenar productos
let productosGlobal = [];

// Classe Productos
class Productos {
    constructor(id, name, description, image, price, stock, categoria, other, features) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.categoria = categoria;
        this.other = other
        this.features = features;
    }

    // Método para convertir un produto em un card HTML
    toHTML() {
        return `
            <div class="col-12 col-md-6 col-lg-4" data-categoria="${this.categoria}">
                <div class="card h-auto card-hover h-100">
                    <div class="card-img h-100 text-center">
                        <img src="${this.image}" alt="${this.name}" class="img-fluid img-stl">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h4 class="card-title">${this.name}</h4>
                        <p class="card-text">${this.description}</p>
                        <span class="h3 text-center fw-semibold my-lg-5">U$${this.price.toLocaleString()}</span>
                        <div class="d-flex flex-row">
                            <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="agregarAlCarrito(${this.id})">Comprar</button>
                            <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="openModal(${this.id})">Saber mais</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Método estático para cargar los productos de JSON e renderizálos en el catálogo
    static renderCatalog(catalogoId, filtrarCategorias = "all", ordenarPorPrecio = null) {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                productosGlobal = data; // Almacenar los produtos en una variable global
                let productosFiltrados = data;

                // Filtros de categoria
                if (filtrarCategorias && filtrarCategorias !== "all") {
                    productosFiltrados = data.filter(producto => producto.categoria === filtrarCategorias);
                } 
                
                // Filtros por precio
                if (ordenarPorPrecio === "maxValor") {
                    productosFiltrados = data.sort((a, b) => b.price - a.price);
                } else if (ordenarPorPrecio === "minValor") {
                    productosFiltrados = data.sort((a, b) => a.price - b.price);
                }

                // Renderizar los productos filtrados
                const catalogo = document.getElementById(catalogoId);
                catalogo.innerHTML = ''; // Limpiar el contenido

                productosFiltrados.forEach(item => {
                    const producto = new Productos(
                        item.id,
                        item.name,
                        item.description,
                        item.image,
                        item.price,
                        item.stock,
                        item.categoria,
                        item.features
                    );
                    catalogo.innerHTML += producto.toHTML();
                });

                // Mostrar solamente los productos da categoria seleccionada
                const allProducts = document.querySelectorAll(`#${catalogoId} .col-12`);
                allProducts.forEach(product => {
                    if (filtrarCategorias === null || filtrarCategorias === "all" || product.getAttribute("data-categoria") === filtrarCategorias) {
                        product.style.display = "block"; // Exhibir
                    } else {
                        product.style.display = "none"; // Ocultar
                    }
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }
}

// Carga la representaçion de catálogo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    Productos.renderCatalog('catalogo');
});

// Evento para selecionar la categoria y filtrar los productos
document.getElementById("categoria").addEventListener("change", (event) => {
    const categoriaSeleccionada = event.target.value;
    if (categoriaSeleccionada === "maxValor" || categoriaSeleccionada === "minValor") {
        Productos.renderCatalog('catalogo', "all", categoriaSeleccionada);
    } else {
        Productos.renderCatalog('catalogo', categoriaSeleccionada);
    }
});
