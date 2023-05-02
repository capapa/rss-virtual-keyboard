import dataKeys from "./dataKeys";
import KeyboardEvents from "./keyboardEvents";
import "./style.scss";

class Keyboard {
  getNewElement = (parent, tagName, className, innerHTML) => {
    const element = document.createElement(tagName);
    element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    parent.append(element);
    return element;
  };

  constructor() {
    const container = this.getNewElement(document.body, "div", "container");
    const title = this.getNewElement(
      container,
      "h1",
      "title",
      "RSS Virtual Keyboard"
    );
    const textarea = this.getNewElement(container, "textarea", "textarea");
    const keyboard = this.getNewElement(container, "div", "keyboard");

    // create keys
    dataKeys.forEach((rowDataKeys) => {
      const divRow = this.getNewElement(keyboard, "div", "row");
      rowDataKeys.forEach((keyData) => {
        const item = this.getNewElement(
          divRow,
          "button",
          "key " + keyData.className,
          keyData.eng.caseDown
        );
      });
    });

    this.getNewElement(
      container,
      "p",
      "description",
      "Клавиатура создана в операционной системе Windows"
    );

    this.getNewElement(
      container,
      "p",
      "language",
      "Для переключения языка комбинация: левыe ctrl + alt"
    );

    // language
    const lang = this.getNewElement(container, "p", "lang", "eng");
    lang.dataset.lang = "eng";

    textarea.setAttribute("autofocus", "");

    new KeyboardEvents();
  }
}
new Keyboard();
