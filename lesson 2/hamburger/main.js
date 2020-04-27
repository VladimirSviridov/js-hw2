//Попытался пойти тем путем, что был предложен в методичке, но в итоге получилось реализовать как представлено ниже
//Создал класс Hamburger, который принимает при вызове начинки
//Размер определил двумя сопособами: по размеру булки и по цене булки
//Реализовал методы по нахождению цены, калорийности, начинок и топпингов
//Добавление начинок в данном случае не реализовывал - т.к. здесь они закладываются при создании гамбургера
//И я не уверен как и надо ли вообще в так случае реализовывать добавление и исключение ингредиентов,
//только если опросом пользователя покаждой позиции

class Hamburger {
    constructor(bread, ...args) {
        this.sizel = bread.name;
        this.size = this.getSize(bread.price);
        this.fullPrice = this.calculatePrice(bread, ...args);
        this.kalories = this.calculateCalories(bread, ...args);
        this.toppings = [];
        this.stuffings = [];
        this.getInners(...args);
    }

    getSize() {
        return this.price == 50 ? "little" : "big";
    }

    calculatePrice(...parts) {
        let costs = 0;
        parts.forEach(element => costs += element.price);
        return costs;
    }

    calculateCalories(...parts) {
        let kalorii = 0;
        parts.forEach(element => kalorii += element.kalories);
        return kalorii;
    }

    getInners(...elems) {
        for (let elem of elems)
            elem.necessary === true ? this.toppings.push(elem.name) : this.stuffings.push(elem.name);
    }
}

//Создал классы самих видов гамбургеров - большой и маленький
class HamburgerItem {
    constructor(name, price = 0, kalories = 0) {
        this.name = name;
        this.price = price;
        this.kalories = kalories;
    }
}

//Создал объекты гамбургера (экземпляры класса)
const little = new HamburgerItem("little",50,20);
const big = new HamburgerItem("big", 100,40);

//Классы ингредиентов
class InnerItem extends HamburgerItem {
    constructor(name, price = 0, kalories = 0, necessary = true) {
        super(name, price, kalories);
        this.necessary = necessary;
    }
}
//Обязательные
const cheese = new InnerItem("cheese",10, 20, true);
const salad = new InnerItem("salad",20, 5, true);
const potato = new InnerItem("potato",15, 10, true);

//Необязательные
const pepper = new InnerItem("pepper",15, 0, false);
const mazik = new InnerItem("mazik",20, 5, false);

//Создаем сам гамбургер путем передачи в класс всех его параметров
const hamburger = new Hamburger(big, salad, potato, cheese, mazik, pepper);

//Выводим в консоль гамбургер и его свойства
console.log(hamburger);
console.log(hamburger.size);
console.log(hamburger.fullPrice);
console.log(hamburger.kalories);
console.log(hamburger.toppings);
console.log(hamburger.stuffings);
