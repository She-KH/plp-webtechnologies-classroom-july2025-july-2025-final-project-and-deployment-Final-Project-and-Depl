document.addEventListener("DOMContentLoaded", () => {
  // ====== CONTACT FORM (if present) ======
  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("name") || {}).value?.trim() || "";
      const email = (document.getElementById("email") || {}).value?.trim() || "";
      const msg = (document.getElementById("message") || {}).value?.trim() || "";
      if (!name || !email || !msg) {
        if (message) { message.textContent = "All fields are required!"; message.style.color = "red"; }
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        if (message) { message.textContent = "Please enter a valid email!"; message.style.color = "red"; }
        return;
      }
      if (message) { message.textContent = "Thank you — we'll get back to you soon!"; message.style.color = "green"; }
      form.reset();
    });
  }

  // ====== SLIDER LOGIC ======
  const slidesContainer = document.querySelector(".slides");
  const slideElems = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsWrap = document.querySelector(".dots");

  if (!slidesContainer || !slideElems.length) return; // nothing to do

  let index = 0;
  const total = slideElems.length;
  let autoTimer = null;
  const interval = 5000;

  // create dots if container present
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      btn.className = i === 0 ? "active" : "";
      btn.setAttribute("aria-label", `Go to slide ${i+1}`);
      btn.addEventListener("click", () => goto(i));
      dotsWrap.appendChild(btn);
    }
  }

  function refresh() {
    // translate by index * 100% of slider width
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    // update dots active
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((b, i) => b.classList.toggle("active", i === index));
    }
  }

  function goto(i) {
    index = (i + total) % total;
    refresh();
    restartTimer();
  }

  function next() { goto(index + 1); }
  function prev() { goto(index - 1); }

  // buttons
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // auto play
  function startTimer() { autoTimer = setInterval(next, interval); }
  function stopTimer() { clearInterval(autoTimer); }
  function restartTimer() { stopTimer(); startTimer(); }

  // pause on hover for accessibility
  const slider = document.querySelector(".slider");
  if (slider) {
    slider.addEventListener("mouseenter", stopTimer);
    slider.addEventListener("mouseleave", startTimer);
    slider.addEventListener("focusin", stopTimer);
    slider.addEventListener("focusout", startTimer);
  }

  // init
  refresh();
  startTimer();
});
