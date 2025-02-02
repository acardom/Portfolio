window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      document.getElementById("to-top").style.opacity = 1;
    } else {
      document.getElementById("to-top").style.opacity = 0;
    }
  })