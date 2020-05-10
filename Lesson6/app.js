// Vuex
const app = new Vue({
    el: '#app',
    data: {
        counter: 0,
        someString: `Hi! I'm title!`,
        tabs: ['one', 'two', 'three'],
        currentTab: 'one',
    },
    methods: {
        increase() {
            this.counter++;
        },
    },
    computed: {
        currentComponent() {
          return `component-${this.currentTab}`;
        },
    },
    mounted() {
        console.log(this);
    },
});
