const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displaylessons(data.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaylevelWord(data.data));
};

const displaylevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    alert("No words found for this lesson.");
    return;
  }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = ` <div class="bg-white rounded-xl  shadow-lg text-center p-5 ">
      <h2 class="font-bold text-xl">"${word.word}"</h2>
      <p>Meaning /Pronounciation</p>
      <div>"${word.meaning} / ${word.pronunciation}"</div>
      <div class="flex items-center justify-between mt-5">
         <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
         <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
      </div>
     </div>`;
    wordContainer.append(card);
  });
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
                <button onclick="loadLevelWord(${lesson.level_no}) " class="btn btn-outline btn-primary "
                ><i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no}</button>    
             
    `;
    //and append to the container
    levelContainer.append(btnDiv);
  }
};

loadlessons();
