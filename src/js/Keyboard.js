import HTMLElement from "./HTMLElement";
import KeyboardButtons from "./KeyboardButtons";
import KeyboardEvents from "./KeyboardEvents";

export default class Keyboard {
  constructor() {
    const { ref: container } = new HTMLElement(
      document.body,
      "div",
      "container"
    );

    new HTMLElement(container, "h1", "title", "RSS Virtual Keyboard");
    new HTMLElement(container, "textarea", "textarea");
    const { ref: keyboard } = new HTMLElement(container, "div", "keyboard");

    new KeyboardButtons(keyboard);

    new HTMLElement(
      container,
      "p",
      "description",
      "Клавиатура создана в операционной системе Windows"
    );

    new HTMLElement(
      container,
      "p",
      "language",
      "Для переключения языка комбинация: левыe ctrl + alt"
    );

    new HTMLElement(container, "p", "lang", "eng");
    new KeyboardEvents();
  }
}
