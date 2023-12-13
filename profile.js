document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#spinner").style.visibility = "visible";
  } else {
    document.querySelector("#spinner").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
    pageOnClick("home-page");
  }
};

const pageNames = ["home-page", "portfolio-page", "contact-page"];

function pageOnClick(pageName) {
  pageNames.forEach((page) => {
    const selectedPage = document.querySelector(`#${page}`);
    if (page === pageName) {
      selectedPage.style.display = "flex";
    } else {
      selectedPage.style.display = "none";
    }
  });
  const navClassList = document.querySelector("#navigation").classList;
  const headerClassList = document.querySelector("#header").classList;
  const btnClassList = document.querySelector("#menu").classList;

  navClassList.replace("nav-list", "hide-nav-list");
  btnClassList.remove("nav-button-close");
  headerClassList.remove("header-menu");
  window.scrollTo(0, 0);
}

function navOnClick() {
  const navClassList = document.querySelector("#navigation").classList;
  const btnClassList = document.querySelector("#menu").classList;
  const headerClassList = document.querySelector("#header").classList;

  if (navClassList.contains("hide-nav-list")) {
    navClassList.replace("hide-nav-list", "nav-list");
    btnClassList.add("nav-button-close");
    headerClassList.add("header-menu");
  } else {
    navClassList.replace("nav-list", "hide-nav-list");
    btnClassList.remove("nav-button-close");
    headerClassList.remove("header-menu");
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
