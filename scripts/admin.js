import { baseUrl, localurl } from "./baseUrl.js";

let localData = JSON.parse(localStorage.getItem("loginData"));
let adminForm = document.getElementById("adminForm");
console.log(localData);

let bookCont = document.getElementById("bookCont");

if (localData.length == 0 || localData.email !== "admin@empher.com") {
  alert("Admin Not Logged In");
  window.location.href = "index.html";
  adminForm.style.display = "none";
} else {
  adminForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      let book = {
        title: adminForm.bookTitle.value,
        author: adminForm.author.value,
        category: adminForm.category.value,
        isAvailable: true,
        isVerified: false,
        borrowedDays: Math.round(Math.random() * 10),
        url: "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg",
      };
      await fetch(baseUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(book),
      });
      alert("Book Added Successfully.");
      adminForm.reset();
      displayData();
    } catch (err) {
      console.log(err);
      alert("Unable to add Book");
    }
  });
}

window.onload = async () => {
  await displayData();
};

function createBookCard(arr) {
  bookCont.innerHTML = "";
  arr.map((el) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    let bookTitle = document.createElement("h2");
    bookTitle.textContent = el.title;

    let bookAuthor = document.createElement("h3");
    bookAuthor.textContent = `By: ${el.author}`;

    let bookCategory = document.createElement("h4");
    bookCategory.textContent = `Category: ${el.category}`;

    let availableStatus = document.createElement("h4");
    availableStatus.textContent = `Availabity: ${
      el.isAvailable ? "is Available" : "Unavailable"
    }`;

    let borrowedDays = document.createElement("h4");
    borrowedDays.textContent = `Borrowed Days: ${el.borrowedDays}`;

    let verifiedBtn = document.createElement("button");
    verifiedBtn.textContent = "Verify Book";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Book";

    verifiedBtn.addEventListener("click", async () => {
      let confrmation = confirm("Are you sure to Verify..?");
      if (confrmation) {
        el.isVerified = true;
        verifiedBtn.disabled = true;
        //update request

        await fetch(`${baseUrl}/${el.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...el, isVerified: true }),
        });
        console.log("patch done ");
      }
    });

    deleteBtn.addEventListener("click", async () => {
      let confrmation = confirm("Are you sure to Delete..?");
      if (confrmation) {
        await fetch(`${baseUrl}/${el.id}`, {
          method: "DELETE",
        });

        await displayData();
        console.log("Delete done ");
      }
    });

    bookCard.append(
      bookTitle,
      bookAuthor,
      bookCategory,
      availableStatus,
      borrowedDays,
      verifiedBtn,
      deleteBtn
    );

    bookCont.append(bookCard);
  });
}

async function getData() {
  try {
    let res = await fetch(baseUrl);
    let data = await res.json();

    createBookCard(data);
  } catch (error) {
    console.log(error);
    alert("Unable to get data!");
  }
}

async function displayData() {
  await getData();
}
