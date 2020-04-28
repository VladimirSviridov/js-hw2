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
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
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
}
new ProductList();

//Классы корзины


window.addEventListener('load', () => {
  window.addEventListener('click', () => {
    if (event.target.className.includes("buy-btn")) {
      this.btn = event.target;
      new BasketList(btn);
    }
  });
  //Классы корзины
  class BasketList {
    constructor(btn) {
      this.btn = btn;
      this.listOfBuing = [];
      this.basketProducts = [];
      //this._renderBasket();
      this._costBasket();
      this._removeFromBasket();
      this._fetchProducts();
      fetch(`${API}/addToBasket.json`)
        .then(response => response.json())
        .then(data => this._renderBasket(data))
          //const block = document.getElementById('ajax-block');
          //block.insertAdjacentHTML('beforeend', `<p>${data.name} - <strong>${data.tel}</strong></p>`);
        .catch(error => console.log(error));
    }
    _fetchProducts() {
      getRequest(`${API}/catalogData.json`, (data) => {
        this.listOfBuing = [...data];
        this._render();
      });
    }
    //Остановился на подключении метода _render
    _render() {
      const block = document.querySelector(this.btn);

      for (let product of this.listOfBuing) {
        if (btn.parentNode.parentNode.dataset !== product){
          break;
        } else {
          const productObject = new ProductItem(product);
          this.basketProducts.push(productObject);
          block.insertAdjacentHTML('beforeend', productObject.render());
        }

      }
    }

    _renderBasket(data){
      //Должен быть слушатель событий на кнопке "купить", при нажатии на который
      //должен формироваться массив listOfBuing и в корзину вставляться отрендеренный элемент
      //с базовой информацией о товаре и кропкой удаления.
      this.id = btn.parentNode.parentNode.dataset;
      this.listOfBuing.push()
      //this.listOfBuing.push(data);
      //console.log(this.listOfBuing);
    };
    _costBasket(){
      //Метод считает стоимость всех товаров в корзине и выводит её в соответствующее поле в корзине
    };
    _removeFromBasket(){
      //Метод назначает слушатель событий на кнопку удаления товара из корзины при нажатии на который
      //происходит удаление соответствующего элемента.
    };
  }
});

  //document.getElementsByClassName('buy-btn').onclick = () => alert("ghbdtn");


