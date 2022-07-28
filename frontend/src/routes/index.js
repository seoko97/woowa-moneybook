import { clear } from "../core/store";

export default class Router {
  #routes;
  constructor({ routes }) {
    this.#routes = routes;
  }

  getPotentialMatches() {
    return this.#routes.map((route) => {
      return {
        route,
        isMatch: location.pathname === route.path,
      };
    });
  }

  getView() {
    clear();

    const potentialMatches = this.getPotentialMatches();

    const match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    if (!match) {
      const _404Page = potentialMatches.at(-1).route.view;

      return new _404Page();
    }

    return new match.route.view();
  }
}
