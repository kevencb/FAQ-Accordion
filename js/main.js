const accordionList = document.querySelector(".accordions");

// Consultamos la información de la BD y la enviamos mediante los parámetros para poder imprimirla en pantalla
async function loadInfoAccordions() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/kevencb/FAQ-Accordion/refs/heads/main/data.json"
    );
    const infoAccordion = await resp.json();
    displayElements(infoAccordion);
  } catch (error) {
    console.error("No hemos encontrado la información solicitada: ", error);
  }
}

// Creamos la función encargada de renderizar los articulos indpendientemente.
function displayElements(elements) {
  elements.forEach((element, index) => {
    const article = document.createElement("article");
    article.classList.add("accordion");
    article.innerHTML = `
        <header class="accordion__header">
          <h2 class="accordion__header__title">
            ${element.title}
          </h2>
          <div class="accordion__header__actions">
            <button
              class="accordion__header__actions__button acccordion__button-plus"
              type="button"
              aria-labelledby="accordion"
            >
              <img
                class="button-plus show"
                src="./assets/images/icon-plus.svg"
                alt=""
              />
              <img
                class="button-minus"
                src="./assets/images/icon-minus.svg"
                alt=""
              />
            </button>
          </div>
        </header>
        <p class="accordion__description show">
          ${element.description}
        </p>
    `;

    //Validamos que el primer elmento se encuentre con su información expuesta.
    const content = article.querySelector(".accordion__description");
    const btn_plus = article.querySelector(".button-plus");
    const btn_minus = article.querySelector(".button-minus");

    if (index === 0) {
      content.classList.remove("show");
      btn_plus.classList.add("show");
      btn_minus.classList.remove("show");
    } else {
      btn_plus.classList.remove("show");
      btn_minus.classList.add("show");
    }

    //Evento para mostrar/ocultar información
    const header = article.querySelector(".accordion__header");
    header.addEventListener("click", () => {
      infoContent = header.nextElementSibling;
      infoContent.classList.toggle("show");
      btn_plus.classList.toggle("show");
      btn_minus.classList.toggle("show");
    });

    accordionList.appendChild(article);
  });
}

loadInfoAccordions();
