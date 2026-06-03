const form = document.getElementById("contactForm");
const totalPriceEl = document.getElementById("totalPrice");
const status = document.getElementById("status");

let savedData = null;

const productColors = {
  "Advantage dress printer": ["Zwart", "Blauw"],
  "cottover hoody printer": ["Zwart", "Blauw"],
  "fz hoody cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "polo korte mouw cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "polo lange mouw cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "trui ronde hals cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "t-shirt lange mouw cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "t-shirt korte mouw cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "t-shirt korte mouw v-hals cottover": ["Roze", "Geel", "Paars", "Zwart", "Blauw"],
  "fleece printer": ["Zwart", "Blauw"],
  "hoody printer": ["Zwart", "Blauw"],
  "overhead printer": ["Zwart", "Blauw"],
  "javelin printer": ["Zwart", "Blauw"],
  "t-shirt v-hals en rond printer": ["Zwart", "Blauw"],
  "polo korte mouw printer": ["Zwart", "Blauw"],
  "trial printer": ["Zwart", "Blauw"],
  "expedition printer": ["Zwart", "Blauw"],
  "jog printer": ["Zwart", "Blauw"],
  "bodywarmer trail printer": ["Zwart", "Blauw"],
  "t-shirt lange mouw printer": ["Zwart", "Blauw"],
  "polo shirt lange mouw printer": ["Zwart", "Blauw"],
  "softball printer": ["Zwart", "Blauw"],
  "hemd printer": ["Zwart", "Blauw"]
};

// ---------------- TOTAL ----------------
function calculateTotal() {
  let total = 0;

  document.querySelectorAll(".product-row").forEach(row => {
    const productEl = row.querySelector('select[name="product[]"]');
    const qtyEl = row.querySelector('input[name="aantal[]"]');

    if (!productEl || !qtyEl) return;

    const value = productEl.value || "";
    const price = parseFloat(value.split("|")[1]) || 0;
    const qty = parseInt(qtyEl.value) || 0;

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

  if (e.target.value === "Unisex") maten = ["XS", "S", "M" , "L", "XL"];
  if (e.target.value === "Woman") maten = ["XS", "S", "M" , "L", "XL"];

  maatSelect.innerHTML = `<option value="">Kies maat</option>`;

  maten.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    maatSelect.appendChild(opt);
  });
});

// ---------------- KLEUR LOGICA ----------------
document.addEventListener("change", (e) => {
  if (!e.target.matches('select[name="product[]"]')) return;

  const row = e.target.closest(".product-row");
  const kleurSelect = row.querySelector('select[name="kleur[]"]');

  const productName = e.target.value.split("|")[0];

  kleurSelect.innerHTML = '<option value="">Kies kleur</option>';

  const kleuren = productColors[productName] || ["Standaard kleur"];

  kleuren.forEach(kleur => {
    const option = document.createElement("option");
    option.value = kleur;
    option.textContent = kleur;
    kleurSelect.appendChild(option);
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
      <option value="Advantage dress printer|71.39">Advantage dress printer</option>
      <option value="cottover hoody printer|52.94">Cottover hoody printer</option>
      <option value="fz hoody cottover|62.98">Fz hoody cottover</option>
      <option value="polo korte mouw cottover|30.61">Polo korte mouw cottover</option>
      <option value="polo lange mouw cottover|39.33">Polo lange mouw cottover</option>
      <option value="trui ronde hals cottover|41.93">Trui ronde hals cottover</option>
      <option value="t-shirt lange mouw cottover|21.72">T-shirt lange mouw cottover</option>
      <option value="t-shirt korte mouw cottover|16.40">T-shirt korte mouw cottover</option>
      <option value="t-shirt korte mouw v-hals cottover|16.40">T-shirt korte mouw v-hals cottover</option>
      <option value="fleece printer|37.87">Fleece printer</option>
      <option value="hoody printer|44.95">Hoody printer</option>
      <option value="overhead printer|51.85">Overhead printer</option>
      <option value="javelin printer|48.94">Javelin printer</option>
      <option value="t-shirt v-hals en rond printer|10.35">T-shirt v-hals en rond printer</option>
      <option value="polo korte mouw printer|20.75">Polo korte mouw printer</option>
      <option value="trial printer|79.07">Trial printer</option>
      <option value="expedition printer|79.07">Expedition printer</option>
      <option value="jog printer|69.51">Jog printer</option>
      <option value="bodywarmer trail printer|60.14">Bodywarmer trail printer</option>
      <option value="t-shirt lange mouw printer|20.27">T-shirt lange mouw printer</option>
      <option value="polo shirt lange mouw printer|35.94">Polo shirt lange mouw printer</option>
      <option value="softball printer|33.03">Softball printer</option>
      <option value="hemd printer|9.56">Hemd printer</option>
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
    el.addEventListener("change", calculateTotal);
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
  if (
    e.target.name === "product[]" ||
    e.target.name === "aantal[]"
  ) {
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

  const subtotals = producten.map((p, i) => {
    const price = parseFloat(p.split("|")[1]) || 0;
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
    const price = parseFloat(producten[i].split("|")[1]) || 0;
    const sub = price * aantallen[i];

    total += sub;

    html += `
      <div>
        <b>${name}</b><br>
        Pasvorm: ${pasvormen[i]}<br>
        Maat: ${maten[i]}<br>
        Kleur: ${kleuren[i]}<br>
        Aantal: ${aantallen[i]}<br>
        Subtotaal: €${sub.toFixed(2)}
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
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(() => {
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

// INIT
calculateTotal();

// INFO BALLON PERSONEELSNUMMER
function toggleInfo(event) {
  event.stopPropagation();

  const box = document.getElementById("info-personeelsnummer");

  if (!box) return;

  box.classList.toggle("show");
}

// klik buiten = sluiten
document.addEventListener("click", (e) => {
  const box = document.getElementById("info-personeelsnummer");

  if (!box) return;

  if (!box.contains(e.target)) {
    box.classList.remove("show");
  }
});
