const elem = document.getElementById("element");
const code = document.getElementById("code");
const sliders = document.querySelectorAll(".sliders input");
const insetCheckbox = document.getElementById("shadow-inset");

sliders.forEach((slider) => slider.addEventListener("input", generateShadow));
insetCheckbox.addEventListener("change", generateShadow);

function generateShadow() {
  const [hShadow, vShadow, blurRadius, spreadRadius, color, opacity, inset] = getShadowParams();
  const boxShadow = createBoxShadow(hShadow, vShadow, blurRadius, spreadRadius, color, opacity, inset);
  applyShadow(elem, boxShadow);
  updateCode(boxShadow);
}

function getShadowParams() {
  const hShadow = parseInt(document.getElementById("h-shadow").value);
  const vShadow = parseInt(document.getElementById("v-shadow").value);
  const blurRadius = parseInt(document.getElementById("blur-radius").value);
  const spreadRadius = parseInt(document.getElementById("spread-radius").value);
  const color = document.getElementById("shadow-color").value;
  const opacity = parseFloat(document.getElementById("shadow-color-opacity").value).toFixed(1);
  const inset = document.getElementById("shadow-inset").checked;

  return [hShadow, vShadow, blurRadius, spreadRadius, color, opacity, inset];
}

function createBoxShadow(hShadow, vShadow, blurRadius, spreadRadius, color, opacity, inset) {
  const shadowType = inset ? "inset" : "";
  const rgbaColor = hexToRgba(color, opacity);
  return `${shadowType} ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
}

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function applyShadow(element, boxShadow) {
  element.style.boxShadow = boxShadow;
}

function updateCode(text) {
  code.textContent = `box-shadow: ${text};`;
}

function copyCode() {
  navigator.clipboard.writeText(code.textContent)
    .then(() => alert("Code Copied to Clipboard"));
}

window.onload = generateShadow;