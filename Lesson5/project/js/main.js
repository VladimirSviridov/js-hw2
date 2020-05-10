const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
      catalogUrl: '/catalogData.json',
      products: [],
      imgCatalog: 'https://placehold.it/200x150',
      productCart: [],
      search: '',
      isVisible: false,
    },
    methods: {
      getJson(url) {
        return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
      },
      createProduct(element) {
        let productEl = {
          id_product: element.id_product,
          price: element.price,
          product_name: element.product_name,
          quantity: 1
        };
        this.productCart.push(productEl);
      },
      addProduct(product) {
        this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if (data.result === 1) {
              let find = this.productCart.find(item => item.id_product === product.id_product);
              if (find) {
                find.quantity++;
              } else {
                this.createProduct(product)
              }
            }
          })
      },
      //Уменьшаем количество
      removeProduct(product) {
        this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if (data.result === 1) {
              let find = this.productCart.find(item => item.id_product === product.id_product);
              if (find.quantity > 1) {
                find.quantity--;
              } else {
                this.deleteProduct(product)
              }
            }
          })
      },
      //Удаляем элемент
      deleteProduct(item) {
        let id = this.productCart.indexOf(item);
        this.productCart.splice(id, 1)
      }
    },
    computed: {
      classObject: function () {
        return {
          invisible: !this.isVisible,
        }
      },
      //Возвращает классы для заглушки
      emptyCart: function () {
        return {
          visible: this.productCart.length === 0,
          invisible: this.productCart.length > 0,
        }
      },
      //В фильтре мы меняем свойство, отражающее виимость
      filter() {
        if (this.search === '') {
          this.products.forEach(el => {
            el.visibility = 'visible';
          })
        } else {
          const regexp = new RegExp(this.search, 'i');
          let filtered = this.products.filter(product => regexp.test(product.product_name));
          console.log(filtered);
          this.products.forEach(el => {
            if (!filtered.includes(el)) {
              el.visibility = 'invisible';
            } else {
              el.visibility = 'visible';
            }
          })
        }
      },
    },
    mounted() {
      this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for (let el of data) {
            //Доавляем специальное свойство, показывающее класс видимости
            el.visibility = 'visible';
            this.products.push(el);
          }
        });
    }
  }
  )
;
