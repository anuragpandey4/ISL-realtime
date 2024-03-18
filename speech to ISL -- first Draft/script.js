window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
// recognition.interimResults = true;
recognition.continuous = true;

const mic = document.querySelector("#mic");
const signsContainer = document.querySelector("#signsContainer");
const previewButton = document.querySelector("#previewButton");

let wordsQueue = [];
let allWords = []; // This will store all the words
let silenceTimer;

function toggleMic() {
  signsContainer.innerHTML = " ";
  signsContainer.classList.toggle("green");
  if (mic.classList.contains("active")) {
    recognition.stop();
    mic.classList.remove("active");
    clearTimeout(silenceTimer); // Clear the silence timer
  } else {
    recognition.start();
    mic.classList.add("active");
    allWords = []; // Clear all the old words
  }
}

mic.addEventListener("click", toggleMic);

recognition.addEventListener("result", (e) => {
  // clearTimeout(silenceTimer);
  // silenceTimer = setTimeout(() => {
  //   recognition.stop();
  //   mic.classList.remove("active"); // Set mic to inactive state
  //   signsContainer.classList.toggle("green");
  // }, 5000); // Set a new silence timer

  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  if (e.results[0].isFinal) {
    const word = transcript.split(" ").pop().toLowerCase();
    wordsQueue.push(word);
    allWords.push(word); // Add the word to allWords

    if (wordsQueue.length > 3) {
      wordsQueue.shift();
    }

    signsContainer.innerHTML = ""; // Clear the container

    // Add each word's letter images to the container
    wordsQueue.forEach((word, index) => {
      const letters = word.split("");
      letters.forEach((letter) => {
        const img = document.createElement("img");
        img.src = `ISL images1/${letter}.jpg`;
        img.alt = `Sign Language Image for ${letter}`;
        img.style.width = "100px"; // Original size
        img.style.height = "100px"; // Original size
        signsContainer.appendChild(img);
      });

      // Add a space between words, but not after the last word
      if (index < wordsQueue.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        signsContainer.appendChild(space);
      }
    });
  }
});

previewButton.addEventListener("click", () => {
  // When the preview button is clicked
  signsContainer.innerHTML = ""; // Clear the container

  // Add each word's letter images to the container
  allWords.forEach((word, index) => {
    // Loop through allWords instead of wordsQueue
    const letters = word.split("");
    letters.forEach((letter) => {
      const img = document.createElement("img");
      img.src = `ISL images1/${letter}.jpg`;
      img.alt = `Sign Language Image for ${letter}`;
      img.style.width = "50px"; // Reduced size
      img.style.height = "50px"; // Reduced size
      signsContainer.appendChild(img);
    });

    // Add a space between words
    const space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    signsContainer.appendChild(space);
  });
});

window.addEventListener("keypress", function (event) {
  if (event.key === " ") {
    toggleMic();
  }
});

// space.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
