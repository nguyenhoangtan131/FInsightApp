let chart;
let currentMode = "von";

const dataVon = [
  {
    name: "Tài chính",
    value: 450,
    valueOld: 440,
    itemStyle: { color: "#00F5FF" },
    children: [
      { name: "Ngân hàng", value: 360, valueOld: 350, depth: 2 },
      { name: "Chứng khoán", value: 70, valueOld: 72, depth: 2 },
      { name: "TC Plus (+)", value: 20, valueOld: 18, depth: 2 },
    ],
  },
  {
    name: "Bất động sản",
    value: 200,
    valueOld: 210,
    itemStyle: { color: "#B9CACA" },
    children: [
      { name: "BĐS Nhà ở", value: 160, valueOld: 165, depth: 2 },
      { name: "BĐS Khu CN", value: 30, valueOld: 35, depth: 2 },
      { name: "RE Etc.", value: 10, valueOld: 10, depth: 2 },
    ],
  },
  {
    name: "Công nghiệp",
    value: 190,
    valueOld: 185,
    itemStyle: { color: "#262A31" },
    children: [
      { name: "Sản xuất", value: 110, valueOld: 105, depth: 2 },
      { name: "Thép", value: 60, valueOld: 58, depth: 2 },
      { name: "Indu Etc.", value: 20, valueOld: 22, depth: 2 },
    ],
  },
  {
    name: "Tiêu dùng",
    value: 170,
    valueOld: 175,
    itemStyle: { color: "#181C22" },
    children: [
      { name: "Thực phẩm", value: 80, valueOld: 82, depth: 2 },
      { name: "Năng lượng", value: 60, valueOld: 58, depth: 2 },
      { name: "Consu (+)", value: 30, valueOld: 35, depth: 2 },
    ],
  },
];

const dataGiaTri = [
  {
    name: "Tài chính",
    value: 520,
    valueOld: 450,
    itemStyle: { color: "#00F5FF" },
    children: [
      { name: "Ngân hàng", value: 410, valueOld: 360, depth: 2 },
      { name: "Chứng khoán", value: 85, valueOld: 70, depth: 2 },
      { name: "TC Plus (+)", value: 25, valueOld: 20, depth: 2 },
    ],
  },
  {
    name: "Bất động sản",
    value: 180,
    valueOld: 200,
    itemStyle: { color: "#B9CACA" },
    children: [
      { name: "BĐS Nhà ở", value: 140, valueOld: 160, depth: 2 },
      { name: "BĐS Khu CN", value: 25, valueOld: 30, depth: 2 },
      { name: "RE Etc.", value: 15, valueOld: 10, depth: 2 },
    ],
  },
  {
    name: "Công nghiệp",
    value: 230,
    valueOld: 190,
    itemStyle: { color: "#262A31" },
    children: [
      { name: "Sản xuất", value: 135, valueOld: 110, depth: 2 },
      { name: "Thép", value: 75, valueOld: 60, depth: 2 },
      { name: "Indu Etc.", value: 20, valueOld: 20, depth: 2 },
    ],
  },
  {
    name: "Tiêu dùng",
    value: 195,
    valueOld: 170,
    itemStyle: { color: "#181C22" },
    children: [
      { name: "Thực phẩm", value: 95, valueOld: 80, depth: 2 },
      { name: "Năng lượng", value: 70, valueOld: 60, depth: 2 },
      { name: "Consu (+)", value: 30, valueOld: 30, depth: 2 },
    ],
  },
];

