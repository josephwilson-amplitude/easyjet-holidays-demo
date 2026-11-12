/* easyJet holidays — Amplitude demo site. Plain JS, no build step. */

// ---------- Config ----------
const FLAG_KEY = "luggage-prices-compared-reduction";
const HOLD_BAG = 88.98;        // 15kg hold bag, per bag, return
const CABIN_BAG = 33.99;       // large cabin bag + Speedy Boarding, per person, per flight
const DEPOSIT_PP = 60;
const NIGHTS = 3;

// ---------- Catalogue ----------
const HOTELS = [
  { id: "ITEM_001", name: "Zaan Hotel Amsterdam Zaandam", city: "Amsterdam", country: "Netherlands", type: "City breaks", stars: 4, ta: 4.3, reviews: 2846, pp: 287, taxes: 26, flight: "morning", ph: "amsterdam", blurb: "Striking modern hotel a short train ride from Amsterdam Centraal, next to the famous green Zaandam houses." },
  { id: "ITEM_002", name: "Canal Ring Boutique Hotel", city: "Amsterdam", country: "Netherlands", type: "City breaks", stars: 4, ta: 4.6, reviews: 1980, pp: 349, taxes: 38, flight: "afternoon", ph: "amsterdam", blurb: "Townhouse rooms overlooking the Herengracht, five minutes' walk to the Nine Streets." },
  { id: "ITEM_003", name: "IJ Waterfront Hotel", city: "Amsterdam", country: "Netherlands", type: "City breaks", stars: 4, ta: 4.4, reviews: 1312, pp: 318, taxes: 34, flight: "evening", ph: "amsterdam", blurb: "Sleek harbourside hotel with river views and a free ferry across to Noord." },
  { id: "ITEM_004", name: "Hôtel Marais Belle Époque", city: "Paris", country: "France", type: "City breaks", stars: 3, ta: 4.1, reviews: 964, pp: 264, taxes: 18, flight: "morning", ph: "paris", blurb: "Classic Parisian rooms in the heart of Le Marais, steps from Place des Vosges." },
  { id: "ITEM_005", name: "Hôtel Rive Gauche Saint-Germain", city: "Paris", country: "France", type: "City breaks", stars: 4, ta: 4.5, reviews: 1421, pp: 392, taxes: 24, flight: "afternoon", ph: "paris", blurb: "Left Bank charm with a courtyard breakfast room, a stroll from the Seine." },
  { id: "ITEM_006", name: "Trastevere Corte Hotel", city: "Rome", country: "Italy", type: "City breaks", stars: 3, ta: 4.2, reviews: 1107, pp: 239, taxes: 30, flight: "morning", ph: "rome", blurb: "Terracotta-walled rooms on a cobbled lane in Rome's liveliest neighbourhood." },
  { id: "ITEM_007", name: "Quirinale Vista Hotel", city: "Rome", country: "Italy", type: "City breaks", stars: 4, ta: 4.4, reviews: 2210, pp: 301, taxes: 36, flight: "evening", ph: "rome", blurb: "Rooftop terrace views over the domes, ten minutes to the Trevi Fountain." },
  { id: "ITEM_008", name: "Old Town Square Residence", city: "Prague", country: "Czech Republic", type: "City breaks", stars: 4, ta: 4.5, reviews: 1789, pp: 171, taxes: 12, flight: "morning", ph: "prague", blurb: "Baroque building right by the Astronomical Clock, with a cosy cellar bar." },
  { id: "ITEM_009", name: "Vltava Riverside Hotel", city: "Prague", country: "Czech Republic", type: "City breaks", stars: 3, ta: 3.9, reviews: 856, pp: 149, taxes: 10, flight: "afternoon", ph: "prague", blurb: "Great-value rooms on the river with Charles Bridge a short walk away." },
  { id: "ITEM_010", name: "Gothic Quarter Suites", city: "Barcelona", country: "Spain", type: "City breaks", stars: 4, ta: 4.3, reviews: 2034, pp: 298, taxes: 28, flight: "morning", ph: "barcelona", blurb: "Stylish suites hidden in the Barri Gòtic, close to La Rambla and the cathedral." },
  { id: "ITEM_011", name: "Eixample Garden Hotel", city: "Barcelona", country: "Spain", type: "City breaks", stars: 3, ta: 4.0, reviews: 1176, pp: 256, taxes: 22, flight: "evening", ph: "barcelona", blurb: "Leafy courtyard pool and easy walks to Casa Batlló and Passeig de Gràcia." },
  { id: "ITEM_012", name: "Palmanova Bay Resort", city: "Majorca", country: "Spain", type: "Beach holidays", stars: 4, ta: 4.4, reviews: 2130, pp: 762, taxes: 0, flight: "morning", ph: "majorca", blurb: "Beachfront resort with three pools and a kids' club on the Bay of Palma." },
  { id: "ITEM_013", name: "Paphos Coral Hotel", city: "Paphos", country: "Cyprus", type: "All inclusive", stars: 4, ta: 4.5, reviews: 3118, pp: 576, taxes: 0, flight: "afternoon", ph: "paphos", blurb: "All inclusive seafront stay with a spa, five restaurants and sunset views." },
  { id: "ITEM_014", name: "St Julians Sea View Hotel", city: "Malta", country: "Malta", type: "Beach holidays", stars: 5, ta: 4.2, reviews: 762, pp: 862, taxes: 0, flight: "evening", ph: "malta", blurb: "Five-star rooftop infinity pool above Spinola Bay." },
  { id: "ITEM_015", name: "Costa Blanca All Inclusive Resort", city: "Benidorm", country: "Spain", type: "All inclusive", stars: 4, ta: 4.1, reviews: 2477, pp: 498, taxes: 0, flight: "morning", ph: "beach", blurb: "Family-friendly all inclusive with waterslides and evening entertainment." },
];
const CITIES = ["Amsterdam", "Paris", "Rome", "Prague", "Barcelona"];
const TYPES = ["City breaks", "Beach holidays", "All inclusive"];
const AIRPORTS = ["London Luton", "London Gatwick", "London Stansted", "Manchester", "Bristol", "Edinburgh", "Belfast"];
const DATES = [
  { v: "2026-12-04", label: "Thu 4 Dec – Sun 7 Dec 2026" },
  { v: "2026-12-11", label: "Fri 11 Dec – Mon 14 Dec 2026" },
  { v: "2027-01-15", label: "Fri 15 Jan – Mon 18 Jan 2027" },
  { v: "2027-02-12", label: "Fri 12 Feb – Mon 15 Feb 2027" },
];
const FLIGHT_SLOTS = {
  morning:   { out: "06:45", back: "08:20" },
  afternoon: { out: "13:10", back: "15:05" },
  evening:   { out: "18:55", back: "20:40" },
};
const ROOMS = [
  { id: "standard", label: "Standard Double Room", pp: 0 },
  { id: "superior", label: "Superior Double Room", pp: 30 },
  { id: "suite", label: "Junior Suite", pp: 75 },
];
const BOARDS = [
  { id: "ro", label: "Room Only", pp: 0 },
  { id: "bb", label: "Bed and Breakfast", pp: 24 },
];
const PROMOS = {
  BLACKFRIDAY: { pct: 0.10, cap: 200, min: 500, desc: "10% off your holiday (up to £200, min spend £500)" },
  EXPLORE50:   { fixed: 50, min: 0, desc: "£50 off your holiday" },
};

