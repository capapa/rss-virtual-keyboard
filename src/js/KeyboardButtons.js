import HTMLElement from "./HTMLElement";
import dataKeys from "./dataKeys";

export default class KeyboardButtons {
  constructor(keyboard) {
    dataKeys.forEach((rowDataKeys) => {
      const { ref: divRow } = new HTMLElement(keyboard, "div", "row");
      rowDataKeys.forEach((keyData) => {
        new HTMLElement(
          divRow,
          "button",
          "key " + keyData.className,
          keyData.eng.caseDown
        );
      });
    });
  }
}
