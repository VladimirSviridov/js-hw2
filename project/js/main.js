const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

/**
 * Функция, создающая строчный литерал, содержащий параметры продаваемого объекта
 * Добавил в нее data атрибут и стандартные значения
 * @param title
 * @param price
 * @param id
 * @param img
 * @returns {string}
 */
const renderProduct = (title = "The thing", price = "100500", id = "0",
                       img = "https://placehold.it/150x150/333") => {
    return `<div class="product-item" data-id = "${id}">
            <div><img src="${img}" alt=""></div>
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="buy-btn">Добавить в корзину</button>
          </div>`;
};

//Придумал два схожих способа упрощения написания
//Применил деструктуризацию массива products
//Первый через цикл for
/*let productList = [];
const items = () => {
    for (let i = 0; i < products.length; i++){
        let {id, title, price} = products[i];
        productList += renderProduct(title, price, id);
    }
    document.querySelector('.products').innerHTML = productList;
};
items(products);*/

//Второй через метод forEach
let productList = '';
const renderProducts = (products) => {
    products.forEach(product => {
        let {id, title, price} = product;
        productList += renderProduct(title, price, id);
    });
    document.querySelector('.products').insertAdjacentHTML('afterbegin', productList);
};
renderProducts(products);

//Я так понял, в данных случаях "," не появляется, потому что у меня получилась строка
//а в методе map из лекции появляется "," т.к. получается массив
//Не понял надо ли оборачивать в функцию renderProducts и передавать в неё products - все работало и без этого.


/*const renderProducts = (list) => {
    const productList = list.map((good) => {
        return renderProduct(good.title, good.price, good.id);
    });
    document.querySelector('.products').innerHTML = productList;
};
renderProducts(products);*/
