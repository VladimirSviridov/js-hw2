Vue.component('error', {
  data() {
    return {
      errorEl: '',
      showEr: false,
    }
  },
  methods: {
    //В методе вызывает присовение пришедней ошибки контейнеру
    errorMeth(error) {
      this.showEr = true;
      this.errorEl = error;
      console.log(this.errorEl);
    }
  },
  mounted() {
  },
  template:
  //Выводим ошибку. Но у меня всегда одна и та же ошибка: SyntaxError: Unexpected token : in JSON at position 3
    `<div >
        <p v-show="showEr">Не удается связаться с сервером. Ошибка {{ errorEl }}</p>
    </div>`
});

