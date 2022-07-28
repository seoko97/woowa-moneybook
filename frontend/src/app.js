import HistoryPage from "./pages/history";
import AnalyticsPage from "./pages/analytics";
import CalendarPage from "./pages/calendar";

import Header from "./components/Header";

import { createCustomEvent } from "./utils/customEventHandler";
import Router from "./routes";
import Modal from "./components/Modal";
import _404Page from "./pages/_error";

class App {
  $app;
  router;
  constructor({ $app }) {
    this.$app = $app;
    this.init();
  }

  setEvent() {
    createCustomEvent("locationChange", window, this.render.bind(this));
    window.addEventListener("popstate", this.render.bind(this));
  }

  init() {
    const routes = [
      { path: "/", view: HistoryPage },
      { path: "/calendar", view: CalendarPage },
      { path: "/analytics", view: AnalyticsPage },
      { path: "/404", view: _404Page },
    ];

    this.router = new Router({ routes });
    this.render();
    this.setEvent();
  }
  render() {
    this.$app.innerHTML = ``;

    const $Page = this.router.getView();
    const $Header = new Header();
    const $Modal = new Modal();

    this.$app.append($Header);
    this.$app.append($Page);
    this.$app.append($Modal);
  }
}

export default App;
