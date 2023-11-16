const formEl = document.getElementById("form-el");

document.addEventListener("DOMContentLoaded", getColorScheme);
formEl.addEventListener("submit", getColorScheme);

function getColorScheme(e) {
  e.preventDefault();

  const colorPickerValue = document.getElementById("color-picker").value;
  const newHexValue = colorPickerValue.replace("#", "");
  const colorTypeDropdown = document.getElementById("color-type-dropdown");
  const selectedOption =
    colorTypeDropdown.options[
      colorTypeDropdown.selectedIndex
    ].text.toLowerCase();

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${newHexValue}&format=json&mode=${selectedOption}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      let html = ``;
      for (color of data.colors) {
        html += `
        <div class="individual-color-holder">
            <div class="color-slot" data-swatch=${color.hex.value} style="background-color: ${color.hex.value}"></div>
            <div class="hex-color" data-hex=${color.hex.value}>${color.hex.value}</div>
        </div>
      `;
      }
      document.getElementById("colors-container").innerHTML = html;
      document.addEventListener("click", function (e) {
        for (color of data.colors) {
          copyTargetHex(e);
          showHexModal(e);
        }
      });
    });
}
function copyTargetHex(e) {
  if (e.target.dataset.hex === color.hex.value) {
    navigator.clipboard.writeText(color.hex.value);
    document.getElementById("hex-modal-container").classList.remove("hidden");
  } else if (e.target.dataset.swatch === color.hex.value) {
    navigator.clipboard.writeText(color.hex.value);
    document.getElementById("hex-modal-container").classList.remove("hidden");
  }
}
function showHexModal(e) {
  if (e.target.dataset.hex) {
    document.getElementById("copied-hex-modal").textContent =
      e.target.dataset.hex + " copied to your clipboard";
    setTimeout(function () {
      document.getElementById("hex-modal-container").classList.add("hidden");
    }, 3000);
  } else if (e.target.dataset.swatch) {
    document.getElementById("copied-hex-modal").textContent =
      e.target.dataset.swatch + " copied to your clipboard";
    setTimeout(function () {
      document.getElementById("hex-modal-container").classList.add("hidden");
    }, 3000);
  }
}
