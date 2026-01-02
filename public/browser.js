
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
    
    axios.post("/create-item", {reja: createField.value}) //inputga yozilgan value'ni rejaga tenglab post qilyabmiz
    .then((response) => {
        document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data)); //rejalarni ro'yhatini (ul) qo'lga olib yangi rejani pastdan yozilsin deyabmiz
        createField.value = "";
        createField.focus();
    })
    .catch((err) => {
        console.log("Iltimos boshqadan qiling!");
        
    });
});

document.addEventListener("click", function (e) {
    console.log(e.target);
    
  // DELETE OPER
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq o'chirasizmi?")) {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
            console.log(response.data);
            e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
            console.log("Boshqadan qiling!");
            
        });
    }
  }

  // EDIT OPER
  if (e.target.classList.contains("edit-me")) {
    if (confirm("Aniq EDIT qilasizmi?")) {
      // edit logic here
    }
  }

});
