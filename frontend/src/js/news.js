const sectorSubsectors = {
  finance: [
    { title: "Ngân hàng", anchor: "VCB" },
    { title: "Chứng khoán", anchor: "SSI" },
    { title: "Bảo hiểm & Quỹ đầu tư", anchor: "BVH" },
  ],
  production: [
    { title: "Công nghiệp nặng & Vật liệu (Thép)", anchor: "HPG" },
    { title: "Năng lượng & Dầu khí", anchor: "GAS" },
    { title: "Công nghệ & Viễn thông", anchor: "FPT" },
  ],
  realestate: [
    { title: "Bất động sản Dân dụng", anchor: "VHM" },
    { title: "BĐS Khu công nghiệp", anchor: "BCM" },
    { title: "Xây dựng & Hạ tầng", anchor: "VCG" },
  ],
  consumption: [
    { title: "Bán lẻ & Chuỗi siêu thị", anchor: "MWG" },
    { title: "Thực phẩm & Đồ uống (F&B)", anchor: "MSN" },
    { title: "Nông nghiệp & Thủy sản", anchor: "VNM" },
  ],
};

function updateHashtags(sectorKey) {
  ["finance", "production", "realestate", "consumption"].forEach(
    (key) => {
      const cardEl = document.getElementById(`sector-card-${key}`);
      const titleEl = cardEl.querySelector("h3");
      if (key === sectorKey) {
        cardEl.classList.add("ring-2", "ring-cyan-400");
        titleEl.classList.replace("text-on-surface", "text-cyan-400");
      } else {
        cardEl.classList.remove("ring-2", "ring-cyan-400");
        titleEl.classList.replace("text-cyan-400", "text-on-surface");
      }
    },
  );

  const container = document.getElementById("hashtag-container");
  const items = sectorSubsectors[sectorKey];
  let html = "";
  items.forEach((item, index) => {
    const btnClass =
      index === 0
        ? "px-5 py-2 rounded-full bg-primary-container text-on-primary font-bold text-xs tracking-wide hover:shadow-[0_0_12px_rgba(0,245,255,0.4)] transition-all duration-200"
        : "px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-cyan-400 border border-outline-variant/20 font-medium text-xs tracking-wide transition-all duration-200";
    html += `<button class="${btnClass}">#${item.title} (${item.anchor})</button>`;
  });

  container.style.opacity = 0;
  setTimeout(() => {
    container.innerHTML = html;
    container.style.opacity = 1;
  }, 150);
}

window.addEventListener("DOMContentLoaded", () => {});