const hotelById = (id) => HOTELS.find((h) => h.id === id) || HOTELS[0];

// ---------- Storage ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} },
};
const todayStr = () => new Date().toISOString().split("T")[0];

// ---------- Formatting ----------
const r2 = (n) => Math.round(n * 100) / 100;
const money = (n) => "£" + (Number.isInteger(r2(n)) ? r2(n).toLocaleString("en-GB") : r2(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const starStr = (n) => "★".repeat(n);
const taDots = (r) => { const full = Math.round(r * 2) / 2; let s = ""; for (let i = 1; i <= 5; i++) s += i <= full ? "●" : (i - 0.5 === full ? "◐" : "○"); return s; };
const qs = (k) => new URLSearchParams(location.search).get(k);
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------- Identity ----------
function generateUserId(name, demoNumber) {
  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '') || 'user';
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return `${clean}_${demoNumber}_${today}`;   // e.g. "joe_1_20260820"
}
function currentUser() {
  const u = store.get("ejh_user", null);
  if (u && u.date === todayStr()) return u;
  if (u) store.del("ejh_user");
  return null;
}
function login(name, demo) {
  const userId = generateUserId(name, demo);
  store.set("ejh_user", { name: name.trim() || "Guest", demo, userId, date: todayStr() });
  if (window.amplitude) amplitude.setUserId(userId);
  renderHeader();
  return userId;
}
function logout() {
  track("session_ended", { is_returning: isReturning(), basket_total: basketTotal() });
  store.del("ejh_user");
  if (window.amplitude) amplitude.reset();
  renderHeader();
}

// ---------- Visits / bookings ----------
(function countVisit() {
  try {
    if (!sessionStorage.getItem("ejh_counted")) {
      sessionStorage.setItem("ejh_counted", "1");
      store.set("ejh_visits", store.get("ejh_visits", 0) + 1);
    }
  } catch (e) {}
})();
const isReturning = () => store.get("ejh_visits", 0) > 1;
function bookingCount() { const u = currentUser(); return u ? (store.get("ejh_bookings", {})[u.userId] || 0) : 0; }

// ---------- Experiment: early luggage selection ----------
// Treatment is on when <html> has class "exp-bags". It gets there from ?variant=treatment,
// the Amplitude Experiment flag, or a Web Experiment variant (class change or ejh.setVariant).
const isTreatment = () => document.documentElement.classList.contains("exp-bags");
function setVariant(v) {
  store.set("ejh_variant_src", "manual");
  try { localStorage.setItem("ejh_variant", v); } catch (e) {}
  document.documentElement.classList.toggle("exp-bags", v === "treatment");
}
function resolveFlag() {
  // Amplitude Experiment client, if one is exposed on the page.
  try {
    const exp = window.experiment || (window.amplitude && window.amplitude.experiment);
    if (exp && typeof exp.variant === "function") {
      const v = exp.variant(FLAG_KEY);
      if (v && v.value) document.documentElement.classList.toggle("exp-bags", v.value === "treatment");
    }
  } catch (e) {}
}
const search = () => Object.assign({ from: "London Luton", to: "Amsterdam", date: DATES[0].v, adults: 2, bags: false }, store.get("ejh_search", {}));
const saveSearch = (s) => store.set("ejh_search", s);
const bagsOn = () => isTreatment() && !!search().bags;
const bagCostKnown = () => bagsOn();

// ---------- Analytics ----------
function track(name, props = {}) {
  const p = JSON.parse(JSON.stringify(props));
  if (window.amplitude) amplitude.track(name, p);
  logEvent(name, p);
}
async function trackThenGo(name, props, url) {
  const p = JSON.parse(JSON.stringify(props));
  logEvent(name, p);
  if (window.amplitude) {
    const res = amplitude.track(name, p);
    if (res && res.promise) await Promise.race([res.promise, new Promise((r) => setTimeout(r, 400))]);
  }
  location.href = url;
}
// Small on-page event stream for presenting: add ?debug=1 once to switch it on, ?debug=0 to hide.
function logEvent(name, props) {
  console.log("[amplitude]", name, props);
  const d = qs("debug"); if (d !== null) store.set("ejh_debug", d === "1");
  if (!store.get("ejh_debug", false)) return;
  let box = $("#ev-log");
  if (!box) {
    box = document.createElement("div");
    box.id = "ev-log";
    box.style.cssText = "position:fixed;right:12px;bottom:12px;width:320px;max-height:40vh;overflow:auto;background:rgba(20,10,4,.92);color:#fff;font:12px ui-monospace,Menlo,monospace;padding:10px;z-index:70;border-radius:6px";
    document.body.appendChild(box);
  }
  const row = document.createElement("div");
  row.style.cssText = "border-top:1px solid #444;padding:6px 0";
  row.innerHTML = `<b style="color:#FF7D00">${esc(name)}</b><br>${esc(JSON.stringify(props))}`;
  box.prepend(row);
}

// ---------- Saved hotels ----------
const savedIds = () => store.get("ejh_saved", []);
function toggleSave(id, btn) {
  const s = savedIds();
  const h = hotelById(id);
  if (s.includes(id)) {
    store.set("ejh_saved", s.filter((x) => x !== id));
  } else {
    store.set("ejh_saved", [...s, id]);
    track("Hotel Saved", { hotel_id: h.id, destination: h.city, holiday_type: h.type, package_price: packagePriceFor(h), tripadvisor_rating: h.ta });
    flash("Added to your shortlist");
  }
  if (btn) paintHeart(btn, id);
  renderHeader();
}
function heartBtn(id) { return `<button class="heart" data-heart="${id}" aria-label="Add this holiday to my shortlist" title="Add this holiday to my shortlist">${savedIds().includes(id) ? "♥" : "♡"}</button>`; }
function paintHeart(btn, id) { btn.textContent = savedIds().includes(id) ? "♥" : "♡"; }
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-heart]");
  if (b) { e.preventDefault(); e.stopPropagation(); toggleSave(b.dataset.heart, b); }
});

// ---------- Pricing ----------
function packagePriceFor(h, adults = search().adults) { return r2(h.pp * adults); }
function ppDisplay(h) { return h.pp + (bagsOn() ? HOLD_BAG : 0); }

