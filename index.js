const formEl = document.getElementById("form-el");
const colorPickerValue = document.getElementById("color-picker").value;
const newHexValue = colorPickerValue.replace("#", "");
const colorTypeDropdown = document.getElementById("color-type-dropdown");
const selectedOption =
  colorTypeDropdown.options[colorTypeDropdown.selectedIndex].text.toLowerCase();

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
            <div class="color-slot" style="background-color: ${color.hex.value}"></div>
            <div class="hex-color">${color.hex.value}</div>
        </div>
      `;
      }
      document.getElementById("colors-container").innerHTML = html;
    });
}
