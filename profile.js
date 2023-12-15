document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#spinner").style.visibility = "visible";
  } else {
    document.querySelector("#spinner").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
    const pageName = window.location.hash;
    pageName
      ? pageOnClick(pageName.substring(1, pageName.length))
      : pageOnClick("portfolio-page");
  }
};

const pageNames = ["home-page", "portfolio-page", "contact-page"];

function pageOnClick(pageName) {
  pageNames.forEach((page) => {
    const selectedPage = document.querySelector(`#${page}`);
    const linkClassList = document.querySelector(`#${page}-link`).classList;
    if (page === pageName) {
      selectedPage.style.display = "flex";
      linkClassList.add("active");
    } else {
      selectedPage.style.display = "none";
      linkClassList.remove("active");
    }
  });
  const navClassList = document.querySelector("#navigation").classList;
  const headerClassList = document.querySelector("#header").classList;
  const btnClassList = document.querySelector("#menu").classList;

  navClassList.remove("nav-list-open");
  btnClassList.remove("nav-button-close");
  headerClassList.remove("header-menu");
  window.scrollTo(0, 0);
}

function navOnClick() {
  const navClassList = document.querySelector("#navigation").classList;
  const btnClassList = document.querySelector("#menu").classList;
  const headerClassList = document.querySelector("#header").classList;

  if (navClassList.contains("nav-list-open")) {
    navClassList.remove("nav-list-open");
    btnClassList.remove("nav-button-close");
    headerClassList.remove("header-menu");
  } else {
    navClassList.add("nav-list-open");
    btnClassList.add("nav-button-close");
    headerClassList.add("header-menu");
  }
}

function sendEmail() {
  const fromMail = document.querySelector("#mail").value;
  const name = document.querySelector("#name").value;
  const messageBody = document.querySelector("#message").value;
  const formatedMsg = `<p>${messageBody}</p></br><span>Regards,<span></br><b>${name}</b>`;
  console.log(fromMail, name, formatedMsg);
  Email.send({
    SecureToken: "fa6ce737-d3bd-46fa-b464-b4416fd6d375",
    To: "tmmaheshwaran@gmail.com",
    From: fromMail,
    Subject: "Query from portfolio",
    Body: formatedMsg,
  }).then((message) => alert(message));
}
