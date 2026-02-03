const form = document.getElementById("bhogForm");
const errorEl = document.getElementById("error");
const btn = document.getElementById("submitBtn");
const loader = document.querySelector(".loader");
const btnText = document.querySelector(".btn-text");

// Time-based anti-spam
const formLoadedAt = Date.now();

form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.textContent = "";

    // Honeypot check
    if (document.getElementById("website").value !== "") {
        return;
    }

    // Time check (3 seconds minimum)
    if (Date.now() - formLoadedAt < 3000) {
        errorEl.textContent = "Please wait a moment before submitting.";
        return;
    }

    const name = document.getElementById("name").value.trim();
    const block = document.getElementById("block").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!/^[A-Za-z ]+$/.test(name)) {
        return showError("Name must contain only letters.");
    }

    if (!/^[0-9]+$/.test(block)) {
        return showError("Block number must be numeric.");
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        return showError("Enter a valid 10-digit Indian mobile number.");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return showError("Enter a valid email address.");
    }

    // UI loading
    btn.disabled = true;
    loader.style.display = "inline-block";
    btnText.textContent = "Submitting Bhog...";

    // TEMP SUCCESS (Next step: Google Sheets)
    setTimeout(() => {
        window.location.href = "thank-you.html";
    }, 1500);
});

function showError(msg) {
    errorEl.textContent = msg;
}
