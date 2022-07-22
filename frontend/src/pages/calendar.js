class CalendarPage {
  $target;
  constructor() {
    this.$target = document.createElement("main");
    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <div>CalendarPage</div>
    `;
  }
  getElement() {
    return this.$target;
  }
}

export default CalendarPage;
