
// ==========================================
// 📱 НОМЕР WHATSAPP САЛОНА
// ✏️ Если номер изменится — поменяй здесь
// ==========================================
const WHATSAPP = "996550499633";

// Открытие WhatsApp с готовым сообщением
function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ==========================================
// МОБИЛЬНОЕ МЕНЮ
// ==========================================
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// ==========================================
// ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
// ==========================================
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("visible");
  });
}

// ==========================================
// КНОПКИ ЗАПИСИ НА УСЛУГИ
// ==========================================
document.querySelectorAll(".service-book").forEach(button => {
  button.addEventListener("click", () => {
    const service = button.dataset.service;
    const select = document.querySelector("#clientService");

    const matchingOption = [...select.options].find(option => {
      return option.textContent === service;
    });

    select.value = matchingOption
      ? matchingOption.value
      : "Другая услуга";

    document.querySelector("#booking").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ==========================================
// 🎓 КНОПКИ ЗАПИСИ НА ОБУЧЕНИЕ
// ==========================================
document.querySelectorAll(".course-button").forEach(button => {
  button.addEventListener("click", () => {
    const course = button.dataset.course;

    const message =
      `Здравствуйте! 💗\n` +
      `Меня интересует обучение в SOGDIANA SCHOOL.\n\n` +
      `Направление: ${course}\n\n` +
      `Подскажите, пожалуйста, стоимость, длительность ` +
      `и ближайшую дату начала обучения.`;

    openWhatsApp(message);
  });
});

// ==========================================
// 📅 МИНИМАЛЬНАЯ ДАТА ЗАПИСИ — СЕГОДНЯ
// ==========================================
const dateInput = document.querySelector("#clientDate");

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.min = getLocalDateString(new Date());

// ==========================================
// 📱 ФОРМА ЗАПИСИ В WHATSAPP
// ==========================================
document.querySelector("#bookingForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#clientName").value.trim();
  const service = document.querySelector("#clientService").value;
  const date = document.querySelector("#clientDate").value;
  const time = document.querySelector("#clientTime").value;

  if (!name || !service || !date || !time) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  if (date < getLocalDateString(new Date())) {
    alert("Выберите сегодняшнюю или будущую дату.");
    return;
  }

  if (time < "09:00" || time > "19:00") {
    alert("Выберите время с 09:00 до 19:00.");
    return;
  }

  const formattedDate = date.split("-").reverse().join(".");

  const message =
    `Здравствуйте! 💗\n` +
    `Хочу записаться в SOGDIANA SALON.\n\n` +
    `Имя: ${name}\n` +
    `Услуга: ${service}\n` +
    `Дата: ${formattedDate}\n` +
    `Время: ${time}\n\n` +
    `Подскажите, пожалуйста, свободно ли это время?`;

  openWhatsApp(message);
});

// ==========================================
// 🎬 ВИДЕО: ПОКАЗАТЬ ФОТО, ЕСЛИ ВИДЕО НЕТ
// ==========================================
document.querySelectorAll("video").forEach(video => {
  const poster = video.getAttribute("poster");

  function showPoster() {
    if (!poster || video.dataset.fallback === "true") return;

    video.dataset.fallback = "true";

    const image = document.createElement("img");
    image.src = poster;
    image.alt = "Фото обучения";
    image.loading = "lazy";
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";

    video.replaceWith(image);
  }

  video.addEventListener("error", showPoster);
  video.querySelectorAll("source").forEach(source => {
    source.addEventListener("error", showPoster);
  });
});

// ==========================================
// 🎬 ЭКОНОМИЯ РЕСУРСОВ:
// ВИДЕО ИГРАЮТ ТОЛЬКО КОГДА ВИДНЫ
// ==========================================
if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("video").forEach(video => {
    videoObserver.observe(video);
  });
}
