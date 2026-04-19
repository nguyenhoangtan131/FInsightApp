document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-view-option");

  buttons[0].classList.add("active");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      buttons.forEach((b) => b.classList.remove("active"));

      this.classList.add("active");

      const viewType = this.dataset.view;

      if (window.updateSunburst) {
        window.updateSunburst(viewType);
      }
    });
  });
});
