import "./scss/styles.scss";
import contextCursor from "../contextCursor";

// Init context cursor (updated API)
contextCursor.init();

// Darkmode
const darkmodeBtn = document.getElementById("darkmode-button");
const moonIcon = document.getElementById("moon-icon");

const strings = {
  darkmode: "Dark Mode",
  lightmode: "Light Mode",
};

if (darkmodeBtn && moonIcon) {
  darkmodeBtn.addEventListener("click", (e) => {
    const span = darkmodeBtn.getElementsByTagName("span")[0];
    if (span.textContent === strings.darkmode) {
      span.textContent = strings.lightmode;
    } else {
      span.textContent = strings.darkmode;
    }
    document.body.classList.toggle("darkmode");
    moonIcon.classList.toggle("moon-icon_active");
  });
}
