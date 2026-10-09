//Target the menu button and the navigation.
// Add a click event listener to the menu button
// When the event happens:
// Add and remove the hidden class from the nav
// Add and remove a class to change how the menu button looks
const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("hide");
  menuButton.classList.toggle("change");

  const isOpen = !navigation.classList.contains("hide");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});