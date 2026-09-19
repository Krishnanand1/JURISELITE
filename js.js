const lawyersData = [
  {
    id: 1,
    name: "Adv. Rajesh Sharma",
    title: "Senior Corporate & M&A Specialist",
    location: "Mumbai, Maharashtra",
    practiceArea: "Corporate Law",
    hourlyRate: 5000,
    consultationFee: 15000,
    retainerFee: 250000,
    experience: 18,
    winRate: 96,
    rating: 4.9,
    reviewsCount: 142,
    badge: "VIP Featured",
  },
  {
    id: 2,
    name: "Adv. Priya Venkatesh",
    title: "Supreme Court & IP Litigation",
    location: "New Delhi, Delhi",
    practiceArea: "Intellectual Property",
    hourlyRate: 4500,
    consultationFee: 12500,
    retainerFee: 180000,
    experience: 14,
    winRate: 94,
    rating: 4.8,
    reviewsCount: 98,
    badge: "Top Rated",
  },
  {
    id: 3,
    name: "Adv. Vikramaditya Reddy",
    title: "Cyber Law & Financial Crimes",
    location: "Bengaluru, Karnataka",
    practiceArea: "Criminal Defense",
    hourlyRate: 3500,
    consultationFee: 10000,
    retainerFee: 150000,
    experience: 12,
    winRate: 92,
    rating: 4.9,
    reviewsCount: 115,
    badge: "Verified VIP",
  },
  {
    id: 4,
    name: "Adv. Ananya Deshmukh",
    title: "Real Estate & Title Verification Specialist",
    location: "Mumbai, Maharashtra",
    practiceArea: "Property Law",
    hourlyRate: 4000,
    consultationFee: 11000,
    retainerFee: 175000,
    experience: 15,
    winRate: 98,
    rating: 4.9,
    reviewsCount: 130,
    badge: "Property Expert",
  },
  {
    id: 5,
    name: "Adv. Siddharth Kapoor",
    title: "Civil & Commercial Litigation",
    location: "High Court, Delhi",
    practiceArea: "Civil Lawyer",
    hourlyRate: 3800,
    consultationFee: 9500,
    retainerFee: 140000,
    experience: 11,
    winRate: 91,
    rating: 4.7,
    reviewsCount: 84,
    badge: "Litigation Pro",
  },
  {
    id: 6,
    name: "Adv. Meera Nair",
    title: "Family Court & Mediation Specialist",
    location: "Kochi, Kerala",
    practiceArea: "Family Law",
    hourlyRate: 3200,
    consultationFee: 8000,
    retainerFee: 120000,
    experience: 13,
    winRate: 95,
    rating: 4.8,
    reviewsCount: 106,
    badge: "Family Advocate",
  },
];

// Format currency into INR
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Theme Toggle Handler (Strict Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem("appTheme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
}

function applyTheme(mode) {
  const lightIcon = document.getElementById("themeIconLight");
  const darkIcon = document.getElementById("themeIconDark");

  if (mode === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("appTheme", "dark");
    if (lightIcon && darkIcon) {
      lightIcon.classList.remove("hidden");
      lightIcon.classList.add("flex");
      darkIcon.classList.add("hidden");
      darkIcon.classList.remove("flex");
    }
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("appTheme", "light");
    if (lightIcon && darkIcon) {
      lightIcon.classList.add("hidden");
      lightIcon.classList.remove("flex");
      darkIcon.classList.remove("hidden");
      darkIcon.classList.add("flex");
    }
  }
}

// Render Lawyer Cards
function renderLawyers(list) {
  const grid = document.getElementById("lawyersGrid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-slate-500">No advocates matched your search query.</div>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (lawyer) => `
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-cream-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <div>
                                <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 mb-1.5 border border-gold-500/20">${lawyer.badge}</span>
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">${lawyer.name}</h3>
                                <p class="text-xs font-medium text-gold-600 dark:text-gold-400">${lawyer.title}</p>
                                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1"><i class="fa-solid fa-location-dot text-amber-500 mr-1"></i> ${lawyer.location} • ${lawyer.experience}+ Yrs Exp.</p>
                            </div>
                            <div class="text-right">
                                <span class="text-base font-extrabold text-slate-900 dark:text-white">${formatINR(lawyer.hourlyRate)}</span>
                                <span class="block text-[10px] text-slate-400">/ hour</span>
                            </div>
                        </div>

                        <!-- Stats Banner -->
                        <div class="grid grid-cols-2 gap-2 my-4 p-3 bg-cream-50 dark:bg-slate-900/60 rounded-xl text-xs">
                            <div>
                                <span class="block text-[10px] text-slate-400 uppercase font-semibold">Consultation</span>
                                <span class="font-bold text-slate-800 dark:text-slate-200">${formatINR(lawyer.consultationFee)}</span>
                            </div>
                            <div>
                                <span class="block text-[10px] text-slate-400 uppercase font-semibold">Retainer Fee</span>
                                <span class="font-bold text-slate-800 dark:text-slate-200">${formatINR(lawyer.retainerFee)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-cream-200 dark:border-slate-700 flex items-center justify-between">
                        <div class="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            ★ ${lawyer.rating} <span class="text-slate-400 font-normal">(${lawyer.reviewsCount} reviews)</span>
                        </div>
                        <button onclick="openBookingModal('${lawyer.name}', '${lawyer.title}')" class="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-sm hover:brightness-110 transition">
                            Book Consult
                        </button>
                    </div>
                </div>
            `,
    )
    .join("");
}

// Apply Search & Practice Filters
function applyFilters() {
  const query = (
    document.getElementById("searchInput")?.value || ""
  ).toLowerCase();
  const practice = document.getElementById("practiceFilter")?.value || "All";
  const sort = document.getElementById("sortSelect")?.value || "rating";

  let filtered = lawyersData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query);
    const matchesPractice =
      practice === "All" ||
      item.practiceArea.toLowerCase().includes(practice.toLowerCase());
    return matchesSearch && matchesPractice;
  });

  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "winRate") filtered.sort((a, b) => b.winRate - a.winRate);
  if (sort === "priceLow") filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
  if (sort === "priceHigh")
    filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);

  renderLawyers(filtered);
}

