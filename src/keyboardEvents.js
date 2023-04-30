function keyboardEvents() {
  const container = document.querySelector(".container");
  const langElem = container.querySelector(".lang");
  const textarea = container.querySelector(".textarea");
  const capslook = container.querySelector(".CapsLock");

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

  const clickTab = () => {};

  const clickEnter = () => {};

  const clickBackspace = () => {
    const start = textarea.selectionStart - 1;
    if (start < 0) return;
    let text = textarea.value;
    textarea.value = text.slice(0, start) + text.slice(start + 1);
    textarea.setSelectionRange(start, start);
  };

  const clickDelete = () => {
    const start = textarea.selectionStart;
    let text = textarea.value;
    if (start > text.length) return;
    textarea.value = text.slice(0, start) + text.slice(start + 1);
    textarea.setSelectionRange(start, start);
  };

  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.ctrlKey) {
      changeLang();
    } else {
      const button = getElementByClassName(e.code);
      if (button) {
        e.preventDefault();

        const key = button.textContent;
        if (key === "Shift") {
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
        }
      }
    }

    textarea.focus();
  });
}

export default keyboardEvents;
