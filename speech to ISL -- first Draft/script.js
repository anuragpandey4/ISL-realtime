window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

const mic = document.querySelector("#mic");
const signsContainer = document.querySelector("#signsContainer");

mic.addEventListener("click", () => {
  signsContainer.classList.toggle("green");
  if (mic.classList.contains("active")) {
    recognition.stop();
    mic.classList.remove("active");
  } else {
    recognition.start();
    mic.classList.add("active");
  }
});

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  if (e.results[0].isFinal) {
    const word = transcript.split(" ").pop().toLowerCase();
    const letters = word.split("");
    const signsContainer = document.querySelector("#signsContainer");

    // Clear the container
    signsContainer.innerHTML = "";

    // Add each letter image to the container
    letters.forEach((letter) => {
      const img = document.createElement("img");
      img.src = `ISL images/${letter}.png`;
      img.alt = `Sign Language Image for ${letter}`;
      img.style.width = "200px";
      img.style.height = "200px";
      signsContainer.appendChild(img);
    });

    // Set a default alt attribute for the images
    const images = document.querySelectorAll("#signsContainer img");
    images.forEach((img) => {
      if (!img.alt) {
        img.alt = "Sign Language Image";
      }
    });
  }
});
