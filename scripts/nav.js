function navbar() {
  let navBar = document.getElementById("navBar");

  let navLinks = `<h1>DomBookApp</h1>
        <div class="navlinks">
          <a href="./index.html">Home</a>
          <a href="./admin.html">Admin</a>
          <a href="./books.html">Books</a>
        </div>`;

  navBar.innerHTML = navLinks;
}

navbar();
