import DecoEmpty from "../components/DecoEmpty";
import Component from "../core/component";
import { createElement, h } from "../utils/domHandler";

class _404Page extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  render() {
    this.$target = createElement(
      h(
        "main",
        { class: "main error" },
        h(
          "div",
          { class: "template" },
          new DecoEmpty({ title: "오마이갓", description: "존재하지 않는 페이지입니다." }),
          h("a", { href: "/" }, "메인 페이지로 이동하기")
        )
      )
    );
  }
}

export default _404Page;
