// Menu controls
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// Image modal controls
const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".image-modal");
const modalImage = document.querySelector(".modal-image");
const closeButton = document.querySelector(".close-modal");

function openImage(image) {
  modalImage.src = image.dataset.full || image.src;
  modalImage.alt = image.alt;

  modal.showModal();
  document.body.classList.add("modal-open");
}

// Open a photo when clicked.
gallery.addEventListener("click", (event) => {
  if (event.target.matches("img")) {
    openImage(event.target);
  }
});

// Allow keyboard users to open photos.
gallery.querySelectorAll("img").forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Enlarge: ${image.alt}`);

  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openImage(image);
    }
  });
});

// Close with the X button.
closeButton.addEventListener("click", () => {
  modal.close();
});

// Close when clicking outside the image.
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

// Esc closes the native dialog automatically.
modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

// Reset the mobile menu when the screen size changes.
const largeScreen = window.matchMedia("(min-width: 1000px)");

largeScreen.addEventListener("change", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
});