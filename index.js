const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

let mainEl = document.querySelector("main");
let topMenuEl = document.getElementById("top-menu");

//part 1
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;
mainEl.classList.add("flex-ctr");

//part 2
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// part 3 with .forEach
menuLinks.forEach((item) => {
  let aTag = document.createElement("a");
  aTag.setAttribute("href", item.href);
  aTag.textContent = item.text;
  topMenuEl.appendChild(aTag);
});

//////////////////////////
//// Creating the Submenu
let subMenuEl = document.getElementById("sub-menu");

subMenuEl.style.height = "100%";
subMenuEl.style.background = "var(--sub-menu-bg)";
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";
subMenuEl.classList.add("flex-around");

///////////////////////////
// Adding Menu Interaction
let topMenuLinks = document.querySelectorAll("a");

topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }

  ////
  //Adding Submenu Interaction
  // iterate over <a> tags and toggle the active class
  topMenuLinks.forEach((topLink) => {
    if (e.target === topLink) {
      if (topLink.classList.contains("active")) {
        topLink.classList.remove("active");
        subMenuEl.style.top = "0";
      } else {
        topLink.classList.add("active");
      }
    } else {
      topLink.classList.remove("active");
    }
  });

  // get the clicked menu and assigned to variable
  let clickedMenu;
  for (let links of menuLinks) {
    if (links.text === e.target.textContent) {
      clickedMenu = links;
      break;
    }
  }

  //  check the clicked menu thru and has subLinks and class of active
  //  if yes style the subMenuEl
  // helper function should called in this section to build the subMenu items
  if (
    clickedMenu &&
    clickedMenu.subLinks &&
    e.target.classList.contains("active")
  ) {
    buildSubMenu(clickedMenu.subLinks);
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
  }
});

//// create helper function
function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = "";
  subLinks.forEach((link) => {
    let aTag = document.createElement("a");
    aTag.href = link.href;
    aTag.textContent = link.text;
    subMenuEl.appendChild(aTag);
  });
}
