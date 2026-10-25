// Convert letter grades into GPA points.
function convert(grade) {
  let points;

  switch (grade) {
    case "A":
      points = 4;
      break;
    case "B":
      points = 3;
      break;
    case "C":
      points = 2;
      break;
    case "D":
      points = 1;
      break;
    case "F":
      points = 0;
      break;
    default:
      throw new Error(`Invalid grade: ${grade}`);
  }

  return points;
}

const grades = ["A", "B", "A", "C"];

// .map(): Create an array of GPA points.
const gradePoints = grades.map(convert);
console.log("Grade points:", gradePoints);

// .forEach(): Display each grade and its points.
const gradeList = document.querySelector("#grade-list");

grades.forEach((grade, index) => {
  gradeList.innerHTML += `
    <li>${grade}: ${gradePoints[index]} points</li>
  `;
});

// .reduce(): Add the points and calculate the average.
const totalPoints = gradePoints.reduce((total, points) => {
  return total + points;
}, 0);

const gpa = totalPoints / grades.length;

document.querySelector("#gpa").textContent =
  `GPA: ${gpa.toFixed(2)}`;

console.log("GPA:", gpa);

// .filter(): Keep words with more than five letters.
const words = ["watermelon", "peach", "apple", "tomato", "grape"];

const longWords = words.filter((word) => word.length > 5);

document.querySelector("#word-list").innerHTML = longWords
  .map((word) => `<li>${word}</li>`)
  .join("");

console.log("Words with more than five letters:", longWords);

// Objects and template literals: Display student names.
const students = [
  { last: "Andrus", first: "Aaron" },
  { last: "Masa", first: "Manny" },
  { last: "Tanda", first: "Tamanda" }
];

document.querySelector("#student-list").innerHTML = students
  .map((student) => `<li>${student.last}, ${student.first}</li>`)
  .join("");

console.log("Students:", students);

// .indexOf(): Find the first position of a word.
const appleIndex = words.indexOf("apple");

document.querySelector("#word-index").textContent =
  `The index of "apple" is ${appleIndex}. Array indexes start at 0.`;

console.log("Index of apple:", appleIndex);