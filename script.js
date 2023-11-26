const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const closeBtnEl = document.querySelector(".close-btn");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

closeBtnEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting == false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

document
  .querySelector(".cta-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_c4u0gjb", "template_qe6qwjl", this).then(
      function () {
        console.log("SUCCESS!");
        document.querySelector(".cta-form").reset(); // Clear the form
        alert("Message sent successfully!"); // Display a success message
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  });
