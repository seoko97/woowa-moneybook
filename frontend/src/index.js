import App from "./app";
import "./styles/global.css";
import "./styles/reset.css";

window.addEventListener("load", () => {
  const $app = document.getElementById("app");
  new App({ $app });
});
