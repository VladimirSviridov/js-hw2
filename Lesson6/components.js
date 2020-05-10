Vue.component('component-one', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias animi delectus ducimus ex in laudantium, nam qui sunt temporibus veritatis vitae. Aliquam eaque et ipsam nemo odit similique voluptate!</div>`
});
Vue.component('component-two', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto at aut blanditiis culpa cum dignissimos doloribus eaque, esse hic incidunt laboriosam mollitia nihil, placeat quae qui quidem ut!</div></div>`
});
Vue.component('component-three', {
    template: `<div>Lorem ipsum dolor sit amet, ptate!</div>`
});

const testComp = {
    name: 'test-comp',
    template: `<p>test</p>`,
};

const childElement = {
    name: 'child-element',
    props: ['newTitle'],
    components: {
        testComp,
    },
    template: `<div>
                    <p>{{ newTitle }}</p>
                    <test-comp></test-comp>
               </div>`,
    mounted() {
        console.log(this.newTitle);
    },
};

Vue.component('some-el', {
    props: ['title', 'counter'],
    components: {
        childElement,
    },
    data() {
      return {
          myName: 'Name',
          localCounter: this.counter,
      };
    },
    methods: {
        // increase() {
        //     this.localCounter++;
        // },
    },
    mounted() {
        console.log(this.counter);
    },
    template: `<div>Hello! I'm VueComponent!
                    <div>{{ title }}</div>
                    <child-element :newTitle="title" />
                    <button @click="$emit('click')">Increase</button>
                    <div>{{ counter }}</div>
<!--                    <slot/>-->
                    <slot>
                        <p>Default</p>
                    </slot> 
               </div>`,
});
