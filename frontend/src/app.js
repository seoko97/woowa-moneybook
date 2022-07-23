import HistoryPage from "./pages/history";
import AnalyticsPage from "./pages/analytics";
import CalendarPage from "./pages/calendar";

import Header from "./components/Header";

import { createCustomEvent } from "./utils/customEventHandler";
import Router from "./routes";

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
      { path: "/404", view: HistoryPage },
    ];

    this.router = new Router({ routes });
    this.render();
    this.setEvent();
  }
  render() {
    this.$app.innerHTML = ``;

    const $Page = this.router.getView();
    const $Header = new Header();

    this.$app.append($Header);
    this.$app.append($Page);
  }
}

export default App;
