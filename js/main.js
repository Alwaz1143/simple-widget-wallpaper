window.addEventListener("error", function () {
  console.log("reloading page due to error...");
  setTimeout(() => {
    location.reload();
  }, 1 * 60 * 1000);
});
window.addEventListener("unhandledrejection", function () {
  console.log("reloading page due to unhandled rejection...");
  setTimeout(() => {
    location.reload();
  }, 1 * 60 * 1000);
});

import "./settings.js";
import "./quotesLogic.js";
import "./clockLogic.js";
import "./calendarLogic.js";
import "./weatherLogic.js";
import "./date.js";
