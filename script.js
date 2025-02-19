document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    const productContainer = document.querySelector(".products");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceSort = document.getElementById("priceSort");
    let products = [];

    function fetchProducts() {
        loader.style.display = "block";
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                products = data;
                displayProducts(products);
                populateCategories(data);
                loader.style.display = "none";
            });
    }

    function displayProducts(items) {
        productContainer.innerHTML = "";
        items.forEach(product => {
            productContainer.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.price} $</p>
                </div>
            `;
        });
    }

    function populateCategories(data) {
        const categories = [...new Set(data.map(p => p.category))];
        categories.forEach(cat => {
            categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }

    searchInput.addEventListener("input", () => {
        const filtered = products.filter(p => p.title.toLowerCase().includes(searchInput.value.toLowerCase()));
        displayProducts(filtered);
    });

    categoryFilter.addEventListener("change", () => {
        const filtered = categoryFilter.value ? products.filter(p => p.category === categoryFilter.value) : products;
        displayProducts(filtered);
    });

    priceSort.addEventListener("change", () => {
        let sorted = [...products];
        if (priceSort.value === "asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (priceSort.value === "desc") {
            sorted.sort((a, b) => b.price - a.price);
        }
        displayProducts(sorted);
    });

    fetchProducts();
});