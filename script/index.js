const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLesson(data.data));
};

const loadLevelWord = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

// // id
// :
// 5
// level
// :
// 1
// meaning
// :
// "আগ্রহী"
// pronunciation
// :
// "ইগার"
// word
// :
// "Eager"

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
    
    <div
            class="bg-white rounded text-xl shadow-sm text-center py-10 px-5 space-y-4"
          >
          
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <p class="font-semibold">${word.meaning}/${word.pronunciation}</p>

            <div class="flex justify-between items-center">
              <button class="btn bg-sky-100 hover:bg-sky-500">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="btn bg-sky-100 hover:bg-sky-500">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
          
          `;

    wordContainer.append(card);
  });
};
const displayLesson = (lessons) => {
  //1. get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  //   2. get into every lessons
  for (let less of lessons) {
    console.log(less);
    //   3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
     <button onclick="loadLevelWord(${less.level_no})" class="btn btn-outline btn-primary" href=""
                  ><i class="fa-solid fa-book-open-reader"></i>
                  Lesson - ${less.level_no}</button
                >`;

    // 4. append into container
    levelContainer.append(btnDiv);
  }
};
loadLessons();
