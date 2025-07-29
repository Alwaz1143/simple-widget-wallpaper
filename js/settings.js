document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const darkModeCheckbox = document.querySelector(".popup-item:first-child input");
  const calendarCheckbox = document.querySelector(".popup-item:nth-child(2) input");
  const weatherCheckbox = document.querySelector(".popup-item:nth-child(3) input");
  const calendarElement = document.querySelector(".calendar");
  const weatherElement = document.querySelector(".weather-container");
  const gearIcon = document.querySelector(".settings i");
  const popup = document.querySelector(".settings-popup");
  const main = document.querySelector(".main");
  const changeBackground = document.querySelector("#change-background");
  const defaultBackground = document.querySelector("#default-background");
  const urlInput = document.querySelector("#bg-url-input");
  const fileInput = document.querySelector("#bg-file-input");

  // --- LocalStorage Utilities ---
  function savePreferences({ bgUrl, darkMode }) {
    if (bgUrl !== undefined) localStorage.setItem("bgUrl", bgUrl);
    if (darkMode !== undefined) localStorage.setItem("darkMode", darkMode ? "1" : "0");
  }
  function loadPreferences() {
    const darkModePref = localStorage.getItem("darkMode");
    return {
      bgUrl: localStorage.getItem("bgUrl"),
      darkMode: darkModePref === null ? true : darkModePref === "1"
    };
  }

  // --- Background Logic ---
  function setBg(
    url = "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ) {
    if (main) {
      main.style.backgroundImage = `url('${url}')`;
      savePreferences({ bgUrl: url });
    }
  }

  // --- Dark Mode Logic ---
  function setDarkMode(enabled) {
    if (darkModeCheckbox) darkModeCheckbox.checked = enabled;
    document.documentElement.style.setProperty("--text-color", enabled ? "white" : "black");
    if (urlInput) {
      urlInput.style.setProperty("background-color", enabled ? "rgb(44, 44, 44)" : "white");
    }
    savePreferences({ darkMode: enabled });
  }

  // --- Load Preferences on Start ---
  const prefs = loadPreferences();
  setBg(prefs.bgUrl || undefined);
  setDarkMode(prefs.darkMode);

  // --- Settings Popup Logic ---
  if (gearIcon && popup) {
    gearIcon.addEventListener("click", () => {
      popup.classList.toggle("show");
      gearIcon.classList.toggle("rotate");
    });
    document.addEventListener("click", (e) => {
      if (!document.querySelector(".settings").contains(e.target)) {
        popup.classList.remove("show");
        gearIcon.classList.remove("rotate");
      }
    });
  }

  // --- Calendar & Weather Toggles ---
  if (calendarCheckbox && calendarElement) {
    calendarCheckbox.checked = true;
    calendarElement.classList.remove("hidden");
    calendarCheckbox.addEventListener("change", () => {
      calendarElement.classList.toggle("hidden", !calendarCheckbox.checked);
    });
  }
  if (weatherCheckbox && weatherElement) {
    weatherCheckbox.checked = true;
    weatherElement.classList.remove("hidden");
    weatherCheckbox.addEventListener("change", () => {
      weatherElement.classList.toggle("hidden", !weatherCheckbox.checked);
    });
  }

  // --- Dark Mode Toggle ---
  if (darkModeCheckbox) {
    darkModeCheckbox.checked = prefs.darkMode;
    darkModeCheckbox.addEventListener("change", () => {
      setDarkMode(darkModeCheckbox.checked);
    });
  }

  // --- Background Change via URL ---
  if (changeBackground && urlInput) {
    changeBackground.addEventListener("click", () => {
      const url = urlInput.value;
      if (url) setBg(url);
    });
  }

  // --- Default Background Button ---
  if (defaultBackground) {
    defaultBackground.addEventListener("click", () => {
      setBg(); // uses default
    });
  }

  // --- File Input for Background ---
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          setBg(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        console.log("please select a valid image file");
      }
    });
  }
});
