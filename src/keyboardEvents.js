import dataKeys from "./dataKeys";

class KeyboardEvents {
  constructor() {
    const container = document.querySelector(".container");
    this.langElem = container.querySelector(".lang");
    this.textarea = container.querySelector(".textarea");
    this.capslook = container.querySelector(".CapsLock");
    const keyboard = container.querySelector(".keyboard");
    this.rows = keyboard.querySelectorAll(".row");

    this.params = {
      lang: "eng",
      caps: false,
      shift: false,
    };

    keyboard.addEventListener("mousedown", (e) => {
      const button = e.target;
      if (button.tagName === "BUTTON") {
        this.kmDown(button);
      }
    });

    keyboard.addEventListener("mouseup", (e) => {
      const button = e.target;
      if (button.textContent !== "CapsLock") {
        this.togglePressed(button, false);
        if (button.textContent === "Shift") {
          this.params.shift = false;
          this.clickShift();
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      const button = this.getElementByClassName(e.code);
      if (button) {
        e.preventDefault();
        if (e.altKey && e.ctrlKey) {
          this.changeLang();
        }
        this.kmDown(button);
      }
    });

    document.addEventListener("keyup", (e) => {
      const button = this.getElementByClassName(e.code);
      if (button) {
        if (e.key !== "CapsLock") {
          this.togglePressed(button, false);
        }
      }

      if (e.key === "Shift") {
        this.params.shift = false;
        this.clickShift();
      }
    });

    this.params.lang = this.getLocalStorage();
    this.setLang();
  }

  setLocalStorage = () => {
    localStorage.setItem("lang", this.params.lang);
  };

  getLocalStorage = () => {
    if (localStorage.getItem("lang") === "rus") {
      return "rus";
    } else {
      return "eng";
    }
  };

  changeLang = () => {
    const { lang } = this.params;
    if (lang === "eng") {
      this.params.lang = "rus";
    } else {
      this.params.lang = "eng";
    }
    this.setLang();
  };

  setLang = () => {
    const { lang } = this.params;
    this.langElem.textContent = lang;
    this.setKeys();
    this.setLocalStorage();
  };

  setKeys = () => {
    const { lang, caps, shift } = this.params;
    const shiftCaps = caps && shift;
    let char;
    for (let i = 0; i < dataKeys.length; i++) {
      for (let j = 0; j < dataKeys[i].length; j++) {
        const dataKey = dataKeys[i][j][lang];
        if (shiftCaps && dataKey.shiftCaps) {
          char = dataKey.shiftCaps;
        } else if (caps && dataKey.caps) {
          char = dataKey.caps;
        } else if (!shiftCaps && (shift || caps)) {
          char = dataKey.caseUp;
        } else {
          char = dataKey.caseDown;
        }

        // set text key button
        this.rows[i].children[j].textContent = char;
      }
    }
  };

  setText = (addText) => {
    const textarea = this.textarea;
    let text = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start !== end || end < text.length) {
      text = text.slice(0, start) + addText + text.slice(end);
    } else {
      text += addText;
    }
    textarea.value = text;
    textarea.setSelectionRange(start + addText.length, start + addText.length);
  };

  togglePressed = (button, pressed) => {
    const className = "pressed";
    if (button) {
      if (pressed) {
        if (!button.classList.contains(className)) {
          button.classList.add(className);
        }
      } else {
        if (button.classList.contains(className)) {
          button.classList.remove(className);
        }
      }
    }
  };

  getElementByClassName = (className) => {
    const selector = "." + className;
    return document.querySelector(selector);
  };

  clickCaps = () => {
    const capslook = this.capslook;
    if (capslook.classList.contains("pressed")) {
      capslook.classList.remove("pressed");
      this.params.caps = false;
    } else {
      capslook.classList.add("pressed");
      this.params.caps = true;
    }
    this.setKeys();
  };

  clickShift = () => {
    this.setKeys();
  };

  clickTab = () => {
    this.setText("    ");
  };

  clickEnter = () => {
    this.setText("\n");
  };

  deleteRangeText = () => {
    const textarea = this.textarea;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let text = textarea.value;
    if (start !== end) {
      text = text.slice(0, start) + text.slice(end);
      textarea.value = text;
      textarea.setSelectionRange(start, start);
      return true;
    }
    return false;
  };

  clickBackspace = () => {
    if (!this.deleteRangeText()) {
      const textarea = this.textarea;
      const start = textarea.selectionStart - 1;
      if (start < 0) return;
      let text = textarea.value;
      textarea.value = text.slice(0, start) + text.slice(start + 1);
      textarea.setSelectionRange(start, start);
    }
  };

  clickDelete = () => {
    if (!this.deleteRangeText()) {
      const textarea = this.textarea;
      const start = textarea.selectionStart;
      let text = textarea.value;
      if (start > text.length) return;
      textarea.value = text.slice(0, start) + text.slice(start + 1);
      textarea.setSelectionRange(start, start);
    }
  };

  kmDown = (button) => {
    const key = button.textContent;
    if (key === "CapsLock") {
      this.clickCaps();
    } else {
      this.togglePressed(button, true);

      if (["Alt", "Ctrl"].includes(key)) {
      } else if (key === "Win") {
      } else if (key === "Shift") {
        this.params.shift = true;
        this.clickShift();
      } else if (key === "Tab") {
        this.clickTab();
      } else if (key === "Backspace") {
        this.clickBackspace();
      } else if (key === "Del") {
        this.clickDelete();
      } else if (key === "Enter") {
        this.clickEnter();
      } else if (key) {
        this.setText(key);
      }
    }

    this.textarea.focus();
  };
}
export default KeyboardEvents;
