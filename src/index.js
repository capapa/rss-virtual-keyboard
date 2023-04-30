import dataKeys from "./dataKeys";
import keyboardEvents from "./keyboardEvents";

const getNewElement = (parent, tagName, className, innerHTML) => {
  const element = document.createElement(tagName);
  element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  parent.append(element);
  return element;
};

const getNewContainer = (parent) => {
  const container = getNewElement(parent, "div", "container");
  const title = getNewElement(container, "h1", "title", "RSS Virtual Keyboard");
  const textarea = getNewElement(container, "textarea", "textarea");
  const keyboard = getNewElement(container, "div", "keyboard");

  getNewElement(
    container,
    "p",
    "description",
    "Клавиатура создана в операционной системе Windows"
  );

  getNewElement(
    container,
    "p",
    "language",
    "Для переключения языка комбинация: левыe ctrl + alt"
  );

  // language
  const lang = getNewElement(container, "p", "lang", "eng");
  lang.dataset.lang = "eng";

  textarea.setAttribute("autofocus", "");
};

getNewContainer(document.body);
keyboardEvents();
