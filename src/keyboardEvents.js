import dataKeys from "./dataKeys";

function keyboardEvents() {
  const container = document.querySelector(".container");
  const langElem = container.querySelector(".lang");
  const textarea = container.querySelector(".textarea");
  const capslook = container.querySelector(".CapsLock");
  const keyboard = container.querySelector(".keyboard");
  const rows = keyboard.querySelectorAll(".row");

  let lang = langElem.dataset.lang;
  let caps = false;
  let shift = false;

  const changeLang = () => {
    if (lang === "eng") {
      lang = "rus";
    } else {
      lang = "eng";
    }
    langElem.dataset.lang = lang;
    langElem.textContent = lang;
    setKeys(lang, caps, shift);
  };

  const setKeys = (lang = "eng", caps = false, shift = false) => {
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
        rows[i].children[j].textContent = char;
      }
    }
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
    setKeys(lang, caps, shift);
  };

  const clickShift = () => {
    setKeys(lang, caps, shift);
  };

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

  const kmDown = (button) => {
    const key = button.textContent;
    if (key === "CapsLock") {
      clickCaps();
    } else {
      togglePressed(button, true);

      if (key === "Shift") {
        shift = true;
        clickShift();
      } else if (key === "Win") {
      } else if (key === "Tab") {
        clickTab();
      } else if (key === "Backspace") {
        clickBackspace();
      } else if (key === "Del") {
        clickDelete();
      } else if (key === "Enter") {
        clickEnter();
      } else if (!["Alt", "Ctrl"].includes(key)) {
        setText(key);
      }
    }

    textarea.focus();
  };

  keyboard.addEventListener("mousedown", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
      kmDown(button);
    }
  });

  keyboard.addEventListener("mouseup", (e) => {
    const button = e.target;
    if (button.textContent !== "CapsLock") {
      togglePressed(button, false);
      if (button.textContent === "Shift") {
        shift = false;
        clickShift();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    const button = getElementByClassName(e.code);
    if (button) {
      e.preventDefault();
      const key = button.textContent;
      if (key === "CapsLock") {
        clickCaps();
      } else {
        togglePressed(button, true);

        if (["Alt", "Ctrl"].includes(key)) {
          if (e.altKey && e.ctrlKey) {
            changeLang();
          }
        } else if (key === "Win") {
        } else if (key === "Shift") {
          shift = true;
          clickShift();
        } else if (key === "CapsLock") {
          clickCaps();
        } else if (key === "Tab") {
          clickTab();
        } else if (key === "Backspace") {
          clickBackspace();
        } else if (key === "Del") {
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

  document.addEventListener("keyup", (e) => {
    const button = getElementByClassName(e.code);
    if (button) {
      if (e.key !== "CapsLock") {
        togglePressed(button, false);
      }
    }

    if (e.key === "Shift") {
      shift = false;
      clickShift();
    }
  });

  setKeys();
}

export default keyboardEvents;
