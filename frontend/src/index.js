import "./styles/global.css";
import "./styles/reset.css";
import App from "./app";

window.addEventListener("DOMContentLoaded", () => {
  const $app = document.getElementById("app");

  new App({ $app });
});
