let dropdownData = {};

async function loadDropdownData() {
  const response = await fetch("dropdown_data.json");
  dropdownData = await response.json();

  populateBrandDropdown();
  populateSimpleDropdown(
    "condition",
    dropdownData.condition_options,
    "Condition",
  );
  populateSimpleDropdown(
    "transmission",
    dropdownData.transmission_options,
    "Transmission",
  );
  populateSimpleDropdown(
    "body_type",
    dropdownData.body_type_options,
    "Body Type",
  );
  populateSimpleDropdown(
    "fuel_type",
    dropdownData.fuel_type_options,
    "Fuel Type",
  );
}

function populateBrandDropdown() {
  const brandSelect = document.getElementById("brand");
  brandSelect.innerHTML =
    '<option value="" disabled selected>Select Brand</option>';

  Object.keys(dropdownData.brand_model_mapping).forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  updateModelDropdown();
}

function updateModelDropdown() {
  const brand = document.getElementById("brand").value;
  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML =
    '<option value="" disabled selected>Select Model</option>';

  if (!brand) return;

  const models = dropdownData.brand_model_mapping[brand] || [];

  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
}

function populateSimpleDropdown(id, options, label) {
  const select = document.getElementById(id);
  select.innerHTML = `<option value="" disabled selected>Select ${label}</option>`;

  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

document
  .getElementById("brand")
  .addEventListener("change", updateModelDropdown);

document
  .getElementById("prediction-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Predicting...";

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "";

    const yearInput = document.getElementById("year");
    const year = parseInt(yearInput.value);
    const engineCapacityInput = document.getElementById("engine_capacity");
    const engineCapacity = parseInt(engineCapacityInput.value);
    const mileageInput = document.getElementById("mileage");
    const mileage = parseInt(mileageInput.value);

    const currentYear = new Date().getFullYear();
    let errorMessage = "";

    if (Number.isNaN(year) || year < 1886 || year > currentYear) {
      errorMessage = `Year must be a 4-digit number between 1886 and ${currentYear}.`;
    } else if (Number.isNaN(engineCapacity) || engineCapacity < 0) {
      errorMessage = "Engine Capacity cannot be negative.";
    } else if (Number.isNaN(mileage) || mileage < 0) {
      errorMessage = "Mileage cannot be negative.";
    }

    if (errorMessage) {
      resultDiv.innerHTML = `<span style='color: var(--error-color)'>${errorMessage}</span>`;
      button.disabled = false;
      button.textContent = originalText;
      return;
    }

    const data = {
      brand: document.getElementById("brand").value,
      model: document.getElementById("model").value,
      year: year,
      condition: document.getElementById("condition").value,
      transmission: document.getElementById("transmission").value,
      body_type: document.getElementById("body_type").value,
      fuel_type: document.getElementById("fuel_type").value,
      engine_capacity: engineCapacity,
      mileage: mileage,
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      resultDiv.innerHTML =
        "Predicted Price: LKR " +
        Number(result.predicted_price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    } catch (error) {
      console.error("Error:", error);
      resultDiv.innerHTML =
        "<span style='color: var(--error-color)'>Error connecting to backend. Please try again.</span>";
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

loadDropdownData();
