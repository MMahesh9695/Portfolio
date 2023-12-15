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

async function sendEmail() {
  try {
    const fromMailField = document.querySelector("#mail");
    const nameField = document.querySelector("#name");
    const messageBodyField = document.querySelector("#message");
    const fromMail = fromMailField.value;
    const name = nameField.value;
    const messageBody = messageBodyField.value;
    const formatedMsg = `<p>${messageBody}</p></br><span>Regards,<span></br><b>${name}</b>`;
    const msg = document.querySelector("#msg-success");
    if (name === "" || fromMail === "" || messageBody === "") {
      let message = "";
      if (name === "") {
        message = `Please Enter Your Name, `;
        nameField.classList.add("input-error");
      } else {
        nameField.classList.remove("input-error");
      }
      if (fromMail === "") {
        message += `Please Enter Your Mail, `;
        fromMailField.classList.add("input-error");
      } else {
        fromMailField.classList.remove("input-error");
      }
      if (messageBody === "") {
        message+= `Please Enter a Message`;
        messageBodyField.classList.add("input-error");
      } else {
        messageBodyField.classList.remove("input-error");
      }
      msg.innerHTML = message;
      return;
    }
    nameField.classList.remove("input-error");
    fromMailField.classList.remove("input-error");
    messageBodyField.classList.remove("input-error");

    await Email.send({
      SecureToken: "fa6ce737-d3bd-46fa-b464-b4416fd6d375",
      To: "tmmaheshwaran@gmail.com",
      From: fromMail,
      Subject: "Query from portfolio",
      Body: formatedMsg,
    }).then(() => {
      msg.innerHTML = `Thanks for reaching out me <b>${name}</b>!. I will get back to you as soon as I can!!`;
      return;
    });
  } catch (err) {
    msg.innerHTML = `Try again later! Thanks`;
  }
}
