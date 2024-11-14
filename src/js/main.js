(function ($) {
  "use strict";

  $(document).ready(function () {
    var progressWrap = $(".progress-wrap");
    var footer = $("footer"); // Sélectionner le footer
    var offset = 50; // Offset pour l'affichage de la barre de progression
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();

    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";

    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };

    updateProgress();
    $(window).scroll(updateProgress);

    // Vérifier la position du bouton lors du défilement
    var adjustButtonPosition = function () {
      var footerOffset = footer.offset().top;
      var windowScrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();

      // Si la fenêtre est proche du footer, on arrête la barre de progression juste au-dessus du footer
      if (
        windowScrollTop + windowHeight >=
        footerOffset - progressWrap.height()
      ) {
        // Lorsque vous êtes proche du footer, le bouton reste fixé juste au-dessus du footer
        progressWrap.css({
          position: "fixed",
          bottom: footer.height() + 50 + "px", // Un petit espacement du footer
          // transform: "translateX(-50%)", // Garder le centrage
        });
      } else {
        // Sinon, il reste positionné en bas de la fenêtre
        progressWrap.css({
          position: "fixed",
          bottom: "50px", // Position fixe au bas de la page
          // transform: "translateX(-50%)", // Garder le centrage
        });
      }
    };

    // Applique la logique lors du défilement et du redimensionnement
    $(window).scroll(adjustButtonPosition);
    $(window).resize(adjustButtonPosition); // Pour gérer la redimension des fenêtres

    // Gérer l'activation du bouton de progression
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });

    // Fonction de retour en haut
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, 550);
      return false;
    });
  });
})(jQuery);

// ------carousel des BD------

const carousel = document.querySelector(".carousel");
const rectangles = carousel.querySelectorAll(".rectangle");
const indicators = document.querySelectorAll(".indicator");
let index = 0;
const totalItems = rectangles.length;
const rectangleWidth = 550; // Largeur de chaque rectangle définie en CSS
const margin = 200; // Marge totale autour de chaque rectangle (100px de chaque côté)

function moveToNext() {
  index = (index + 1) % totalItems;
  updateCarousel();
}

function updateCarousel() {
  const containerWidth = document.querySelector(
    ".carousel-container"
  ).offsetWidth;

  // Ajoute 5 pixels pour recentrer légèrement à droite
  const offset = -(
    index * (rectangleWidth + margin) -
    (containerWidth - rectangleWidth) / 2 +
    margin / 2 -
    2
  );

  // Applique l'offset ajusté
  carousel.style.transform = `translateX(${offset}px)`;

  rectangles.forEach((rectangle, i) => {
    rectangle.classList.toggle("center", i === index);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

function setupIndicators() {
  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
  });
}

setInterval(moveToNext, 3000);
setupIndicators();
updateCarousel();

// --------------------rocket------

// Fonction pour mettre à jour la barre et la position de la fusée
window.onscroll = function () {
  updateProgress();
};

function updateProgress() {
  // Calcul de la hauteur défilée en pourcentage
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  // Mise à jour de la barre de progression
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = scrollPercentage + "%";

  // Mise à jour de la position de la fusée
  const rocket = document.getElementById("rocket");
  rocket.style.left = scrollPercentage + "%";
}
