

const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const progressFill = document.querySelector(".progress-fill");

const yearElement = document.getElementById("year");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


const sections = document.querySelectorAll("main section[id]");


function updateActiveLink() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



let progressAnimated = false;


function animateProgress() {

    if (!progressFill || progressAnimated) return;

    const rect = progressFill.getBoundingClientRect();

    const visible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;


    if (visible) {

        progressAnimated = true;

        const progress =
            progressFill.getAttribute("data-progress") || 0;

        progressFill.style.width = `${progress}%`;

    }

}


window.addEventListener("scroll", animateProgress);

animateProgress();



if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}



document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target = document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


const interactiveCards = document.querySelectorAll(
    ".course-card, .project-card"
);


interactiveCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) return;


        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX = rect.width / 2;
        const centerY = rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -2;


        const rotateY =
            ((x - centerX) / centerX) * 2;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});



document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        navMenu &&
        navMenu.classList.contains("active")
    ) {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});