function tooltipFormatter(params) {
  if (!params.treePathInfo[0]) return "";

  const totalMarket = params.treePathInfo[0].value;
  const currentVal = params.value;
  const yesterdayVal = params.data.valueOld || currentVal;
  const parent = params.treePathInfo[1];

  const change = ((currentVal - yesterdayVal) / yesterdayVal) * 100;
  const changeColor = change >= 0 ? "#00F5FF" : "#FF4D4D";
  const percentVN30 = ((currentVal / totalMarket) * 100).toFixed(2);

  const formatNum = (num) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const isVon = currentMode === "von";
  const ctxTitle = isVon ? "THỐNG KÊ NGUỒN VỐN" : "PHÂN TÍCH GIÁ TRỊ";
  const labelCurrent = isVon ? "Vốn hiện tại:" : "Giá trị hiện tại:";
  const labelYesterday = isVon ? "Vốn hôm qua:" : "Giá trị hôm qua:";
  const labelChange = isVon ? "Biến động vốn:" : "Biến động giá trị:";
  const labelRatioVN30 = isVon
    ? "Tỉ trọng vốn / VN30:"
    : "Tỉ trọng giá trị / VN30:";
  const labelRatioParent = isVon
    ? `Tỉ trọng vốn / ${parent?.name}:`
    : `Tỉ trọng giá trị / ${parent?.name}:`;

  let res = `
    <div style="min-width: 250px;">
      <div style="color: #B9CACA; font-size: 11px; margin-bottom: 2px;">${ctxTitle}</div>
      <div style="color: #00F5FF; font-weight: 800; font-size: 15px; text-transform: uppercase; margin-bottom: 8px; border-bottom: 1px dotted rgba(0,245,255,0.3); padding-bottom: 5px;">
        ${params.name}
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: #B9CACA;">${labelCurrent}</span>
        <b style="color: #fff; font-family: 'JetBrains Mono', monospace;">${formatNum(currentVal)} Tỷ</b>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: #B9CACA;">${labelYesterday}</span>
        <b style="color: #B9CACA; font-family: 'JetBrains Mono', monospace;">${formatNum(yesterdayVal)} Tỷ</b>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span style="color: #B9CACA;">${labelChange}</span>
        <b style="color: ${changeColor};">
          ${change >= 0 ? "▲" : "▼"} ${Math.abs(change).toFixed(2)}%
        </b>
      </div>

      <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px;">
        <span style="color: #B9CACA;">${labelRatioVN30}</span>
        <b style="color: #00F5FF;">${percentVN30}%</b>
      </div>
  `;

  if (params.data.depth === 2 && parent) {
    const ratio = ((currentVal / parent.value) * 100).toFixed(2);
    res += `
      <div style="display: flex; justify-content: space-between; margin-top: 3px;">
        <span style="color: #B9CACA;">${labelRatioParent}</span>
        <b style="color: #fff;">${ratio}%</b>
      </div>`;
  }

  res += `</div>`;
  return res;
}

document.addEventListener("DOMContentLoaded", function () {
  chart = echarts.init(document.getElementById("sunburstChart"));
  updateSunburst("von");

  chart.on("click", function (params) {
    if (!params || !params.data) return;

    const defaultDOM = document.getElementById("default-panel");
    const actionDOM = document.getElementById("action-panel");
    const nameDOM = document.getElementById("selected-sector-name");
    const valDOM = document.getElementById("selected-sector-value");
    const changeDOM = document.getElementById("selected-sector-change");

    if (defaultDOM && actionDOM && nameDOM && valDOM && changeDOM) {
      defaultDOM.classList.add("hidden");
      defaultDOM.classList.remove("flex");

      actionDOM.classList.remove("hidden");

      nameDOM.textContent = params.name;

      const currentVal = params.value;
      const yesterdayVal = params.data.valueOld || currentVal;
      const change = ((currentVal - yesterdayVal) / yesterdayVal) * 100;

      valDOM.textContent = currentVal.toLocaleString("en-US") + " Tỷ";

      if (change >= 0) {
        changeDOM.textContent = "+" + change.toFixed(2) + "%";
        changeDOM.className =
          "font-headline text-[13px] font-bold text-[#00F5FF] tracking-tight";
      } else {
        changeDOM.textContent = change.toFixed(2) + "%";
        changeDOM.className =
          "font-headline text-[13px] font-bold text-[#FF4D4D] tracking-tight";
      }
    }
  });
});

function updateSunburst(mode) {
  currentMode = mode;
  const data = mode === "von" ? dataVon : dataGiaTri;

  chart.setOption({
    backgroundColor: "#181C22",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(24, 28, 34, 0.95)",
      borderColor: "#00F5FF",
      borderWidth: 1,
      padding: [12, 15],
      textStyle: { color: "#DFE2EB", fontFamily: "Inter" },
      formatter: tooltipFormatter,
    },
    series: {
      type: "sunburst",
      radius: ["15%", "95%"],
      data: data,
      emphasis: { focus: "ancestor" },
      label: {
        rotate: "radial",
        color: "#fff",
        fontSize: 10,
        fontWeight: 600,
      },
      itemStyle: {
        borderColor: "#10141A",
        borderWidth: 2,
        borderRadius: 4,
      },
    },
  });
}

window.updateSunburst = updateSunburst;