function defaultBasket(h) {
  const s = search();
  return { hotel_id: h.id, room: "standard", board: "ro", flight: h.flight, adults: s.adults, from: s.from, date: s.date,
           package_price: packagePriceFor(h, s.adults), hotel_taxes: h.taxes,
           hold_bags: bagsOn() ? s.adults : 0, cabin_bags: 0, seats: "random", transfer: "none", promo: null, bags_preadded: bagsOn() };
}
function basket() { const b = store.get("ejh_basket", null); return b || defaultBasket(HOTELS[0]); }
const saveBasket = (b) => store.set("ejh_basket", b);
function calcPackage(h, b) {
  const room = ROOMS.find((x) => x.id === b.room) || ROOMS[0];
  const board = BOARDS.find((x) => x.id === b.board) || BOARDS[0];
  const fl = b.flight === "afternoon" ? 12 : b.flight === "evening" ? -8 : 0;
  return r2((h.pp + room.pp + board.pp + fl) * b.adults);
}
function extrasLines(b) {
  const lines = [];
  if (b.hold_bags) lines.push({ label: `${b.hold_bags} x 15kg hold bag`, amt: r2(b.hold_bags * HOLD_BAG) });
  if (b.cabin_bags) lines.push({ label: `${b.cabin_bags} x Large cabin bag + Speedy Boarding (2 flights)`, amt: r2(b.cabin_bags * CABIN_BAG * 2) });
  if (b.seats === "standard") lines.push({ label: `Standard seats (${b.adults} x 2 flights)`, amt: r2(b.adults * 7.99 * 2) });
  if (b.seats === "legroom") lines.push({ label: `Extra legroom seats (${b.adults} x 2 flights)`, amt: r2(b.adults * 19.99 * 2) });
  if (b.transfer === "shared") lines.push({ label: "Shared airport transfer", amt: r2(b.adults * 18) });
  if (b.transfer === "private") lines.push({ label: "Private airport transfer", amt: 89 });
  return lines;
}
function promoSaving(b, subtotal) {
  if (!b.promo || !b.promo.applied) return 0;
  const p = PROMOS[b.promo.code]; if (!p) return 0;
  if (subtotal < p.min) return 0;
  return r2(p.pct ? Math.min(subtotal * p.pct, p.cap) : p.fixed);
}
// basket_total: everything in the basket this session (package + chosen extras), before taxes and promo.
function basketTotal(b = store.get("ejh_basket", null)) {
  if (!b) return 0;
  return r2(b.package_price + extrasLines(b).reduce((a, l) => a + l.amt, 0));
}
function grandTotal(b) { const bt = basketTotal(b); return r2(bt + b.hotel_taxes - promoSaving(b, bt)); }
const holdBagCost = (b) => r2(b.hold_bags * HOLD_BAG);

// ---------- Shared chrome ----------
function renderHeader() {
  const el = $("#site-header"); if (!el) return;
  const u = currentUser();
  const saved = savedIds().length;
  el.innerHTML = `
  <header class="site-header"><div class="wrap">
    <a class="logo" href="./index.html" aria-label="easyJet holidays home"><span class="mark">easyJet</span><span class="word">holidays</span></a>
    <nav class="nav">
      <a href="./results.html?deal=blackfriday">Deals</a>
      <a href="./results.html">Holidays</a>
      <a href="./results.html?type=City%20breaks">Destinations</a>
      <a class="no-caret" href="./index.html">Flights</a>
      <a href="./index.html#why">Extras</a>
      <a href="./index.html#why">Info</a>
    </nav>
    <div class="icons">
      ${u ? `<a class="user-chip" href="./account.html" title="${esc(u.userId)}">Hi, ${esc(u.name.split(" ")[0])}</a>`
          : `<button class="icon-btn" id="hdr-login" title="Log in">👤</button>`}
      <a class="icon-btn" href="./account.html#shortlist" title="My shortlist">♡${saved ? `<span class="count">${saved}</span>` : ""}</a>
      <a class="icon-btn" href="./index.html#why" title="Help">?</a>
    </div>
  </div></header>`;
  const lb = $("#hdr-login"); if (lb) lb.onclick = () => openLogin();
}
function renderFooter() {
  const el = $("#site-footer"); if (!el) return;
  el.innerHTML = `<footer class="site-footer"><div class="wrap cols">
    <div><b>easyJet holidays</b>Flights, hotel &amp; luggage in one package<br>All our holidays are ATOL protected</div>
    <div><b>Book with confidence</b>£60pp deposits<br>Best price guarantee<br>Freedom to change</div>
    <div><b>Demo</b>Built to showcase Amplitude.<br>Not affiliated with or endorsed by easyJet.<br><a href="./account.html">Demo account</a></div>
  </div></footer>`;
}
function flash(msg) {
  const f = document.createElement("div"); f.className = "flash"; f.textContent = msg;
  document.body.appendChild(f); setTimeout(() => f.remove(), 1800);
}
function progressBar(active) {
  const steps = ["Holiday", "Extras", "Guests", "Payment"];
  const i = steps.indexOf(active);
  return `<div class="progress">${steps.map((s, n) => `${n ? `<div class="bar ${n <= i ? "done" : ""}"></div>` : ""}<div class="step ${n < i ? "done" : n === i ? "active" : ""}"><span class="n">${n < i ? "✓" : n + 1}</span><span class="lbl">${s}</span></div>`).join("")}</div>`;
}

