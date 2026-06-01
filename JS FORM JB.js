const form = document.getElementById("contactForm");
const totalPriceEl = document.getElementById("totalPrice");
const status = document.getElementById("status");

let savedData = null;

// ---------------- TOTAL ----------------
function calculateTotal() {
  let total = 0;

  document.querySelectorAll(".product-row").forEach(row => {

    const productEl = row.querySelector('select[name="product[]"]');
    const qtyEl = row.querySelector('input[name="aantal[]"]');

    if (!productEl || !qtyEl) return;

    const value = productEl.value || "";
    const price = Number(value.split("|")[1] || 0);
    const qty = Number(qtyEl.value || 0);

    total += price * qty;
  });

  totalPriceEl.innerText = "Totaal: €" + total.toFixed(2);
}

// ---------------- MAAT LOGICA ----------------
document.addEventListener("change", (e) => {

  if (!e.target.classList.contains("pasvormSelect")) return;

  const row = e.target.closest(".product-row");
  const maatSelect = row.querySelector(".maatSelect");

  let maten = [];

  if (e.target.value === "Unisex") maten = ["XS", "S", "M"];
  if (e.target.value === "Woman") maten = ["L", "XL"];

  maatSelect.innerHTML = `<option value="">Kies maat</option>`;

  maten.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    maatSelect.appendChild(opt);
  });
});

// ---------------- ADD PRODUCT ----------------
document.getElementById("addProduct").addEventListener("click", () => {

  const row = document.createElement("div");
  row.classList.add("product-row");

  row.innerHTML = `
    <label>Pasvorm</label>
    <select name="pasvorm[]" class="pasvormSelect" required>
      <option value="">Kies pasvorm</option>
      <option value="Woman">Woman</option>
      <option value="Unisex">Unisex</option>
    </select>

    <label>Maat</label>
    <select name="maat[]" class="maatSelect" required>
      <option value="">Kies maat</option>
    </select>

    <label>Product</label>
    <select name="product[]" required>
      <option value="">Kies product</option>
      <option value="Hoodie|35">Hoodie</option>
      <option value="T-shirt|20">T-shirt</option>
      <option value="Polo|25">Polo</option>
      <option value="Jas|60">Jas</option>
    </select>

    <label>Kleur</label>
    <select name="kleur[]" required>
      <option value="">Kies kleur</option>
      <option value="Zwart">Zwart</option>
      <option value="Blauw">Blauw</option>
      <option value="Rood">Rood</option>
      <option value="Wit">Wit</option>
    </select>

    <label>Aantal</label>
    <input type="number" name="aantal[]" min="1" value="1" required>

    <button type="button" class="removeProduct">Verwijder</button>
  `;

  document.getElementById("products").appendChild(row);

  row.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculateTotal);
  });

  calculateTotal();
});

// ---------------- REMOVE ----------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeProduct")) {
    e.target.closest(".product-row").remove();
    calculateTotal();
  }
});

// ---------------- LIVE TOTAL ----------------
document.addEventListener("input", (e) => {
  if (e.target.name === "aantal[]") {
    calculateTotal();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.name === "product[]" || e.target.name === "aantal[]") {
    calculateTotal();
  }
});

// ---------------- SUBMIT ----------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const rows = document.querySelectorAll(".product-row");

  const producten = [];
  const kleuren = [];
  const aantallen = [];
  const maten = [];
  const pasvormen = [];

  rows.forEach(row => {
    producten.push(row.querySelector('select[name="product[]"]').value);
    kleuren.push(row.querySelector('select[name="kleur[]"]').value);
    aantallen.push(Number(row.querySelector('input[name="aantal[]"]').value));
    maten.push(row.querySelector('select[name="maat[]"]').value);
    pasvormen.push(row.querySelector('select[name="pasvorm[]"]').value);
  });

  // 🔥 FIX: subtotals toevoegen (BELANGRIJK VOOR SHEETS)
  const subtotals = producten.map((p, i) => {
    const price = Number(p.split("|")[1] || 0);
    return price * (aantallen[i] || 0);
  });

  savedData = {
    naam: form.querySelector('input[name="naam"]').value,
    personeelsnummer: form.querySelector('input[name="personeelsnummer"]').value,
    afleverloc: form.querySelector('input[name="afleverloc"]').value,
    teamleid: form.querySelector('input[name="teamleid"]').value,
    borduurnaam: form.querySelector('input[name="borduurnaam"]').value,

    producten,
    kleuren,
    aantallen,
    maten,
    pasvormen,
    subtotals
  };

  let html = "<h3>Bestelling</h3>";
  let total = 0;

  for (let i = 0; i < producten.length; i++) {

    const name = producten[i].split("|")[0];
    const price = Number(producten[i].split("|")[1] || 0);
    const sub = price * aantallen[i];

    total += sub;

    html += `
      <div>
        <b>${name}</b><br>
        Pasvorm: ${pasvormen[i]}<br>
        Maat: ${maten[i]}<br>
        Kleur: ${kleuren[i]}<br>
        Aantal: ${aantallen[i]}<br>
        Subtotaal: €${sub}
      </div>
      <hr>
    `;
  }

  html += `<h2>Totaal: €${total.toFixed(2)}</h2>`;

  document.getElementById("confirmData").innerHTML = html;

  form.style.display = "none";
  document.getElementById("confirmPage").style.display = "block";
});

// ---------------- SEND ----------------
document.getElementById("confirmSend").addEventListener("click", () => {

  fetch("https://script.google.com/macros/s/AKfycbwXHE82crFqEVAd58P00kC17kdGCCeDNz9KhQDe8h-yZUJ5mLAIWMPNNZ3eMq3hqYkfVw/exec", {
    method: "POST",
    body: JSON.stringify(savedData),
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    }
  })
  .then(res => res.text())
  .then(data => {
    console.log(data);

    document.getElementById("confirmPage").style.display = "none";
    document.getElementById("afterSubmit").style.display = "block";
  })
  .catch(() => {
    status.innerText = "Fout bij verzenden";
  });
});

// ---------------- RESET ----------------
document.getElementById("resetBtn").addEventListener("click", () => {
  location.reload();
});

// ---------------- INIT ----------------
calculateTotal();