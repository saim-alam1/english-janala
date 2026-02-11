const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((result) => displayLessons(result.data));
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <a href="" class="btn btn-outline btn-primary flex items-center">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</a>`;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
