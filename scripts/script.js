const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((result) => displayLessons(result.data));
};

const loadLevelWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => displayLevelWords(result.data));
};

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    console.log(word);
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class="card bg-white text-black">
          <div class="card-body items-center text-center">
            <h2 class="card-title font-bold text-3xl">${word.word}</h2>
            <p class="font-medium text-xl my-6">Meaning / Pronunciation:</p>
            <h2 class="card-title font-bangla font-semibold text-3xl text-[#18181B]">"${word.meaning}"</h2>
            <div class="w-11/12 flex items-center justify-around mt-7">
              <button class="btn bg-[#1A91FF50]">
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

  // for (let word of words) {
  //   const cardDiv = document.createElement("div");
  //   cardDiv.innerHTML = `
  //   <div class="card bg-white text-black">
  //         <div class="card-body items-center text-center">
  //           <h2 class="card-title">Cookies!</h2>
  //           <p>We are using cookies for no reason.</p>
  //           <div class="w-11/12 flex items-center justify-around">
  //             <button class="btn btn-primary">Accept</button>
  //             <button class="btn btn-secondary">Deny</button>
  //           </div>
  //         </div>
  //       </div>
  //   `;
  //   wordContainer.append(cardDiv);
  // }
};

// Showing Lessons Buttons
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onClick="loadLevelWords(${lesson.level_no})" href="" class="btn btn-outline btn-primary flex items-center">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
    levelContainer.append(btnDiv);
  }
};

loadLevelWords();
loadLessons();
