const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog");
const modalImage = modal.querySelector(".modal-image");
const closeButton = modal.querySelector(".close-viewer");

// Open the larger image when a thumbnail button is clicked.
gallery.addEventListener("click", openModal);

function openModal(event) {
  const thumbnail = event.target.closest(".thumbnail");

  // Ignore clicks on empty gallery space.
  if (!thumbnail) {
    return;
  }

  const image = thumbnail.querySelector("img");

  modalImage.src = image.dataset.full;
  modalImage.alt = image.alt;

  modal.showModal();
  document.body.classList.add("modal-open");
}

// Close with the X button.
closeButton.addEventListener("click", () => {
  modal.close();
});

// Close when clicking the space outside the image.
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

// Runs after closing with X, an outside click, or Escape.
// Escape support is built into showModal().
modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});