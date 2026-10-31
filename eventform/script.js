const form = document.querySelector("#ticketForm");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const typeInput = document.querySelector("#type");
const dateInput = document.querySelector("#eventDate");

const extraField = document.querySelector("#extraField");
const credentialInput = document.querySelector("#credential");
const credentialLabel = document.querySelector("#credentialLabel");
const credentialHint = document.querySelector("#credentialHint");

const errorsOutput = document.querySelector("#errors");
const ticketOutput = document.querySelector("#ticket");

function updateMinimumDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;
}

function updateExtraField() {
  const isStudent = typeInput.value === "student";
  const isGuest = typeInput.value === "guest";

  extraField.hidden = !isStudent && !isGuest;
  credentialInput.disabled = !isStudent && !isGuest;
  credentialInput.value = "";
  credentialInput.removeAttribute("aria-invalid");

  if (isStudent) {
    credentialLabel.textContent = "Student I#";
    credentialHint.textContent = "Enter your 9-digit student I number.";
    credentialInput.placeholder = "123456789";
    credentialInput.inputMode = "numeric";
    credentialInput.pattern = "[0-9]{9}";
    credentialInput.minLength = 9;
    credentialInput.maxLength = 9;
    credentialInput.title = "Enter exactly 9 digits.";
  } else if (isGuest) {
    credentialLabel.textContent = "Access Code";
    credentialHint.textContent = "Enter the event code EVENT131.";
    credentialInput.placeholder = "EVENT131";
    credentialInput.inputMode = "text";
    credentialInput.pattern = "EVENT131";
    credentialInput.minLength = 8;
    credentialInput.maxLength = 8;
    credentialInput.title = "Enter EVENT131 exactly.";
  }
}

typeInput.addEventListener("change", updateExtraField);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  updateMinimumDate();
  errorsOutput.replaceChildren();
  ticketOutput.replaceChildren();
  ticketOutput.hidden = true;

  form.querySelectorAll("[aria-invalid]").forEach(input => {
    input.removeAttribute("aria-invalid");
  });

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const type = typeInput.value;
  const date = dateInput.value;
  const credential = credentialInput.value.trim();

  emailInput.value = email;

  const errors = [];
  let firstInvalidInput = null;

  function addError(input, message) {
    errors.push(message);
    input.setAttribute("aria-invalid", "true");

    if (!firstInvalidInput) {
      firstInvalidInput = input;
    }
  }

  if (!firstName) {
    addError(firstNameInput, "Please enter your first name.");
  }

  if (!lastName) {
    addError(lastNameInput, "Please enter your last name.");
  }

  if (!email || !emailInput.validity.valid) {
    addError(emailInput, "Please enter a valid email address.");
  }

  if (type !== "student" && type !== "guest") {
    addError(typeInput, "Please choose Student or Guest.");
  }

  if (!date || date < dateInput.min) {
    addError(dateInput, "Please choose an event date after today.");
  }

  if (type === "student" && !/^[0-9]{9}$/.test(credential)) {
    addError(
      credentialInput,
      "Student I# must contain exactly 9 digits."
    );
  }

  if (type === "guest" && credential !== "EVENT131") {
    addError(
      credentialInput,
      "The access code must be EVENT131."
    );
  }

  if (errors.length > 0) {
    const list = document.createElement("ul");

    errors.forEach(message => {
      const item = document.createElement("li");
      item.textContent = message;
      list.append(item);
    });

    errorsOutput.append(list);
    firstInvalidInput.focus();
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Event Ticket";
  ticketOutput.append(heading);

  const details = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Type: ${type === "student" ? "Student" : "Guest"}`,
    `Event Date: ${date}`,
    "Your registration was successful. Bring this ticket to the event."
  ];

  details.forEach(detail => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    ticketOutput.append(paragraph);
  });

  ticketOutput.hidden = false;

  form.reset();
  updateExtraField();
});

updateMinimumDate();
updateExtraField();c