// ---------- Login modal ----------
function openLogin(onDone, reason) {
  const bg = document.createElement("div");
  bg.className = "modal-bg";
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="lg-t">
    <button class="close" aria-label="Close">×</button>
    <h2 id="lg-t">Log in to your account</h2>
    <p class="muted small">${esc(reason || "Save holidays and enjoy a faster checkout.")}</p>
    <label class="field"><span>Your name</span><input id="lg-name" autocomplete="off" placeholder="e.g. Joe"></label>
    <label class="field"><span>Demo number</span><input id="lg-demo" type="number" min="1" value="1"></label>
    <div class="small muted" style="margin-bottom:6px">Amplitude user ID</div>
    <div class="id-preview" id="lg-id"></div>
    <p class="small muted">Same name and number gives the same ID on any device today.</p>
    <button class="btn block" id="lg-go">Log in</button>
  </div>`;
  document.body.appendChild(bg);
  const name = $("#lg-name", bg), demo = $("#lg-demo", bg), out = $("#lg-id", bg);
  const upd = () => { out.textContent = generateUserId(name.value, demo.value || 1); };
  name.oninput = demo.oninput = upd; upd(); name.focus();
  const close = () => bg.remove();
  $(".close", bg).onclick = close;
  bg.onclick = (e) => { if (e.target === bg) close(); };
  const go = () => { login(name.value, demo.value || 1); close(); flash("You're logged in"); if (onDone) onDone(); };
  $("#lg-go", bg).onclick = go;
  bg.onkeydown = (e) => { if (e.key === "Enter") go(); if (e.key === "Escape") close(); };
}
function loginToast() {
  if (currentUser() || sessionStorage.getItem("ejh_toast")) return;
  const t = document.createElement("div"); t.className = "toast";
  t.innerHTML = `<button class="close" aria-label="Close">×</button><h3>Log in to your account</h3><p>Save holidays and enjoy a faster checkout</p><button class="btn block small">Log in</button>`;
  document.body.appendChild(t);
  const done = () => { sessionStorage.setItem("ejh_toast", "1"); t.remove(); };
  $(".close", t).onclick = done;
  $(".btn", t).onclick = () => { done(); openLogin(); };
}

// ---------- Search form (index + results) ----------
function searchFormHtml(compact) {
  const s = search();
  return `<div class="search-card"><div class="search-grid">
    <label class="field"><span>From</span><select id="sf-from">${AIRPORTS.map((a) => `<option ${a === s.from ? "selected" : ""}>${a}</option>`).join("")}</select></label>
    <label class="field"><span>To</span><input id="sf-to" list="sf-dest" value="${esc(s.to)}" placeholder="Find destinations"><datalist id="sf-dest">${[...CITIES, "Majorca", "Paphos", "Malta", "Benidorm"].map((c) => `<option value="${c}">`).join("")}</datalist></label>
    <label class="field"><span>When</span><select id="sf-date">${DATES.map((d) => `<option value="${d.v}" ${d.v === s.date ? "selected" : ""}>${d.label}</option>`).join("")}</select></label>
    <label class="field"><span>Who</span><select id="sf-who">${[1, 2, 3, 4].map((n) => `<option value="${n}" ${n === s.adults ? "selected" : ""}>${n} adult${n > 1 ? "s" : ""}</option>`).join("")}</select></label>
    <button class="btn" id="sf-go">${compact ? "Update search" : "Search"}</button>
  </div>
  <div class="search-meta">
    <a href="./index.html" id="sf-new">Start new search</a>
    <label class="bag-toggle exp-only" title="Show prices with hold luggage included"><input type="checkbox" id="sf-bags" ${s.bags ? "checked" : ""}><span class="sw"></span>Do you need hold bags?</label>
    <span>✓ ATOL protected &nbsp; ✓ £60pp deposits</span>
  </div></div>`;
}
function readSearchForm() {
  const s = search();
  s.from = $("#sf-from").value; s.to = $("#sf-to").value.trim(); s.date = $("#sf-date").value;
  s.adults = parseInt($("#sf-who").value, 10); s.bags = $("#sf-bags").checked;
  saveSearch(s); return s;
}
function matchHotels(to, type) {
  const t = (to || "").toLowerCase();
  return HOTELS.filter((h) => (!type || h.type === type) &&
    (!t || t === "anywhere" || [h.city, h.country, h.name].some((x) => x.toLowerCase().includes(t))));
}
function bindSearchForm() {
  $("#sf-go").onclick = () => {
    const s = readSearchForm();
    const found = matchHotels(s.to, null);
    const dest = found[0] ? found[0].city : s.to;
    trackThenGo("Holiday Searched", {
      filter_value: s.to, destination: dest, holiday_type: found[0] ? found[0].type : "City breaks",
      holidays_found: found.length, is_returning: isReturning(), bag_cost_known: isTreatment() && s.bags,
    }, `./results.html?to=${encodeURIComponent(s.to)}`);
  };
  $("#sf-bags").onchange = () => { readSearchForm(); document.dispatchEvent(new Event("ejh:bags")); };
  $("#sf-to").onkeydown = (e) => { if (e.key === "Enter") $("#sf-go").click(); };
}

// Fire once when an element scrolls into view.
function onSeen(el, fn) {
  if (!el) return;
  const io = new IntersectionObserver((ents) => { if (ents.some((x) => x.isIntersecting)) { io.disconnect(); fn(); } }, { threshold: 0.5 });
  io.observe(el);
}

// ---------- Pages ----------
const pages = {};

pages.home = function () {
  $("#search-slot").innerHTML = searchFormHtml(false);
  bindSearchForm();
  onSeen($("#deal-banner"), () => track("Deal Banner Viewed", { deal_type: "bundle", discount_pct: 0.10, saving_amount: 200, holiday_type: "City breaks" }));
  $("#deal-cta").onclick = (e) => { e.preventDefault(); trackThenGo("Holiday Type Browsed", { holiday_type: "City breaks", hotels_shown: matchHotels("", "City breaks").length }, "./results.html?type=City%20breaks&deal=blackfriday"); };
  $$("[data-type]").forEach((b) => b.onclick = () => {
    const type = b.dataset.type;
    trackThenGo("Holiday Type Browsed", { holiday_type: type, hotels_shown: matchHotels("", type).length }, `./results.html?type=${encodeURIComponent(type)}`);
  });
  const picks = ["ITEM_012", "ITEM_013", "ITEM_014"].map(hotelById);
  const renderPicks = () => {
    $("#picks").innerHTML = picks.map((h) => `<div class="card">
      <div class="ph ph-${h.ph}">${esc(h.city)}</div>
      <div class="body">
        <div class="title-row"><span class="name">${esc(h.name)}</span>${heartBtn(h.id)}</div>
        <div class="loc">${esc(h.city)}, ${esc(h.country)}</div>
        <div class="meta"><span class="stars">${starStr(h.stars)}</span><span class="ta"><span class="owl"></span><span class="dots">${taDots(h.ta)}</span>${h.reviews.toLocaleString()} reviews</span></div>
        <div class="price">from <b>${money(ppDisplay(h))}</b> pp<br><span class="taxes">${h.taxes ? `+${money(h.taxes)} taxes &amp; charges` : "No taxes &amp; charges due"}</span>${bagsOn() ? `<br><span class="bagnote">Includes 15kg hold bag</span>` : ""}</div>
      </div>
      <a class="btn" href="./hotel.html?id=${h.id}">View holiday</a></div>`).join("");
  };
  renderPicks();
  document.addEventListener("ejh:bags", renderPicks);
  document.addEventListener("ejh:variant", renderPicks);
  setTimeout(loginToast, 2500);
};

pages.results = function () {
  const s = search();
  const to = qs("to") ?? (qs("type") ? "" : s.to);
  const type = qs("type") || "";
  $("#search-slot").innerHTML = searchFormHtml(true);
  if (qs("to") === null) $("#sf-to").value = to;
  bindSearchForm();

  const f = { type, to, maxPrice: 1000, minTa: 0, stars: [], times: [], text: "" };
  const fBox = $("#filters");
  fBox.innerHTML = `
    <h3>Holiday type</h3>
    <label class="opt"><input type="radio" name="f-type" value="" ${!type ? "checked" : ""}> All holidays</label>
    ${TYPES.map((t) => `<label class="opt"><input type="radio" name="f-type" value="${t}" ${t === type ? "checked" : ""}> ${t}</label>`).join("")}
    <h3 class="exp-only block-el">Luggage</h3>
    <label class="bag-toggle exp-only"><input type="checkbox" id="f-bags" ${s.bags ? "checked" : ""}><span class="sw"></span>Do you need hold bags?</label>
    <p class="small muted exp-only block-el" style="margin:6px 0 0">Prices include one 15kg hold bag per person</p>
    <h3>Hotel name</h3>
    <label class="field"><span>Search</span><input id="f-text" placeholder="e.g. Zaan"></label>
    <h3>Max price per person</h3>
    <input type="range" id="f-price" min="150" max="1000" step="10" value="1000"><div class="small">Up to <b id="f-price-v">£1,000</b>pp</div>
    <h3>Tripadvisor rating</h3>
    ${[[0, "Any"], [4, "4.0+ Very good"], [4.5, "4.5+ Excellent"]].map(([v, l]) => `<label class="opt"><input type="radio" name="f-ta" value="${v}" ${v === 0 ? "checked" : ""}> ${l}</label>`).join("")}
    <h3>Star rating</h3>
    ${[5, 4, 3].map((n) => `<label class="opt"><input type="checkbox" name="f-star" value="${n}"> ${starStr(n)}</label>`).join("")}
    <h3>Outbound flight times</h3>
    ${[["morning", "Morning (06:00–11:59)"], ["afternoon", "Afternoon (12:00–17:59)"], ["evening", "Evening (18:00–23:59)"]].map(([v, l]) => `<label class="opt"><input type="checkbox" name="f-time" value="${v}"> ${l}</label>`).join("")}`;

  const list = () => HOTELS.filter((h) =>
    (!f.type || h.type === f.type) &&
    (!f.to || [h.city, h.country, h.name].some((x) => x.toLowerCase().includes(f.to.toLowerCase()))) &&
    ppDisplay(h) <= f.maxPrice && h.ta >= f.minTa &&
    (!f.stars.length || f.stars.includes(h.stars)) &&
    (!f.times.length || f.times.includes(h.flight)) &&
    (!f.text || h.name.toLowerCase().includes(f.text.toLowerCase())));

  const render = () => {
    const rows = list();
    $("#res-title").textContent = `${rows.length} holiday${rows.length === 1 ? "" : "s"}${f.to ? " in " + f.to : f.type ? " · " + f.type : ""}`;
    $("#res-sub").textContent = `${s.from} · ${DATES.find((d) => d.v === s.date)?.label || ""} · ${s.adults} adult${s.adults > 1 ? "s" : ""}`;
    $("#results").innerHTML = rows.length ? rows.map((h) => `<div class="result-row">
      <div class="ph ph-${h.ph}"></div>
      <div class="mid">
        <div class="title-row" style="display:flex;justify-content:space-between;gap:8px"><a href="./hotel.html?id=${h.id}" style="color:var(--text)"><b style="font-size:17px">${esc(h.name)}</b></a>${heartBtn(h.id)}</div>
        <div class="loc small muted">${esc(h.city)}, ${esc(h.country)}</div>
        <div><span class="stars">${starStr(h.stars)}</span> &nbsp; <span class="ta"><span class="owl"></span><span class="dots">${taDots(h.ta)}</span>${h.ta.toFixed(1)} · ${h.reviews.toLocaleString()} reviews</span></div>
        <div class="small">${esc(h.blurb)}</div>
        <div class="incl"><span>Flights from ${esc(s.from)}</span><span>${h.type === "All inclusive" ? "All inclusive" : "Room only"}</span><span>${h.type === "City breaks" ? NIGHTS : 7} nights</span>${bagsOn() ? "<span>15kg hold bag</span>" : "<span>Under-seat bag</span>"}</div>
      </div>
      <div class="right">
        <div>from<br><b class="pp">${money(ppDisplay(h))}</b> pp<br><span class="taxes">${h.taxes ? `+${money(h.taxes)} taxes &amp; charges` : "No taxes &amp; charges due"}</span>${bagsOn() ? `<br><span class="bagnote" style="color:var(--ok);font-weight:700">Hold bags included</span>` : ""}</div>
        <a class="btn small" href="./hotel.html?id=${h.id}">View holiday</a>
      </div></div>`).join("")
      : `<div class="panel">No holidays match those filters. Try widening your price or rating.</div>`;
    return rows.length;
  };
  render();

  const fired = (label) => {
    const n = render();
    track("Search Results Filtered", { filter_value: label, holidays_found: n, hotels_shown: n, destination: f.to || "Anywhere", holiday_type: f.type || "All holidays", bag_cost_known: bagCostKnown() });
  };
  $$("input[name=f-type]").forEach((i) => i.onchange = () => { f.type = i.value; fired(`type:${i.value || "all"}`); });
  $$("input[name=f-ta]").forEach((i) => i.onchange = () => { f.minTa = parseFloat(i.value); fired(`tripadvisor:${i.value}+`); });
  $$("input[name=f-star]").forEach((i) => i.onchange = () => { f.stars = $$("input[name=f-star]:checked").map((x) => +x.value); fired(`stars:${f.stars.join(",") || "any"}`); });
  $$("input[name=f-time]").forEach((i) => i.onchange = () => { f.times = $$("input[name=f-time]:checked").map((x) => x.value); fired(`flight_times:${f.times.join(",") || "any"}`); });
  $("#f-price").oninput = (e) => { f.maxPrice = +e.target.value; $("#f-price-v").textContent = money(f.maxPrice); render(); };
  $("#f-price").onchange = (e) => fired(`price_max:${e.target.value}`);
  $("#f-text").onchange = (e) => { f.text = e.target.value.trim(); fired(f.text); };
  $("#f-bags").onchange = (e) => {
    const ss = search(); ss.bags = e.target.checked; saveSearch(ss); $("#sf-bags").checked = ss.bags;
    fired(`hold_bags:${ss.bags ? "yes" : "no"}`);
  };
  document.addEventListener("ejh:bags", () => { $("#f-bags").checked = search().bags; render(); });
  document.addEventListener("ejh:variant", render);

  onSeen($("#promo-strip"), () => track("Deal Banner Viewed", { deal_type: "percentage_off", discount_pct: 0.10, saving_amount: 200, holiday_type: f.type || "City breaks" }));
};

pages.hotel = function () {
  const h = hotelById(qs("id"));
  const s = search();
  const prev = store.get("ejh_basket", null);
  const b = prev && prev.hotel_id === h.id ? Object.assign(defaultBasket(h), { room: prev.room, board: prev.board, flight: prev.flight }) : defaultBasket(h);
  document.title = `${h.name} | easyJet holidays`;

  $("#hotel-hero").className = `hotel-hero ph-${h.ph}`;
  $("#hotel-hero").innerHTML = `<div><div style="font-size:13px;opacity:.9">${esc(h.city)}, ${esc(h.country)}</div><h1 style="margin:0;font-size:30px">${esc(h.name)}</h1></div>`;
  $("#hotel-head").innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
      <div><span class="stars">${starStr(h.stars)}</span> &nbsp; <span class="ta"><span class="owl"></span><span class="dots">${taDots(h.ta)}</span>${h.ta.toFixed(1)} · ${h.reviews.toLocaleString()} Tripadvisor reviews</span></div>
      <div>${heartBtn(h.id)} <span class="small muted">Add to shortlist</span></div></div>`;
  $("#tab-overview").innerHTML = `<p>${esc(h.blurb)}</p><p class="small muted">Flights, hotel &amp; luggage in one package. Choose your room, board basis and flights below, then add luggage, seats and transfers on the next step.</p>`;
  $("#tab-reviews").innerHTML = `<div class="ta-score"><span class="n">${h.ta.toFixed(1)}</span><div><span class="ta"><span class="owl"></span><span class="dots" style="font-size:16px">${taDots(h.ta)}</span></span><br><span class="small muted">Based on ${h.reviews.toLocaleString()} Tripadvisor reviews</span></div></div>
    ${[["Fantastic location", "Spotless rooms and the staff couldn't do enough for us. Would book again.", 5], ["Great value city break", "Easy to get to from the airport. Breakfast was worth adding.", 4], ["Lovely stay", "Rooms a bit small but beds were really comfy and it was quiet at night.", 4]].map(([t, x, n]) => `<div class="review"><span class="dots" style="color:var(--ta-green)">${taDots(n)}</span> <b>${t}</b><p style="margin:4px 0 0">${x}</p></div>`).join("")}`;

  let reviewsTracked = false;
  $$(".tabs button").forEach((t) => t.onclick = () => {
    $$(".tabs button").forEach((x) => x.classList.toggle("active", x === t));
    $("#tab-overview").classList.toggle("hidden", t.dataset.tab !== "overview");
    $("#tab-reviews").classList.toggle("hidden", t.dataset.tab !== "reviews");
    if (t.dataset.tab === "reviews" && !reviewsTracked) {
      reviewsTracked = true;
      track("Tripadvisor Reviews Read", { hotel_id: h.id, destination: h.city, tripadvisor_rating: h.ta, package_price: calcPackage(h, b) });
    }
  });

  const slot = FLIGHT_SLOTS;
  const choiceHtml = (name, opts, cur) => opts.map((o) => `<label class="choice ${o.id === cur ? "sel" : ""}"><span><input type="radio" name="${name}" value="${o.id}" ${o.id === cur ? "checked" : ""}>${o.label}</span><span class="delta">${o.delta}</span></label>`).join("");
  const renderChoices = () => {
    $("#ch-room").innerHTML = choiceHtml("room", ROOMS.map((r) => ({ id: r.id, label: r.label, delta: r.pp ? `+${money(r.pp)}pp` : "Included" })), b.room);
    $("#ch-board").innerHTML = choiceHtml("board", BOARDS.map((r) => ({ id: r.id, label: r.label, delta: r.pp ? `+${money(r.pp)}pp` : "Included" })), b.board);
    $("#ch-flight").innerHTML = choiceHtml("flight", Object.keys(slot).map((k) => ({ id: k, label: `${s.from} ${slot[k].out} → ${h.city} · return ${slot[k].back}`, delta: k === "afternoon" ? "+£12pp" : k === "evening" ? "-£8pp" : "Included" })), b.flight);
    $$(".choice input").forEach((i) => i.onchange = () => { b[i.name] = i.value; renderChoices(); renderSum(); });
  };
  const renderSum = () => {
    b.package_price = calcPackage(h, b);
    b.hold_bags = bagsOn() ? b.adults : 0;
    b.bags_preadded = bagsOn();
    const pp = r2(b.package_price / b.adults + (bagsOn() ? HOLD_BAG : 0));
    $("#sum").innerHTML = `
      <div class="small muted">${NIGHTS} nights · ${b.adults} adult${b.adults > 1 ? "s" : ""} · ${esc(s.from)}</div>
      <div style="margin-top:8px">from <span class="big-price">${money(pp)}</span>pp</div>
      <div class="small">${h.taxes ? `+${money(h.taxes)} taxes &amp; charges` : "No taxes &amp; charges due"}</div>
      <div class="sum-line" style="margin-top:14px"><span>Holiday package</span><span>${money(b.package_price)}</span></div>
      ${bagsOn() ? `<div class="sum-line" style="color:var(--ok)"><span>${b.adults} x 15kg hold bag</span><span>${money(holdBagCost(b))}</span></div>` : ""}
      <div class="sum-line"><span>Taxes &amp; charges</span><span>${money(h.taxes)}</span></div>
      <div class="sum-line total"><span>Total</span><span>${money(b.package_price + holdBagCost(b) + h.taxes)}</span></div>
      <button class="btn block" id="go-extras" style="margin-top:12px">Continue</button>
      <ul class="reassure"><li>£60pp deposits</li><li>ATOL protected</li><li>Best price guarantee</li><li>Flights, hotel &amp; luggage in one package</li></ul>`;
    $("#go-extras").onclick = () => { saveBasket(Object.assign({}, b, { hotel_taxes: h.taxes, promo: null })); location.href = "./extras.html"; };
  };
  renderChoices(); renderSum();
  document.addEventListener("ejh:variant", renderSum);

  const sims = HOTELS.filter((x) => x.id !== h.id && x.type === h.type).sort((a, c) => (c.city === h.city) - (a.city === h.city)).slice(0, 3);
  $("#similar").innerHTML = sims.map((x) => `<a class="card" href="./hotel.html?id=${x.id}" data-sim="${x.id}" style="color:var(--text);text-decoration:none">
      <div class="ph ph-${x.ph}" style="height:90px">${esc(x.city)}</div>
      <div class="body"><span class="name">${esc(x.name)}</span><span class="stars">${starStr(x.stars)}</span><div class="price">from <b>${money(ppDisplay(x))}</b> pp</div></div></a>`).join("");
  $$("[data-sim]").forEach((a) => a.onclick = (e) => {
    e.preventDefault();
    const x = hotelById(a.dataset.sim);
    trackThenGo("Similar Hotel Clicked", { hotel_id: x.id, destination: x.city, holiday_type: x.type, package_price: packagePriceFor(x), tripadvisor_rating: x.ta }, a.href);
  });

  track("Hotel Viewed", { hotel_id: h.id, destination: h.city, holiday_type: h.type, package_price: b.package_price, hotel_taxes: h.taxes, tripadvisor_rating: h.ta, bag_cost_known: bagCostKnown() });
};

