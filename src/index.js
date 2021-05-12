const select = (selector, plural = false) =>
  plural
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);

function transitionate(el) {
  el.style.transform = "none";
  el.style.opacity = 1;
}

function setDelay(el, delay) {
  el.style.transitionDelay = `${delay}s`;
}

window.addEventListener("DOMContentLoaded", () => {
  let delay = 0.2;
  select(".nav-item", true).forEach((navItem) => {
    setDelay(navItem, delay);
    transitionate(navItem);
    delay += 0.2;
  });
  [...select(".intro-container").children].forEach((introItem) => {
    setDelay(introItem, delay);
    transitionate(introItem);
    delay += 0.2;
  });
});

function addTransition(container, mainContainer = false) {
  Array.from(container.children).forEach((section, i) => {
    if (mainContainer && i === 0) return;
    let observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          transitionate(e[0].target);
        }
      },
      { threshold: mainContainer ? 0 : 0.5 }
    );
    observer.observe(section);
  });
}

addTransition(select(".main-container"), true);
addTransition(select(".featrued-projects-container"));
addTransition(select(".other-projects-container"));

select(".hambuger-icon").addEventListener("click", () => {
  select(".hambuger-icon").classList.toggle("show_nav");
  select(".drawer-menu").classList.toggle("show_drawer-menu");
});



