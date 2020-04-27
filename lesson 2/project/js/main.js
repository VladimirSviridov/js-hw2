class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this.fullprice = 0;
    this._fetchProducts();
    this._render();
    this._cost();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ]
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }


  //Метод считающий цену одной единицы каждого вида товара,
  //в т.ч. которые были бы получены с сервера.
  _cost(){
    for (let product of this.allProducts) {
      this.fullprice += +product.price;
    }
    console.log(this.fullprice);
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();

//Класс корзины, содержащий в себе контейнер, привязанный к кнопке корзины
//Свойством будет - лист покупок, методами - отрисовка элементов, подсчет стоимости, удаление товара из корзины
//Класс похож по структуре на класс ProductList
class Basket {
  constructor(container = '.btn-cart') {
    this.container = container;
    this.listOfBuing = [];
    this._renderBasket();
    this._costBasket();
    this._removeFromBasket();
  }
  _renderBasket(){
    //Должен быть слушатель событий на кнопке "купить", при нажатии на который
    //должен формироваться массив listOfBuing и в корзину вставляться отрендеренный элемент
    //с базовой информацией о товаре и кропкой удаления.
  };
  _costBasket(){
    //Метод считает стоимость всех товаров в корзине и выводит её в соответствующее поле в корзине
  };
  _removeFromBasket(){
    //Метод назначает слушатель событий на кнопку удаления товара из корзины при нажатии на который
    //происходит удаление соответствующего элемента.
  };
}

//Класс элемента корзины, содержащий те жа свойства элемента, как и ProductItem,
//который будет рендерить каждый элемент в корзине
//Структурно класс очень похож на класс ProductItem
class BasketItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  renderItem(){
    //Метод будет возвращать разметку для элемента корзины, в т.ч. кнопку удаления
  }
}


