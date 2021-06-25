"use strict";

(function () {
  console.log("Have a good day 🎈");

  // opening a modal
  const modalLink = document.querySelectorAll(".modal--link");
  const backdrop = document.getElementById("modal--backdrop");
  [...modalLink].forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      let modalTrigger = elem.getAttribute("data--modal");
      console.log(modalTrigger);
      document.getElementById(modalTrigger).classList.add("active");
      backdrop.classList.add("active");
    });
  });

  // closing a modal
  const modals = document.querySelectorAll(".modal");
  [...modals].forEach((elem) => {
    elem.querySelector(".close").addEventListener("click", (e) => {
      e.preventDefault();
      elem.classList.remove("active");
      backdrop.classList.remove("active");
    });
  });

  // closing all modals
  backdrop.addEventListener("click", (e) => {
    e.preventDefault();
    [...modals].forEach((elem, index) => {
      elem.classList.remove("active");
      backdrop.classList.remove("active");
    });
  });
})();
