const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((result) => displayLessons(result.data));
};

const loadLevelWords = (id) => {
  const wordContainer = document.getElementById("word-container");
  manageSpinner(true);
  if (!id) {
    wordContainer.innerHTML = `<div class="col-span-3 text-center">
          <p class="font-bangla text-xl text-[#79716B] my-4">
            আপনি এখনো কোন Lesson Select করেন নি
          </p>
          <h2 class="font-bangla text-4xl font-medium">একটি Lesson Select করুন।</h2>
        </div>`;
    return;
  }

  wordContainer.innerHTML = "";

  // manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      displayLevelWords(result.data);
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      // console.log(clickBtn);
    });
};

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

// Displaying Word Cards
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");

  if (words.length === 0) {
    wordContainer.innerHTML = `<div class="col-span-3 text-center">
          <img class="mx-auto" src="./assets/alert-error.png" alt="Error Alert Image" />
          <p class="font-bangla text-xl text-[#79716B] my-4">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="font-bangla text-4xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>`;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    console.log(word);

    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class="card bg-white text-black">
          <div class="card-body items-center text-center">
            <h2 class="card-title font-bold text-3xl">${word.word ? word.word : "শব্দ পাওয়া যাইনি"}</h2>
            <p class="font-medium text-xl my-6">Meaning / Pronunciation:</p>
            <h2 class="card-title font-bangla font-semibold text-3xl text-[#18181B]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যাইনি"}"</h2>
            <div class="w-11/12 flex items-center justify-around mt-7">
              <button onClick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF50]">
                <i
                  class="fa-solid fa-circle-exclamation text-[#374957] text-[16px]"
                ></i>
              </button>
              <button class="btn bg-[#1A91FF50]">
                <i class="fa-solid fa-volume-high text-[#374957] text-[16px]"></i>
              </button>
            </div>
          </div>
        </div>
    `;
    wordContainer.append(cardDiv);
  });
  manageSpinner(false);
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const displayDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <h3 class="text-4xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h3>
  <p class="py-4"><span class="text-2xl font-semibold">Meaning:</span> <br/>
  <span class="text-2xl font-medium font-bangla mt-2">${word.meaning}</span>
  </p>
  <p class="py-4"><span class="text-2xl font-semibold">Example:</span> <br/>
  <span class="text-2xl font-medium font-bangla mt-2">${word.sentence}</span>
  </p>
  <p class="py-4"><span class="text-2xl font-semibold">সমার্থক শব্দ গুলো:</span></p>
  <div>
${createElements(word.synonyms)}
  </div>
  `;
  document.getElementById("word_modal").showModal();
};

// Showing Lessons Buttons
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWords(${lesson.level_no})" href="" class="btn btn-outline btn-primary flex items-center lesson-btn">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
    levelContainer.append(btnDiv);
  }
};

loadLevelWords();
loadLessons();
