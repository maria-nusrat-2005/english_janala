const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displaylessons(data.data));
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
                <button class="btn btn-outline btn-primary "
                ><i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no}</button>    
             
    `;
    //and append to the container
    levelContainer.append(btnDiv);
  }
};

loadlessons();