pages.extras = function () {
  const b = basket();
  const h = hotelById(b.hotel_id);
  $("#progress").innerHTML = progressBar("Extras");
  const isCity = h.type === "City breaks";

  const render = () => {
    const known = b.bags_preadded && isTreatment();
    $("#sec-hold").innerHTML = `
      <h2>🧳 Hold luggage</h2>
      ${known ? `<div class="notice ok"><b>${b.hold_bags} x 15kg hold bag already added.</b> You chose hold bags when you searched, so they're included in the price you saw.</div>`
              : `<div class="notice"><b>${isCity ? "City breaks come with no hold luggage." : "Your package doesn't include hold luggage."}</b> Each person can bring one small under-seat bag (45 x 36 x 20cm).</div>`}
      <div class="extra-row"><div class="info"><b>15kg hold bag</b><br><span class="muted">${money(HOLD_BAG)} per bag · covers both flights</span></div>
        <div class="stepper"><button data-step="hold_bags" data-d="-1" aria-label="Remove bag">−</button><span>${b.hold_bags}</span><button data-step="hold_bags" data-d="1" aria-label="Add bag">+</button></div></div>
      <button class="btn outline small" id="compare-btn">Compare luggage options</button>`;
    $("#sec-cabin").innerHTML = `
      <h2>🎒 Cabin bags</h2>
      <div class="extra-row"><div class="info"><b>Large cabin bag + Speedy Boarding</b><br><span class="muted">${money(CABIN_BAG)} per person, per flight · up to 56 x 45 x 25cm in the overhead locker</span></div>
        <div class="stepper"><button data-step="cabin_bags" data-d="-1" aria-label="Remove">−</button><span>${b.cabin_bags}</span><button data-step="cabin_bags" data-d="1" aria-label="Add">+</button></div></div>`;
    const radio = (name, opts) => opts.map(([v, l, p]) => `<label class="choice ${b[name] === v ? "sel" : ""}"><span><input type="radio" name="${name}" value="${v}" ${b[name] === v ? "checked" : ""}>${l}</span><span class="delta">${p}</span></label>`).join("");
    $("#sec-seats").innerHTML = `<h2>💺 Seats</h2>${radio("seats", [["random", "Random seats at check-in", "Free"], ["standard", "Choose standard seats", "£7.99pp per flight"], ["legroom", "Extra legroom seats", "£19.99pp per flight"]])}`;
    $("#sec-transfer").innerHTML = `<h2>🚌 Transfer</h2>${radio("transfer", [["none", "No transfer, I'll make my own way", "—"], ["shared", "Shared airport transfer", "£18pp return"], ["private", "Private airport transfer", "£89 total"]])}`;

    const lines = extrasLines(b);
    const bt = basketTotal(b);
    const save = promoSaving(b, bt);
    $("#summary").innerHTML = `
      <h2 style="font-size:18px">Your holiday</h2>
      <div class="ph ph-${h.ph}" style="height:70px;margin-bottom:10px"></div>
      <b>${esc(h.name)}</b><div class="small muted">${esc(h.city)} · ${NIGHTS} nights · ${b.adults} adults · from ${esc(b.from)}</div>
      <div class="sum-line" style="margin-top:12px"><span>Holiday package</span><span>${money(b.package_price)}</span></div>
      ${lines.map((l) => `<div class="sum-line"><span>${esc(l.label)}</span><span>${money(l.amt)}</span></div>`).join("")}
      <div class="sum-line"><span>Taxes &amp; charges</span><span>${money(b.hotel_taxes)}</span></div>
      ${save ? `<div class="sum-line" style="color:var(--ok)"><span>Promo ${esc(b.promo.code)}</span><span>-${money(save)}</span></div>` : ""}
      <div class="sum-line total"><span>Total</span><span>${money(grandTotal(b))}</span></div>
      <div class="small muted">Pay ${money(DEPOSIT_PP * b.adults)} deposit today (£60pp)</div>
      <h3 style="margin-top:16px">Promo code</h3>
      <div class="promo-box"><label class="field" style="flex:1"><span>Enter code</span><input id="promo-in" placeholder="e.g. BLACKFRIDAY" value="${b.promo ? esc(b.promo.code) : ""}"></label><button class="btn small outline" id="promo-go">Apply</button></div>
      <div class="promo-msg ${b.promo ? (b.promo.applied ? "ok" : "err") : ""}" id="promo-msg">${b.promo ? esc(b.promo.msg) : ""}</div>`;

    $$("[data-step]").forEach((x) => x.onclick = () => {
      const k = x.dataset.step, max = k === "hold_bags" ? b.adults * 2 : b.adults;
      b[k] = Math.max(0, Math.min(max, b[k] + parseInt(x.dataset.d, 10)));
      saveBasket(b); render();
    });
    $$(".choice input").forEach((i) => i.onchange = () => { b[i.name] = i.value; saveBasket(b); render(); });
    $("#compare-btn").onclick = openCompare;
    $("#promo-go").onclick = applyPromo;
    $("#promo-in").onkeydown = (e) => { if (e.key === "Enter") applyPromo(); };
  };

  function applyPromo() {
    const code = $("#promo-in").value.trim().toUpperCase();
    if (!code) return;
    const p = PROMOS[code];
    const bt = basketTotal(b);
    let applied = false, msg;
    if (!p) msg = "Sorry, we don't recognise that code.";
    else if (bt < p.min) msg = `This code needs a minimum spend of ${money(p.min)}.`;
    else { applied = true; msg = `Code applied: ${p.desc}`; }
    b.promo = { code, applied, msg };
    const saving = applied ? promoSaving(b, bt) : 0;
    saveBasket(b); render();
    track("Promo Code Entered", { promo_attempted: true, promo_applied: applied, filter_value: code, discount_pct: applied && p.pct ? p.pct : applied ? r2(saving / bt) : 0, saving_amount: saving, basket_total: bt, hotel_id: h.id });
  }

  function openCompare() {
    let bags = b.hold_bags || b.adults;
    const bg = document.createElement("div"); bg.className = "modal-bg";
    const draw = () => {
      const holdCost = r2(bags * HOLD_BAG);
      const cabinCost = r2(b.adults * CABIN_BAG * 2);
      bg.innerHTML = `<div class="modal wide" role="dialog" aria-modal="true">
        <button class="close" aria-label="Close">×</button>
        <h2>Compare luggage options</h2>
        <p class="small muted">${isCity ? "City breaks come with no hold luggage." : "Hold luggage isn't included in this package."} Here's what each option costs for your ${b.adults} travellers on both flights.</p>
        <div class="compare">
          <div class="opt">
            <b>15kg hold bag</b>
            <div><span class="p">${money(HOLD_BAG)}</span> per bag</div>
            <ul class="small"><li>Up to 15kg, dropped at bag drop</li><li>Covers outbound and return</li><li>Keep your hands free in the city</li></ul>
            <div style="display:flex;align-items:center;gap:10px"><span class="small">Bags</span><div class="stepper"><button id="cmp-minus">−</button><span>${bags}</span><button id="cmp-plus">+</button></div></div>
            <div class="sum-line total"><span>${bags} bag${bags === 1 ? "" : "s"}</span><span>${money(holdCost)}</span></div>
            <button class="btn" id="cmp-hold">Add ${bags} hold bag${bags === 1 ? "" : "s"}</button>
          </div>
          <div class="opt">
            <b>Large cabin bag + Speedy Boarding</b>
            <div><span class="p">${money(CABIN_BAG)}</span> per person, per flight</div>
            <ul class="small"><li>Up to 56 x 45 x 25cm, overhead locker</li><li>Board first with Speedy Boarding</li><li>No waiting at baggage reclaim</li></ul>
            <div class="small">${b.adults} people x 2 flights</div>
            <div class="sum-line total"><span>${b.adults} cabin bags</span><span>${money(cabinCost)}</span></div>
            <button class="btn outline" id="cmp-cabin">Add cabin bags</button>
          </div>
        </div>
        <div class="sum-line" style="margin-top:16px"><span>Holiday package + taxes</span><span>${money(b.package_price + b.hotel_taxes)}</span></div>
        <div class="sum-line total"><span>Total with ${bags} hold bag${bags === 1 ? "" : "s"}</span><span>${money(b.package_price + holdCost + b.hotel_taxes)}</span></div>
      </div>`;
      $(".close", bg).onclick = () => bg.remove();
      $("#cmp-minus", bg).onclick = () => { bags = Math.max(1, bags - 1); draw(); };
      $("#cmp-plus", bg).onclick = () => { bags = Math.min(b.adults * 2, bags + 1); draw(); };
      $("#cmp-hold", bg).onclick = () => { b.hold_bags = bags; saveBasket(b); bg.remove(); render(); flash("Hold bags added"); };
      $("#cmp-cabin", bg).onclick = () => { b.cabin_bags = b.adults; saveBasket(b); bg.remove(); render(); flash("Cabin bags added"); };
    };
    draw();
    bg.onclick = (e) => { if (e.target === bg) bg.remove(); };
    document.body.appendChild(bg);
    const holdCost = r2(bags * HOLD_BAG);
    track("Luggage Prices Compared", {
      hotel_id: h.id, destination: h.city, package_price: b.package_price, basket_total: basketTotal(b),
      hold_bag_cost: holdCost, hotel_taxes: b.hotel_taxes, total_with_bags: r2(b.package_price + holdCost + b.hotel_taxes),
      bag_cost_known: !!(b.bags_preadded && isTreatment()),
    });
  }

  render();
  document.addEventListener("ejh:variant", render);

  $("#back-btn").onclick = () => trackThenGo("Extras Abandoned", {
    hotel_id: h.id, destination: h.city, package_price: b.package_price, basket_total: basketTotal(b),
    hold_bag_cost: holdBagCost(b), bag_cost_known: !!(b.bags_preadded && isTreatment()),
  }, `./hotel.html?id=${h.id}`);
  $("#continue-btn").onclick = () => { saveBasket(b); location.href = "./guests.html"; };

  track("Extras Viewed", { hotel_id: h.id, destination: h.city, holiday_type: h.type, package_price: b.package_price, basket_total: basketTotal(b), hotel_taxes: b.hotel_taxes, bag_cost_known: !!(b.bags_preadded && isTreatment()) });
};

pages.guests = function () {
  const b = basket();
  const h = hotelById(b.hotel_id);
  $("#progress").innerHTML = progressBar("Guests");
  const total = grandTotal(b);
  $("#summary").innerHTML = `<h2 style="font-size:18px">Your holiday</h2><b>${esc(h.name)}</b><div class="small muted">${esc(h.city)} · ${NIGHTS} nights · ${b.adults} adults</div>
    <div class="sum-line" style="margin-top:12px"><span>Holiday package</span><span>${money(b.package_price)}</span></div>
    ${extrasLines(b).map((l) => `<div class="sum-line"><span>${esc(l.label)}</span><span>${money(l.amt)}</span></div>`).join("")}
    <div class="sum-line"><span>Taxes &amp; charges</span><span>${money(b.hotel_taxes)}</span></div>
    ${promoSaving(b, basketTotal(b)) ? `<div class="sum-line" style="color:var(--ok)"><span>Promo ${esc(b.promo.code)}</span><span>-${money(promoSaving(b, basketTotal(b)))}</span></div>` : ""}
    <div class="sum-line total"><span>Total</span><span>${money(total)}</span></div>
    <ul class="reassure"><li>ATOL protected</li><li>£60pp deposits</li></ul>`;
  $("#pax2").innerHTML = Array.from({ length: b.adults - 1 }, (_, i) => `<h3 style="margin-top:20px">Passenger ${i + 2}</h3><div class="form-grid">
    <label class="field"><span>First name</span><input placeholder="As on passport" autocomplete="off"></label>
    <label class="field"><span>Last name</span><input placeholder="As on passport" autocomplete="off"></label></div>`).join("");
  $("#pay-deposit-lbl").textContent = `Pay ${money(DEPOSIT_PP * b.adults)} deposit today (£60pp)`;
  $("#pay-full-lbl").textContent = `Pay ${money(total)} in full`;

  const gate = () => {
    const u = currentUser();
    $("#login-gate").classList.toggle("hidden", !!u);
    $("#book-btn").textContent = u ? "Book now" : "Log in to book";
    if (u) $("#signed-in").innerHTML = `Booking as <b>${esc(u.name)}</b> <span class="small muted">(${esc(u.userId)})</span>`;
  };
  gate();
  $("#gate-login").onclick = () => openLogin(gate, "Log in to complete your booking.");
  $("#book-btn").onclick = () => {
    if (!currentUser()) { openLogin(gate, "Log in to complete your booking."); return; }
    const d = new Date();
    const ref = `ORD_${d.toISOString().slice(0, 10).replace(/-/g, "")}_${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    store.set("ejh_last_booking", { ref, basket: b, total, tracked: false, userId: currentUser().userId });
    location.href = "./confirmation.html";
  };

  track("Guest Details Started", { hotel_id: h.id, destination: h.city, package_price: b.package_price, basket_total: basketTotal(b), hold_bag_cost: holdBagCost(b), total_with_bags: r2(b.package_price + holdBagCost(b) + b.hotel_taxes), bag_cost_known: !!(b.bags_preadded && isTreatment()), booked_before: bookingCount() > 0, is_returning: isReturning() });
};

