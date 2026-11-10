const aCourse = {
  code: "CSE121b",
  name: "JavaScript Language",
  logo: "images/js-logo.png",
  sections: [
    {
      sectionNum: 1,
      roomNum: "STC 353",
      enrolled: 26,
      days: "TTh",
      instructor: "Bro T"
    },
    {
      sectionNum: 2,
      roomNum: "STC 347",
      enrolled: 28,
      days: "TTh",
      instructor: "Sis A"
    }
  ],

  enrollStudent(sectionNum) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum === sectionNum
    );

    if (sectionIndex === -1) {
      return false;
    }

    this.sections[sectionIndex].enrolled += 1;
    return true;
  }
};

function sectionTemplate(section) {
  return `
    <tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td>
    </tr>
  `;
}

function renderSections(sections) {
  document.querySelector("#sections").innerHTML =
    sections.map(sectionTemplate).join("");
}

document.querySelector("#courseName").textContent = aCourse.name;
document.querySelector("#courseCode").textContent = aCourse.code;
renderSections(aCourse.sections);

const sectionInput = document.querySelector("#sectionNumber");
const enrollmentStatus = document.querySelector("#enrollmentStatus");

document.querySelector("#enrollmentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const sectionNum = sectionInput.valueAsNumber;

  if (!aCourse.enrollStudent(sectionNum)) {
    enrollmentStatus.textContent = "Section not found. Enter 1 or 2.";
    return;
  }

  renderSections(aCourse.sections);
  enrollmentStatus.textContent = `Student enrolled in section ${sectionNum}.`;
});