const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//Если я все правильно понял, то в предыдущей реализации
//при отсутствии ошибок колбэк функция возвращала строку с результатами при помощи метода .responseText
//Судя по примеру _getProducts() при передачи url, ведущего к json-файлу нам надо его преобрафомать в объект
//при помощи .then(response => response.json()), иначе ошибка. Получившиеся данные
//переаем колбэк функции
//Получается, что _fetchProducts и getRequest делают тоже самое, что делал метод _getProducts()
let getRequest = (url, cb) => {
  fetch(url)
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
};
// Переделать в ДЗ
/*let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};*/

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    //this._getProducts()
    //    .then(data => {
    //      this.goods = [...data];
    //      this._render();
    //    });
  }

  //Передаем url, колбэк функция получает данные в виде объекта, помещает их в массив и вызывает метод _render
  _fetchProducts() {
    getRequest(`${API}/catalogData.json`, (data) => {
      this.goods = [...data];
      this._render();
    });
  }

  /*
    _getProducts() {
      return fetch(`${API}/catalogData.json`)
          .then(response => response.json())
          .catch(error => {
            console.log(error);
          });
    }*/

  //Метод считающий сумму всех товаров, пришедших с сервера
  calcSum() {
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, data = 0, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
    this.counting = data;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
  renderBasket() {
    return `<div class="basket__item" id="${this.id_product}" >
                <img src="${this.img}" alt="Some img">
                <div data-id="${this.price}" class="basket__item-desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                </div>
                <p class="basket__item-counting">${this.counting}</p>
                <i data-id="${this.id_product}" class="basket__close fas fa-times-circle"></i>
            </div>`;
  }
}

new ProductList();

//Классы корзины
let basketProducts = {};
let removeFromBasket = (data, btn) =>{
  let elemToDelete = document.getElementById(btn.dataset.id);
  if (elemToDelete.children[2].textContent === data.result.toString()){
    //Цену уменьшать соответственно приходится также
    let container = document.getElementById("sumPrice");
    let fullPrice = +container.innerText- +elemToDelete.children[2].textContent*+elemToDelete.children[1].dataset.id;
    container.innerText = null;
    container.textContent += +fullPrice;
    elemToDelete.remove();
  }
};
window.addEventListener('load', () => {
  window.addEventListener('click', () => {
    if (event.target.className.includes("buy-btn")) {
      this.btn = event.target;
      new BasketList(btn, basketProducts);
    }
    if (event.target.className.includes("basket__close")){
      this.exitBtn = event.target;
      fetch(`${API}/deleteFromBasket.json`)
        .then(response => response.json())
        .then(data => removeFromBasket(data, this.exitBtn))
        .catch(error => console.log(error));
    }
  });

  //Классы корзины
  class BasketList {
    constructor(btn, basketProducts) {
      this.btn = btn;
      this.listOfBuing = [];
      this.basketProducts = basketProducts;
      this._fetchProducts();
      fetch(`${API}/addToBasket.json`)
        .then(response => response.json())
        .then(data => this._renderBasket(data, basketProducts))
        .catch(error => console.log(error));
    }
    _fetchProducts() {
      getRequest(`${API}/catalogData.json`, (data) => {
        this.listOfBuing = [...data];
      });
    }

    _renderBasket(data, basketProducts) {
      const block = document.getElementById('cart');
      this.id = btn.parentNode.parentNode.dataset;
      for (let product of this.listOfBuing) {
        if (btn.parentNode.parentNode.dataset.id !== product.id_product.toString()) {
        } else {
          const productObject = new ProductItem(product, +data.result);
          block.insertAdjacentHTML('beforeend', productObject.renderBasket());
          //Не получается наполнить корзину, Не нашел способа поместить текущий объект в объект,
          //хронящий все покупки (basketProducts). Я его специально поместил на верхнем уровне видимости,
          //чтобы он не перетирался, но это не помногло.
          basketProducts = Object.assign(basketProducts, productObject);
          this.basketProducts ={...basketProducts, ...productObject};
          //basketProducts = {...basketProducts, ...productObject};
          this._costBasket(this.basketProducts);
        }
      }
    };
        //Согласно вышеизложенному, полную стоимость считаю для единственного объекта, хранящегося в массиве,
        //Стоимость остальных товаров считываю с экрана
        _costBasket(){
          let container = document.getElementById("sumPrice");
          let fullPrice = this.basketProducts.price*this.basketProducts.counting + +container.textContent;
          container.innerText = null;
          container.textContent += +fullPrice;
        };
  }
});


