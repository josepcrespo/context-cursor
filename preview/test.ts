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

darkmodeBtn.addEventListener("click", (e) => {
  darkmodeBtn.getElementsByTagName("span")[0].textContent === strings.darkmode
    ? (darkmodeBtn.getElementsByTagName("span")[0].textContent =
        strings.lightmode)
    : (darkmodeBtn.getElementsByTagName("span")[0].textContent =
        strings.darkmode);
  document.body.classList.toggle("darkmode");
  moonIcon.classList.toggle("moon-icon_active");
});