// Modal Controls
function openBookingModal(lawyerName, specialty) {
  document.getElementById("modalLawyerName").innerText = lawyerName;
  document.getElementById("modalLawyerSpecialty").innerText = specialty;
  document.getElementById("bookingModal").classList.remove("hidden");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.add("hidden");
}

function handlePracticeConsult(practiceName) {
  const select = document.getElementById("practiceFilter");
  if (select) {
    select.value = practiceName;
    applyFilters();
  }
  document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
}

function confirmBooking(e) {
  e.preventDefault();
  closeBookingModal();
  showNotification(
    "Consultation request successfully logged! Advocate desk will confirm your slot within 30 mins.",
  );
}

function handleVipSubmit(e) {
  e.preventDefault();
  e.target.reset();
  showNotification(
    "VIP Concierge request received. Senior partner callback scheduled within 60 mins.",
  );
}

function toggleMobileMenu() {
  document.getElementById("mobileMenu")?.classList.toggle("hidden");
}

function showNotification(msg) {
  const toast = document.createElement("div");
  toast.className =
    "fixed top-24 right-6 z-50 bg-slate-900 text-white border border-gold-500/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Embedded n8n Chatbot Logic
const N8N_WEBHOOK_URL =
  "https://tempaccount1.app.n8n.cloud/webhook/37510501-4d4e-436c-9082-586f9cb48a3b/chat";
let sessionId = localStorage.getItem("n8nSessionId");
if (!sessionId) {
  sessionId = "session_" + Math.random().toString(36).substring(2, 9);
  localStorage.setItem("n8nSessionId", sessionId);
}

function toggleChatWindow() {
  document.getElementById("chatWindow")?.classList.toggle("hidden");
}

function sendQuickPrompt(text) {
  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.value = text;
    handleChatSubmit(new Event("submit"));
  }
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const messagesContainer = document.getElementById("chatMessages");
  if (!input || !messagesContainer || !input.value.trim()) return;

  const userText = input.value.trim();
  input.value = "";

  // User Message Bubble
  messagesContainer.innerHTML += `
                <div class="bg-gold-500/20 text-slate-900 dark:text-white p-3 rounded-2xl max-w-[85%] ml-auto text-right">
                    ${userText}
                </div>
            `;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Typing Indicator
  const typingId = "typing_" + Date.now();
  messagesContainer.innerHTML += `
                <div id="${typingId}" class="bg-cream-100 dark:bg-slate-800 p-3 rounded-2xl max-w-[85%] text-slate-400 flex items-center gap-1">
                    <i class="fa-solid fa-circle-notch animate-spin text-gold-500"></i> Consulting JurisBot AI...
                </div>
            `;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "sendMessage",
        sessionId: sessionId,
        chatInput: userText,
        message: userText,
      }),
    });

    document.getElementById(typingId)?.remove();

    if (response.ok) {
      const data = await response.json();
      let botReply =
        data.output ||
        data.text ||
        data.message ||
        "Thank you. Our legal advisor has logged your query.";
      messagesContainer.innerHTML += `
                        <div class="bg-cream-100 dark:bg-slate-800 p-3 rounded-2xl max-w-[85%] text-slate-800 dark:text-slate-200">
                            ${botReply}
                        </div>
                    `;
    } else {
      throw new Error("n8n Webhook connection issue");
    }
  } catch (err) {
    document.getElementById(typingId)?.remove();
    messagesContainer.innerHTML += `
                    <div class="bg-cream-100 dark:bg-slate-800 p-3 rounded-2xl max-w-[85%] text-slate-800 dark:text-slate-200">
                        I've recorded your query regarding "<strong>${userText}</strong>". An advocate coordinator from our VIP team will connect with you shortly!
                    </div>
                `;
  }
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderLawyers(lawyersData);

  document
    .getElementById("searchInput")
    ?.addEventListener("input", applyFilters);
});
