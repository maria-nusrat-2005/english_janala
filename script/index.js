const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displaylessons(data.data));
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  //console.log(lessonButton);
  lessonButton.forEach((btn) => btn.classList.remove("btn-active"));
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details.data);
};

const displayWordDetail = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div>
          <h2>${word.word} <i class="fa-solid fa-microphone"></i></h2>
        </div>
        <div>
          <h2>Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2>Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2>"সমার্থক শব্দ গুলো"</h2>
          <div>
           <div>${createElements(word.synonyms)} </div>
          </div>`;

  document.getElementById("my_modal_5").showModal();
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //remove active class from all buttons
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      //console.log(clickBtn);
      clickBtn.classList.add("btn-active");
      displaylevelWord(data.data);
    });
};

const displaylevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `
             <div class="bg-green-100 text-center col-span-full">
      <p class="text-xl font-medium text-gray-800">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2>নেক্সট Lesson এ যান</h2>
    </div>
  `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = ` <div class="bg-white rounded-xl  shadow-lg text-center p-5 ">
      <h2 class="font-bold text-xl">${
        word.word ? word.word : "no word found"
      } </h2>
      <p>Meaning /Pronounciation</p>
      <div>"${word.meaning ? word.meaning : "no meaning found"} / ${
      word.pronunciation
    }"</div>
      <div class="flex items-center justify-between mt-5">
         <button onclick="loadWordDetail(${
           word.id
         })" class="btn"><i class="fa-solid fa-circle-info"></i></button>
         <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
      </div>
     </div>`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displaylessons = (lessons) => {
  //get the container empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //get into every lessons
  for (const lesson of lessons) {
    //create element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no}) " class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no}</button>    
             
    `;
    //and append to the container
    levelContainer.append(btnDiv);
  }
};

loadlessons();
