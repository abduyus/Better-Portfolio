const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const closeBtnEl = document.querySelector(".close-btn");
const navLinks = document.querySelectorAll(".main-nav-link:link");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

closeBtnEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    const navLinks = document.querySelectorAll(".main-nav-link");

    // Scroll back to top
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
      navLinks.forEach((link) => link.classList.remove("selected"));
      console.log(e.target);
      e.target.classList.add("selected");
    }

    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
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

const allSectionss = document.querySelectorAll(".section");

console.log(allSectionss);

const revealSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObservers = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSectionss.forEach(function (section) {
  sectionObservers.observe(section);
  section.classList.add("section--hidden");
});

// test

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Remove the selected class from all navigation links
      navLinks.forEach((link) => link.classList.remove("selected"));

      // Find the navigation link corresponding to the currently intersecting section
      const correspondingNavLink = document.querySelector(
        `a[href="#${entry.target.id}"]`
      );

      // Add the selected class to the corresponding navigation link
      if (correspondingNavLink) {
        correspondingNavLink.classList.add("selected");
      }
    }
  });
};
// ///////
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

// Get a reference to the hero section and the "Home" link
const heroSection = document.querySelector(".section-hero");
const homeLink = document.querySelector('a[href="#home"]');

// Define the function that will be called when the hero section enters or exits the viewport
const handleHeroSectionIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // The hero section has entered the viewport
      navLinks.forEach((link) => link.classList.remove("selected"));
      homeLink.classList.add("selected");
    } else {
      // The hero section has exited the viewport
      homeLink.classList.remove("selected");
    }
  });
};

// Create an Intersection Observer that will call handleHeroSectionIntersect
const observer = new IntersectionObserver(handleHeroSectionIntersect);

// Start observing the hero section
observer.observe(heroSection);
