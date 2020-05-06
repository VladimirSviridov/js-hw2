/**
 * Класс поля ввода, хранит в себе кнопку и себя, методы проверки
 */
class Inputarea {
  constructor(btn, area) {
    this.btn = btn;
    this.area = area;
    this.regex = {
      //Буквы русские и английские, начинающиеся с заглавной буквы
      name: /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/gi,
      //Телефонный номер в указанном формате
      phone: /(^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(\+[0-9]\([0-9]{3}\)[0-9]([-0-9]{3})?([0-9]{4})?)$)/gi,
      //Почта в указанном формате
      email: /^(?!.*\..*,.*\/.*\\-.*\+.*\\.*&.*\^.*%.*\$.*#.*@.*!.*&.*.*.*\(.*\).*$)([A-Z]|[a-z]|[А-Я]|[а-я]+)/gi,
      //Все что угодно, кроме определенных символов, таких так: .,/\ и прочие.
      //Не получилось сделать проверку на "непустоту" строки
      inputText: /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/gi,
    };
    //Сначала проверяем наполненность
    this._regExp();
  }

  //Метод присваивает input "красный" класс и выводит alert
  _makeRed() {
    alert(`${this.area.id} - пустая или содержит запрещенные символы!`);
    this.area.classList.add('red');
  };

  //Приветные методы, проверящие поля на соответствие регулярным выражениям,
  //если true, то вызывается "окрашивающий" метод
  _regExp() {
    for (let key in this.regex) {
      if (key === this.area.id) {
        const regex = this.regex[key];
        if (!regex.test(this.area.value)) {
          this._makeRed();
          break;
        }
      }
    }
  };
}

/**
 * Класс кнопки отправки, хранит в себе себя и свой id(т.к. хранит себя, id хранить, думаю, не обязательно)
 */
class Sender {
  constructor(container = ".button", id = 'send') {
    this.container = container;
    this.id = id;
    this._listener();
  }

  /**
   * Добавляю слушатель клика, создающий объекты класса поле ввода (Inputarea)
   * @private
   */
  _listener() {
    this.container.addEventListener('click', () => {
      event.preventDefault();
      let ids = document.querySelectorAll('input');
      ids.forEach(elem => new Inputarea(this.container, elem));
      let areas = document.querySelectorAll('textarea');
      areas.forEach(elem => new Inputarea(this.container, elem));
    });
  }
}

//Создаем кнопку соответствующего класса
const toSend = new Sender(document.getElementById('send'));

