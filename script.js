/* ===============================
   SCROLL PROGRESS BAR (OPTIMIZED)
================================ */
let ticking = false;

function updateScrollIndicator() {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  const progressBar = document.getElementById("scroll-indicator");
  if (progressBar) progressBar.style.height = `${scrollPercent}%`;

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollIndicator);
    ticking = true;
  }
});

/* ===============================
   LOADING ANIMATION
================================ */
const letters = document.querySelectorAll(".loading-text span");

gsap.to(letters, {
  opacity: 1,
  duration: 1.2,
  stagger: 0.15,
  onComplete: () => {
    gsap.to("#loading", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      onComplete: () => {
        document.getElementById("loading").style.display = "none";
      }
    });
  }
});

/* ===============================
   HERO + SCROLL ANIMATIONS
================================ */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".journey-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 80,
    duration: 0.6,
    ease: "power3.out",
    delay: i * 0.1,
    scrollTrigger: {
      trigger: card,
      start: "top 85%"
    }
  });
});

gsap.utils.toArray(".reveal-section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    }
  });
});

/* ===============================
   PARTICLES (SAFE INIT)
================================ */
if (window.particlesJS) {
  particlesJS("particles-hero", {
    particles: {
      number: { value: 120 },
      color: { value: "#ffffff" },
      opacity: { value: 0.6 },
      size: { value: 3, random: true },
      move: { enable: true, speed: 1 }
    },
    retina_detect: true
  });
}

/* ===============================
   CONTACT FORM + PLANE + TOAST
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.querySelector(".ai-toast");
  const contactSection = document.getElementById("contact-form");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✈️ Plane animation
    submitBtn.classList.add("sending");

    // 🧠 Glow while sending
    contactSection.classList.add("ai-thinking");

    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form failed");

      form.reset();
      showToast("✅ Message sent successfully");

      // Future AI backend hook (safe)
      notifyAI(formData);

    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("sending");
      contactSection.classList.remove("ai-thinking");
    }
  });

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }
});

/* ===============================
   AI NOTIFY (SAFE STUB)
================================ */
async function notifyAI(formData) {
  try {
    await fetch("https://YOUR-AI-ENDPOINT/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
      })
    });
  } catch {
    // silent fail
  }
}

/* ===============================
   BACK TO TOP
================================ */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
