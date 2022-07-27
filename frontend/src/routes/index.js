import { clear, setState } from "../core/store";
import { pathState } from "../store/eventState";

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
    const setPath = setState(pathState);
    clear();

    const potentialMatches = this.getPotentialMatches();

    const match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    setPath(match.route.path);

    if (!match) {
      const _404Page = potentialMatches.at(-1).route.view();

      return _404Page;
    }

    return new match.route.view();
  }
}
