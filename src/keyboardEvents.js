function keyboardEvents() {
  const container = document.querySelector(".container");
  const langElem = container.querySelector(".lang");
  const textarea = container.querySelector(".textarea");
  const capslook = container.querySelector(".CapsLock");
  const keyboard = container.querySelector(".keyboard");
  const rows = keyboard.querySelectorAll(".row");

  let lang = langElem.dataset.lang;
  let caps = false;

  const changeLang = () => {
    if (lang === "eng") {
      lang = "rus";
    } else {
      lang = "eng";
    }
    langElem.dataset.lang = lang;
    langElem.textContent = lang;
  };

  const setText = (addText) => {
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

  const togglePressed = (button, pressed) => {
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

  const getElementByClassName = (className) => {
    const selector = "." + className;
    return document.querySelector(selector);
  };

  const clickCaps = () => {
    console.log("caps", caps, capslook);
    if (capslook.classList.contains("pressed")) {
      capslook.classList.remove("pressed");
      caps = false;
    } else {
      capslook.classList.add("pressed");
      caps = true;
    }
  };

  const clickShift = () => {};

  const clickTab = () => {
    setText("    ");
  };

  const clickEnter = () => {
    setText("\n");
  };

  const deleteRangeText = () => {
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

  const clickBackspace = () => {
    if (!deleteRangeText()) {
      const start = textarea.selectionStart - 1;
      if (start < 0) return;
      let text = textarea.value;
      textarea.value = text.slice(0, start) + text.slice(start + 1);
      textarea.setSelectionRange(start, start);
    }
  };

  const clickDelete = () => {
    if (!deleteRangeText()) {
      const start = textarea.selectionStart;
      let text = textarea.value;
      if (start > text.length) return;
      textarea.value = text.slice(0, start) + text.slice(start + 1);
      textarea.setSelectionRange(start, start);
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.ctrlKey) {
      changeLang();
    } else {
      const button = getElementByClassName(e.code);
      if (button) {
        e.preventDefault();

        const key = button.textContent;
        if (["Alt", "Ctrl"].includes(key)) {
        } else if (key === "Shift") {
          shift = true;
          clickShift();
        } else if (key === "CapsLock") {
          clickCaps();
        } else if (key === "Tab") {
          clickTab();
        } else if (key === "Backspace") {
          clickBackspace();
        } else if (key === "Delete") {
          clickDelete();
        } else if (key === "Enter") {
          clickEnter();
        } else if (key) {
          setText(key);
        }
      }
    }

    textarea.focus();
  });
}

export default keyboardEvents;
