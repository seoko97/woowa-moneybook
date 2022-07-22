export default class Component {
  $target;
  constructor(tagname) {
    this.$target = document.createElement(tagname);
  }

  setEvent() {}

  addEvent(eventType, selector, cb) {
    const childen = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => childen.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (e) => {
      if (isTarget(e.target)) cb(e);
    });
  }

  render() {}

  getElement() {
    return this.$target;
  }
}
