document.addEventListener("DOMContentLoaded", () => {
  const authNavbar = document.getElementById("authActions");
  const isLoggedIn = localStorage.getItem("kinetic_auth") === "true";

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = loginForm.querySelectorAll("input");
      const username = inputs[0]?.value;
      const password = inputs[1]?.value;

      if (username === "admin" && password === "123") {
        localStorage.setItem("kinetic_auth", "true");

        if (authNavbar) {
          renderLoggedInState(authNavbar);
        }

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);
      } else {
        alert("Mật khẩu/tài khoản sai. Vui lòng nhập admin / 123");
      }
    });
  }

  if (authNavbar && isLoggedIn) {
    renderLoggedInState(authNavbar);
  }

  function renderLoggedInState(container) {
    container.innerHTML = `
<div class="relative group cursor-pointer">
    <div class="flex items-center gap-3 bg-surface-container-low/80 hover:bg-surface-container border border-outline-variant/30 hover:border-outline-variant/50 pl-1.5 pr-3 py-1.5 rounded-full transition-all backdrop-blur-md shadow-lg shadow-black/20">
        <div class="w-7 h-7 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
            <img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT87Q3gg3PAD9ipi-ueW2dfYhz1WrLnXywAm7TMbTu9B6nDkKUdNUaYHbPb5cVUalqg4-GVu3XHmx_7ohQTv1WvvwRQ7UXBCexuIr9ofvBYYYtWP72puZgUqxSTQ1NmkJgDaG9GeBh4LhyD11vpLLecKYFcKtnPqEgJgnOLM_JbsemDUFqTbqgnM7RrvitrbDEStX0401W_057zq1R3_kKxWE4qF5GOIqxNwF4isGYrTH4q4Tk1gGcrTDclMtcemMkWArGAIsPe4I" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col">
            <span class="text-[10px] font-bold font-headline text-on-surface leading-none mb-0.5" style="letter-spacing: -0.02em;">Admin</span>
            <span class="text-[8px] font-label text-primary-container uppercase tracking-widest leading-none">Pro User</span>
        </div>
        <div class="w-px h-6 bg-outline-variant/30 mx-1"></div>
        <button id="logoutBtn" class="text-on-surface-variant hover:text-error flex items-center transition-colors px-1" title="Log Out">
            <span class="material-symbols-outlined text-[18px]">logout</span>
        </button>
    </div>
</div>
        `;
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        localStorage.removeItem("kinetic_auth");
        window.location.reload();
      });
    }
  }
});