pages.confirmation = function () {
  const lb = store.get("ejh_last_booking", null);
  if (!lb) { $("#conf").innerHTML = `<div class="panel">No booking found. <a href="./index.html">Start a new search</a>.</div>`; return; }
  const b = lb.basket, h = hotelById(b.hotel_id);
  $("#conf-ref").textContent = lb.ref;
  $("#conf").innerHTML = `<div class="panel"><h2>${esc(h.name)}</h2>
    <div class="small muted">${esc(h.city)}, ${esc(h.country)} · ${DATES.find((d) => d.v === b.date)?.label || ""} · ${b.adults} adults · from ${esc(b.from)}</div>
    <div class="sum-line" style="margin-top:12px"><span>Holiday package</span><span>${money(b.package_price)}</span></div>
    ${extrasLines(b).map((l) => `<div class="sum-line"><span>${esc(l.label)}</span><span>${money(l.amt)}</span></div>`).join("")}
    <div class="sum-line"><span>Taxes &amp; charges</span><span>${money(b.hotel_taxes)}</span></div>
    ${promoSaving(b, basketTotal(b)) ? `<div class="sum-line" style="color:var(--ok)"><span>Promo ${esc(b.promo.code)}</span><span>-${money(promoSaving(b, basketTotal(b)))}</span></div>` : ""}
    <div class="sum-line total"><span>Total</span><span>${money(lb.total)}</span></div>
    <p class="small muted">We've sent your confirmation to your email. Your holiday is ATOL protected.</p>
    <a class="btn" href="./index.html">Search for another holiday</a> <a class="btn outline" href="./account.html">My account</a></div>`;

  if (!lb.tracked) {
    const counts = store.get("ejh_bookings", {});
    const prior = counts[lb.userId] || 0;
    const hb = holdBagCost(b);
    track("Booking Confirmed", {
      booking_reference: lb.ref, hotel_id: h.id, destination: h.city, holiday_type: h.type, package_price: b.package_price,
      basket_total: basketTotal(b), hold_bag_cost: hb, hotel_taxes: b.hotel_taxes, total_with_bags: r2(b.package_price + hb + b.hotel_taxes),
      bag_cost_known: !!b.bags_preadded, is_first_booking: prior === 0,
      promo_attempted: !!b.promo, promo_applied: !!(b.promo && b.promo.applied), saving_amount: promoSaving(b, basketTotal(b)),
    });
    counts[lb.userId] = prior + 1; store.set("ejh_bookings", counts);
    lb.tracked = true; store.set("ejh_last_booking", lb);
    store.del("ejh_basket");
  }
};

