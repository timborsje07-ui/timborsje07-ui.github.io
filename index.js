console.log("JS IS GELADEN");

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const totalPriceEl = document.getElementById("totalPrice");
  const status = document.getElementById("status");

  let savedData = null;

  const productColors = {
    "Advantage dress printer": ["Zwart", "Blauw"],
    "cottover hoody printer": ["Zwart", "Blauw"],
    "fz hoody cottover": ["Roze", "Geel", "Paars"],
    "polo korte mouw cottover": ["Roze", "Geel", "Paars"],
    "polo lange mouw cottover": ["Roze", "Geel", "Paars"],
    "trui ronde hals cottover": ["Roze", "Geel", "Paars"],
    "t-shirt lange mouw cottover": ["Roze", "Geel", "Paars"],
    "t-shirt korte mouw cottover": ["Roze", "Geel", "Paars"],
    "t-shirt korte mouw v-hals cottover": ["Roze", "Geel", "Paars"],
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
    "hemd clique": ["Zwart"]
  };

  function calculateTotal() {
    let total = 0;

    document.querySelectorAll(".product-row").forEach(row => {
      const productEl = row.querySelector('select[name="product[]"]');
      const qtyEl = row.querySelector('input[name="aantal[]"]');

      const value = productEl.value || "";
      const price = parseFloat(value.split("|")[1]) || 0;
      const qty = parseInt(qtyEl.value) || 0;

      total += price * qty;
    });

    totalPriceEl.innerText = "Totaal: €" + total.toFixed(2);
  }

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("pasvormSelect")) {
      const row = e.target.closest(".product-row");
      const maatSelect = row.querySelector(".maatSelect");

      let maten = [];
      if (e.target.value === "Unisex") maten = ["S","M","L","XL","XXL"];
      if (e.target.value === "Woman") maten = ["XS","S","M","L","XL"];

      maatSelect.innerHTML = `<option value="">Kies maat</option>`;
      maten.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        maatSelect.appendChild(opt);
      });
    }
  });

  document.addEventListener("change", (e) => {
    if (!e.target.matches('select[name="product[]"]')) return;

    const row = e.target.closest(".product-row");
    const kleurSelect = row.querySelector('select[name="kleur[]"]');

    const productName = e.target.value.split("|")[0];
    const kleuren = productColors[productName] || ["Standaard"];

    kleurSelect.innerHTML = '<option value="">Kies kleur</option>';
    kleuren.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      kleurSelect.appendChild(opt);
    });
  });

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
        <option value="Advantage dress printer|71.39">Advantage dress printer €71.39</option>
        <option value="cottover hoody printer|52.94">Cottover hoody printer €52.94</option>
      </select>

      <label>Kleur</label>
      <select name="kleur[]" required>
        <option value="">Kies kleur</option>
        <option value="Zwart">Zwart</option>
        <option value="Blauw">Blauw</option>
      </select>

      <label>Aantal</label>
      <input type="number" name="aantal[]" value="1" min="1" required>

      <button type="button" class="removeProduct">Verwijder</button>
    `;

    document.getElementById("products").appendChild(row);
  });

});
