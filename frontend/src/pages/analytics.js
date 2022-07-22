class AnalyticsPage {
  $target;
  constructor() {
    this.$target = document.createElement("main");
    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <div>AnalyticsPage</div>
    `;
  }
  getElement() {
    return this.$target;
  }
}

export default AnalyticsPage;
