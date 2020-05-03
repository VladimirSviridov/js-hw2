/**
 * Класс поля ввода, хранит в себе кнопку и себя, методы проверки
 */
class Inputarea {
  constructor(btn, area) {
    this.btn = btn;
    this.area = area;
    //Сначала проверяем наполненность
    this._isFull();
  }
  //Метод присваивает input "красный" класс и выводит alert
  _makeRed(){
    alert(`${this.area.id} - пустая или содержит запрещенные символы!`);
    this.area.classList.add('red');
  };
  //Приветные методы, проверящие поля на соответствие регулярным выражениям,
  //если true, то вызывается "окрашивающий" метод
  _regExpName(){
    //Буквы русские и английские, начинающиеся с заглавной буквы
    const regex = /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/gi;
    if (!regex.test(this.area.value)){
      this._makeRed();
    }
  };
  _regExpPhone(){
    //Телефонный номер в указанном формате
    const regex = /(^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(\+[0-9]\([0-9]{3}\)[0-9]([-0-9]{3})?([0-9]{4})?)$)/gi;
    if (!regex.test(this.area.value)){
      this._makeRed();
    }
  };
  _regExpMail(){
    //Почта в указанном формате
    const regex = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/gi;
    if (!regex.test(this.area.value)){
      this._makeRed();
    }
  };
  _regExpArea(){
    //Все что угодно, кроме определенных символов, таких так: .,/\ и прочие.
    //Не получилось сделать проверку на "непустоту" строки
    const regex = /^(?!.*\..*,.*\/.*\\-.*\+.*\\.*&.*\^.*%.*\$.*#.*@.*!.*&.*.*.*\(.*\).*$)([A-Z]|[a-z]|[А-Я]|[а-я]+)/gi;
    if (!regex.test(this.area.value)){
      this._makeRed();
    }
  };

  /**
   * Переключатель, в зависимости от id пришедшего поля вызывает соответствующий приветный метод
   * @private
   */
  _switcher(){
    switch (this.area.id) {
      case 'name':
        this._regExpName(this);
        break;
      case 'phone':
        this._regExpPhone(this);
        break;
      case 'email':
        this._regExpMail(this);
        break;
      case 'inputText':
        this._regExpArea(this);
        break;
    }
  };

  /**
   * Метод вызывает переключатель
   * @private
   */
  _isFull(){
    this._switcher();
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
      let inputName = (document.getElementById('name'));
      let Name = new Inputarea(this.container, inputName);
      let inputPhone = (document.getElementById('phone'));
      let Phone = new Inputarea(this.container, inputPhone);
      let inputEmail = (document.getElementById('email'));
      let Email = new Inputarea(this.container, inputEmail);
      let inputText = (document.getElementById('inputText'));
      let Text = new Inputarea(this.container, inputText);
    });
  }
}
//Создаем кнопку соответствующего класса
const toSend = new Sender(document.getElementById('send'));

