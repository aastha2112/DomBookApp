import { baseUrl } from "./baseUrl.js";

let localData = JSON.parse(localStorage.getItem("loginData"));

let bookCont = document.getElementById("bookCont");
let availableBooksBtn = document.getElementById("availableBooksBtn");
let borrowedBooksBtn = document.getElementById("borrowedBooksBtn");

if (localData.length == 0 || localData.email !== "user@empher.com") {
  alert("User Not Logged In");

  window.location.href = "index.html";
} else {
  availableBooksBtn.addEventListener("click", async () => {
    try {
      let res = await fetch(baseUrl);
      let data = await res.json();
      console.log(data);
      let availableBooks = data.filter((el) => el.isAvailable === true);

      console.log(availableBooks);

      displayData(data);
    } catch (error) {
      console.log(error);
      alert("Unable to get Available Books");
    }
  });
  borrowedBooksBtn.addEventListener("click", async () => {
    try {
      let res = await fetch(baseUrl);
      let data = await res.json();

      console.log(data);
      let borrowedBooks = data.filter((el) => el.isAvailable === false);
      displayBorrowedBooks(borrowedBooks);

      //   displayData(availableBooks);
    } catch (error) {
      console.log(error);
      alert("Unable to get Borrowed Books");
    }
  });
}

function displayData(arr) {
  bookCont.innerHTML = "";
  arr.map((el) => {
    let bookCard = document.createElement("div");

    let bookTitle = document.createElement("h2");
    bookTitle.textContent = el.title;

    let bookAuthor = document.createElement("h3");
    bookAuthor.textContent = `By: ${el.author}`;

    let bookCategory = document.createElement("h4");
    bookCategory.textContent = `Category: ${el.category}`;

    let borrowBtn = document.createElement("button");
    borrowBtn.textContent = "Borrow Book";

    let availableStatus = document.createElement("h4");

    borrowBtn.addEventListener("click", () => {
      let days = prompt("For how many days you want to borrow ?");

      if (days > 10) {
        alert("Maximum limit for borrowing is 10 days!");
      } else {
        el.borrowedDays = days;
        el.isAvailable = false;
        availableStatus.textContent = "Unavailable";
        updateBook(el);
        alert("Book Borrowed Successfully.");
      }
    });
    bookCard.append(
      bookTitle,
      bookAuthor,
      bookCategory,
      availableStatus,

      borrowBtn
    );
    bookCont.append(bookCard);
  });
}

async function updateBook(el) {
  try {
    await fetch(`${baseUrl}/${el.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...el, isAvailable: false }),
    });
    console.log("book updated");
  } catch (error) {
    console.log(error);
    alert("Cannot update Book");
  }
}

function displayBorrowedBooks(arr) {
  bookCont.innerHTML = "";
  arr.map((el) => {
    let bookCard = document.createElement("div");

    let bookTitle = document.createElement("h2");
    bookTitle.textContent = el.title;

    let bookAuthor = document.createElement("h3");
    bookAuthor.textContent = `By: ${el.author}`;

    let bookCategory = document.createElement("h4");
    bookCategory.textContent = `Category: ${el.category}`;

    let returnBtn = document.createElement("button");
    returnBtn.textContent = "Return Book";

    let borrowedDays = document.createElement("h4");
    borrowedDays.textContent = `Borrowed Days: ${el.borrowedDays}`;

    returnBtn.addEventListener("click", async () => {
      let confirmation = confirm("Are you sure to return book..?");

      if (confirmation) {
        el.borrowedDays = null;
        el.isAvailable = true;

        alert("Book Returned Successfully.");

        await fetch(`${baseUrl}/${el.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...el, isAvailable: true }),
        });
      }
    });
    bookCard.append(
      bookTitle,
      bookAuthor,
      bookCategory,
      borrowedDays,
      returnBtn
    );
    bookCont.append(bookCard);
  });
}
