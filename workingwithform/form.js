const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const needsNotes = travelRange.value === "many";

  notesContainer.hidden = !needsNotes;
  notes.required = needsNotes;
  notes.disabled = !needsNotes;
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

// Reject today and earlier dates using local calendar dates.
function isPastDate(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = value.split("-").map(Number);
  const chosen = new Date(year, month - 1, day);

  return Number.isNaN(chosen.getTime()) || chosen <= today;
}

function getSelectedCampuses() {
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.elements.firstName.value.trim();
  const lastName = form.elements.lastName.value.trim();
  const email = form.elements.email.value.trim();
  const type = travelRange.value;
  const availableDate = form.elements.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = notes.value.trim();

  if (!firstName || !lastName || !email) {
    output.textContent =
      "Please enter your first name, last name, and email.";
    return;
  }

  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus.";
    return;
  }

  if (type === "many" && !note) {
    output.textContent = "Please add travel notes.";
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "Please select at least two campuses.";
    return;
  }

  if (type === "one" && selectedCampuses.length !== 1) {
    output.textContent = "Please select exactly one campus.";
    return;
  }

  if (!availableDate || isPastDate(availableDate)) {
    output.textContent = "Please choose a date after today.";
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Preference Submitted";
  output.append(heading);

  const details = [
    `${firstName} ${lastName}`,
    `Email: ${email}`,
    `Availability: ${availableDate}`,
    `Campuses: ${selectedCampuses.join(", ")}`,
    `Preference Level: ${
      type === "many" ? "Two or more campuses" : "One campus"
    }`
  ];

  if (type === "many") {
    details.push(`Travel Notes: ${note}`);
  }

  details.forEach(detail => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    output.append(paragraph);
  });

  form.reset();
  updateNotesField();
});