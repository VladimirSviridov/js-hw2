const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    errorAPI: '',
    userSearch: '',
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
          //Вызываем у компоненты метод
          this.errorAPI.errorMeth(error);
          //Прерываем дальнейшее выполнение кода

        })
    },
  },
  mounted() {
    console.log(this);
    //Получаем ссылку на компонент ошибки
    this.errorAPI = this.$refs.errorComp;
  }
});

