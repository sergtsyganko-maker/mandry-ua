// Отримання елементів
const burger = document.querySelector("#burger");
const nav = document.querySelector("#nav");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modalBody");
const modalClose = document.querySelector("#modalClose");
const modalOverlay = document.querySelector("#modalOverlay");
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const tourSelect = document.querySelector("#tour");
const messageInput = document.querySelector("#message");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const phoneError = document.querySelector("#phoneError");
const tourError = document.querySelector("#tourError");
const messageError = document.querySelector("#messageError");
const formSuccess = document.querySelector("#formSuccess");

// Дані турів
const toursData = {
  1: {
    title: "Карпати: гори і полонини",
    days: "5 днів",
    from: "зі Львова",
    price: "від 6 900 ₴",
    description: "Класичний маршрут Карпатами: полонини, водоспади, гуцульські села та смачна домашня кухня. Підходить навіть для тих, хто вперше в горах.",
    includes: [
      "Проживання в садибах",
      "Сніданки та вечері",
      "Трансфер і супровід гіда",
      "Всі заплановані екскурсії",
    ],
  },
  2: {
    title: "Одеса: море і атмосфера",
    days: "4 дні",
    from: "з Києва",
    price: "від 5 400 ₴",
    description: "Прогулянки історичним центром, пляж, дегустації та вечірні набережні. Легкий і насичений тур для тих, хто хоче відчути дух Одеси.",
    includes: ["Готель 3*", "Сніданки", "Екскурсія містом", "Вільний час на пляжі"],
  },
  3: {
    title: "Львів: кава і легенди",
    days: "3 дні",
    from: "зі Львова",
    price: "від 3 800 ₴",
    description: "Найкращі кав'ярні, підземелля, легенди Старого міста та гастрономічні відкриття. Ідеальний короткий тур вихідного дня.",
    includes: [
      "Проживання в центрі",
      "Сніданки",
      "Оглядова екскурсія",
      "Дегустація кави та шоколаду",
    ],
  },
  4: {
    title: "Італія: Рим і Флоренція",
    days: "8 днів",
    from: "з Києва",
    price: "від 28 500 ₴",
    description: "Класична Італія: Колізей, Ватикан, галерея Уффіці та тосканська атмосфера. Група невелика, темп комфортний.",
    includes: [
      "Авіапереліт",
      "Готелі 3–4*",
      "Сніданки",
      "Трансфери та гіди",
      "Вхідні квитки на основні об'єкти",
    ],
  },
};

// Бургер меню
burger.addEventListener("click", () => {
  nav.classList.toggle("open");
  burger.classList.toggle("active");
  burger.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// Закриваємо меню при кліку на посилання
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Модалка (делегування подій)
const toursGrid = document.querySelector(".tours__grid");

toursGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".tour-btn");
  if (!btn) return;
  
  // Додано Number() як у викладача
  const id = Number(btn.dataset.id); 
  openModal(id);
});

function openModal(id) {
  const tour = toursData[id];
  if (!tour) return;

  // Використовуємо класи, які є у вашому CSS
  modalBody.innerHTML = `
    <h3>${tour.title}</h3>
    <p><strong>${tour.days}</strong> · ${tour.from}</p>
    <p>${tour.description}</p>
    <p class="modal-price">${tour.price}</p>
    <p><strong>У вартість входить:</strong></p>
    <ul class="modal-list">
      ${tour.includes.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <a href="#contact" class="btn" id="modalOrderBtn">Залишити заявку</a>
  `;

  // Прибираємо клас hidden, щоб показати модалку
  modal.classList.remove("hidden"); 
  document.body.style.overflow = "hidden";

  const orderBtn = document.querySelector("#modalOrderBtn");
  if (orderBtn) {
    orderBtn.addEventListener("click", closeModal);
  }
}

function closeModal() {
  // Додаємо клас hidden, щоб сховати модалку
  modal.classList.add("hidden"); 
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// FAQ акордеон
const faqItems = document.querySelectorAll(".faq__item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Форма
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  tourError.textContent = "";
  messageError.textContent = "";
  formSuccess.textContent = "";

  let isValid = true;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const tourValue = tourSelect.value;
  const messageValue = messageInput.value.trim();

  // Ім'я
  if (nameValue === "") {
    nameError.textContent = "Будь ласка, введіть ваше ім'я";
    isValid = false;
  } else if (nameValue.length < 2) {
    nameError.textContent = "Ім'я має містити щонайменше 2 символи";
    isValid = false;
  }

  // Email
  if (emailValue === "") {
    emailError.textContent = "Будь ласка, введіть email";
    isValid = false;
  } else if (!emailValue.includes("@")) {
    emailError.textContent = "Введіть коректний email (з @)";
    isValid = false;
  }

  // Телефон
  if (phoneValue !== "" && phoneValue.length < 10) {
    phoneError.textContent = "Введіть коректний номер телефону";
    isValid = false;
  }

  // Тур
  if (tourValue === "") {
    tourError.textContent = "Оберіть тур, який вас цікавить";
    isValid = false;
  }

  // Повідомлення
  if (messageValue === "") {
    messageError.textContent = "Будь ласка, напишіть повідомлення";
    isValid = false;
  }

  if (isValid) {
    const formData = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      tour: tourValue,
      message: messageValue,
    };

    localStorage.setItem("lastRequest", JSON.stringify(formData));

    formSuccess.textContent = "Дякуємо! Ваша заявка прийнята. Ми зв'яжемося з вами найближчим часом.";
    contactForm.reset();
  }
});