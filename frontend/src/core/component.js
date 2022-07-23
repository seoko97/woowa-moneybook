export default class Component {
  constructor() {}

  setEvent() {}

  addEvent(eventType, selector, cb) {
    const childen = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => childen.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (e) => {
      if (isTarget(e.target)) cb(e);
    });
  }

  render() {}

  reRender($newTarget) {
    const $parentNode = this.$target.parentNode;
    $parentNode.replaceChild($newTarget, this.$target);
    this.$target = $newTarget;
    this.setEvent();
  }

  getElement() {
    return this.$target;
  }
}
