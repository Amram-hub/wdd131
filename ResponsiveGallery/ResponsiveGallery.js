const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog");
const modalImage = modal.querySelector("img");
const closeButton = modal.querySelector(".close-viewer");

let activePreview = null;

gallery.addEventListener("click", (event) => {
  const thumbnail = event.target.closest(".thumbnail");
  const image = thumbnail
    ? thumbnail.querySelector("img")
    : event.target.closest("img");

  if (!image || !gallery.contains(image)) {
    return;
  }

  // Show the thumbnail immediately.
  activePreview = null;
  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt;

  if (!modal.open) {
    modal.showModal();
  }

  document.body.classList.add("modal-open");

  // Replace it with the larger picture if available.
  const fullImagePath = image.dataset.full;

  if (fullImagePath) {
    const preview = new Image();
    activePreview = preview;

    preview.onload = () => {
      if (modal.open && activePreview === preview) {
        modalImage.src = preview.src;
      }
    };

    preview.src = fullImagePath;
  }
});

closeButton.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

// Escape closes the dialog automatically.
modal.addEventListener("close", () => {
  activePreview = null;
  document.body.classList.remove("modal-open");
});