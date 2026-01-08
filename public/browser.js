console.log("browser.js ishga tushdi");

function itemTemplate(item) {
    return` <li
                    class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
                    <span class="item-text">${item.reja}</span>
                    <div>
                    <button data-id="${item._id}" 
                        class="edit-me btn btn-secondary btn-sm mr-1">
                        Ozgartirish
                    </button>
                    <button data-id="${item._id}" 
                        class="delete-me btn btn-danger btn-sm">
                        Ochirish
                    </button>
                    </div>
            </li>`;
}
let createField = document.getElementById("create-field"); //inputni qo'lga oldik
document
.getElementById("create-form") //reja yozadigan formni qo'lga oldik
.addEventListener("submit", function(e) {
  e.preventDefault(); //submit bosganda boshqa pagega o'tmasin
  if (!createField.value.trim()) {
    alert("Reja yozing!");
    return;
  }
  axios.post("/create-item", {reja: createField.value}) //1 - input value'ni rejaga tenglab BEga junatdik
        .then((response) => { // 6 - BEdan FEga qabul qilish 
            document
            .getElementById("item-list") //<ul>
            .insertAdjacentHTML("beforeend", itemTemplate(response.data)); //rejalarni ro'yhatini (ul) qo'lga olib yangi rejani pastdan yozilsin deyabmiz
            createField.value = "";
            createField.focus();
        })
        .catch((err) => {
            console.log("Iltimos boshqadan qiling!");
            
        });
});

document.addEventListener("click", function (e) {
    // console.log(e.target);
    
  // DELETE operation
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq o'chirasizmi?")) {
      axios
        .post("/delete-item", { 
          id: e.target.getAttribute("data-id") })
        .then((response) => {
            console.log(response);
            e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
            console.log("Boshqadan qiling!");
            
        });
    }
  }
  // EDIT OPER
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "O'zgartirish kiriting~", 
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
      // edit logic here
    if (!userInput.trim()) {
    alert("O'zgartmoqchi bo'lgan Rejani yozing!");
    return;
  }
    if (userInput&&userInput.trim()) {
      axios.post("/edit-item", {
        id: e.target.getAttribute("data-id"),
        new_input: userInput,
      }).then(response => {
          console.log(response.data);
          e.target.parentElement.parentElement.querySelector(".item-text")
          .innerHTML = userInput;
      }).catch((err) => {
        console.log("Iltimos qaytadan o'zgarting!");
      });
    }  
    }
  } 
);

//ALL plans DELETE 
    document.getElementById("clean-all").addEventListener("click", function(){
      if (confirm ("Aniq hammasini o'chirasizmi?")) {
        axios
        .post("/delete-all", {
          delete_all: true
        })
        .then(response => {
          console.log(response.data);
          document.location.reload();
          // document.querySelector("#item-list").remove();
        }) 
        .catch((err) => {
          console.log("Hammasini boshqadan o'chirib ko'ring");
        }) 
      }
    }) 
