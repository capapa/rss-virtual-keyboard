export default class HTMLElement {
  constructor(parent, tagName, className, innerHTML) {
    this.ref = document.createElement(tagName);
    this.ref.className = className;
    if (innerHTML) this.ref.innerHTML = innerHTML;
    parent.append(this.ref);
  }
}
