import HistoryPage from "./pages/history";
import AnalyticsPage from "./pages/analytics";
import CalendarPage from "./pages/calendar";

import Header from "./components/Header";

import { createCustomEvent } from "./utils/customEvent";
import Router from "./routes";

class App {
  $app;
  router;
  constructor({ $app }) {
    this.$app = $app;
    this.init();

    createCustomEvent("locationChange", window, this.render.bind(this));
    window.addEventListener("popstate", this.render.bind(this));
  }

  init() {
    const routes = [
      { path: "/", view: HistoryPage },
      { path: "/calendar", view: CalendarPage },
      { path: "/analytics", view: AnalyticsPage },
      { path: "/404", view: HistoryPage },
    ];

    this.router = new Router({ routes });
    this.render();
  }
  render() {
    const $page = this.router.getView();
    const $header = new Header();

    this.$app.innerHTML = ``;
    this.$app.appendChild($header.getElement());
    this.$app.appendChild($page.getElement());
  }
}

export default App;
