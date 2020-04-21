const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = "https://placehold.it/100x100") => {
    return `<div class="product-item">
            <div><img src="${img}" alt=""></div>
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((good) => {
        return renderProduct(good.title, good.price);
    });
    console.log(productList);
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
