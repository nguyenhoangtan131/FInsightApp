document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".view-filter-btn");

  if (buttons.length > 0) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        buttons.forEach((b) => {
          b.classList.remove("bg-primary-container", "text-on-primary");
          b.classList.add("text-on-surface-variant", "hover:text-on-surface");
        });

        this.classList.remove(
          "text-on-surface-variant",
          "hover:text-on-surface",
        );
        this.classList.add("bg-primary-container", "text-on-primary");

        const viewType = this.dataset.view;

        if (window.updateSunburst) {
          window.updateSunburst(viewType);
        }
      });
    });
  }
});
