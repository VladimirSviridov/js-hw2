Vue.component('filter-el', {
  data() {
    return {
      products: [],
      //Отфильтрованные элементы
      filtered: [],
      userSearch: "",
    }
  },
  methods: {
    //Получаем элементы и наполняем отфильтрованне элементы
    pusherOfEl(el){
      this.products.push(el);
      this.filtered.push(el);
      //Наполняем дубликат, чтобы можно было вывести элементы
      this.$root.$refs.products.filteredInFilter(el);
    },
    //Фильтруем. Почему то (this.userSearch, 'i') пересталло корректно воспринимать запрос,
    //пришлось писать ччерез el.target[0].value;
    filter(el) {
      this.userSearch = el.target[0].value;
      //Если запрос пустой, то наполняем отфильтрованные всеми продуктами
      if (this.userSearch === ''){
        this.filtered = this.products;
      } else {
        //Фильтруем
        let regexp = new RegExp(this.userSearch, 'i');
        this.filtered = this.products.filter(el => regexp.test(el.product_name));
        console.log(this.filtered);
      }
      //Передаем в продукты отфильтрованные, предварительно очищая
      this.$root.$refs.products.cleanFiltered();
      this.filtered.forEach(el=>this.$root.$refs.products.filteredInFilter(el));
    },
  },
  mounted() {
  },
  template:
    `<div>
        <form action="#" class="search-form" @submit.prevent="filter">
          <input type="text" class="search-field" v-model="userSearch">
          <button class="btn-search" type="submit">
              <i class="fas fa-search"></i>
          </button>
        </form>
      </div>`
});
