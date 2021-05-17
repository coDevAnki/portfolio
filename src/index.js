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
    if (mainContainer && (i === 0 || i === container.children.length - 1))
      return;
    let observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          transitionate(e[0].target);
          observer.unobserve(section);
        }
      },
      { threshold: mainContainer ? 0 : 0.3 }
    );
    observer.observe(section);
  });
}

addTransition(select(".main-container"), true);
addTransition(select(".featrued-projects-container"));
addTransition(select(".other-projects-container"));
addTransition(select("#contact"));

const menuControl = (() => {
  let isOpen = false;
  let toggleMenu = (actionType) => {
    if (actionType === "open") {
      select(".hambuger-icon").classList.add("show_nav");
      select(".drawer-menu").classList.add("show_drawer-menu");
      setTimeout(() => {
        document.body.addEventListener("click", clickListener);
      });
      isOpen = true;
    } else if (actionType === "close") {
      select(".hambuger-icon").classList.remove("show_nav");
      select(".drawer-menu").classList.remove("show_drawer-menu");
      document.body.removeEventListener("click", clickListener);
      isOpen = false;
    }
  };
  function clickListener(e) {
    console.log(select(".drawer-menu").contains(e.target));
    if (select(".drawer-menu").contains(e.target) === false) {
      toggleMenu("close");
    }
  }
  return () => {
    if (!isOpen) {
      toggleMenu("open");
    } else {
      toggleMenu("close");
    }
  };
})();

select(".hambuger-icon").addEventListener("click", menuControl);
select(".contact-form-layout").addEventListener("focusout", (e) => {
  if (e.target.value) {
    e.target.setAttribute("input_empty", "true");
  } else {
    e.target.removeAttribute("input_empty");
  }
});
select(".logo_container").addEventListener("click", () => {
  window.scrollTo(0, 0);
});