pages.account = function () {
  const render = () => {
    const u = currentUser();
    $("#acct").innerHTML = u ? `
      <div class="panel"><h2>Hi ${esc(u.name)}</h2>
        <div class="small muted">Amplitude user ID</div><div class="id-preview" style="margin:6px 0 14px">${esc(u.userId)}</div>
        <div class="sum-line"><span>Demo number</span><span>${esc(u.demo)}</span></div>
        <div class="sum-line"><span>Bookings today</span><span>${bookingCount()}</span></div>
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn outline" id="end-session">End session</button><button class="btn" id="logout">Log out</button></div>
        <p class="small muted">Both fire <code>session_ended</code>. Log out also resets the Amplitude device so the next visitor is a new user.</p></div>`
      : `<div class="panel"><h2>My account</h2><p>Log in to see your bookings and shortlist on any device.</p><button class="btn" id="acct-login">Log in</button></div>`;
    if (u) {
      $("#logout").onclick = () => { logout(); render(); flash("You've logged out"); };
      $("#end-session").onclick = () => { track("session_ended", { is_returning: isReturning(), basket_total: basketTotal(), booked_before: bookingCount() > 0 }); flash("Session ended"); };
    } else $("#acct-login").onclick = () => openLogin(render);

    const saved = savedIds().map(hotelById);
    $("#shortlist-cards").innerHTML = saved.length ? saved.map((h) => `<div class="card"><div class="ph ph-${h.ph}">${esc(h.city)}</div><div class="body"><div class="title-row"><span class="name">${esc(h.name)}</span>${heartBtn(h.id)}</div><div class="price">from <b>${money(ppDisplay(h))}</b> pp</div></div><a class="btn" href="./hotel.html?id=${h.id}">View holiday</a></div>`).join("")
      : `<p class="muted">Tap the heart on any hotel to add it to your shortlist.</p>`;

    $("#variant-state").textContent = isTreatment() ? "Treatment (hold bag toggle on search)" : "Control";
  };
  render();
  $("#v-control").onclick = () => { setVariant("control"); render(); flash("Control variant"); };
  $("#v-treat").onclick = () => { setVariant("treatment"); render(); flash("Treatment variant"); };
};

// ---------- Boot ----------
window.ejh = { setVariant, generateUserId, track, HOTELS };
document.addEventListener("DOMContentLoaded", () => {
  resolveFlag();
  // React if a Web Experiment variant flips the treatment class after load.
  let was = isTreatment();
  new MutationObserver(() => { if (isTreatment() !== was) { was = isTreatment(); document.dispatchEvent(new Event("ejh:variant")); } })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  renderHeader();
  renderFooter();
  const page = document.body.dataset.page;
  if (pages[page]) pages[page]();
});
