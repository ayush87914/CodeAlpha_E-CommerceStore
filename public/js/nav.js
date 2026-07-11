// Har logged-in page pe user avatar dropdown (Profile + Logout) chalata hai
function initUserMenu() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const avatarBtn = document.getElementById("avatarBtn");
    const dropdown = document.getElementById("dropdown");
    const nameEl = document.getElementById("dropdownName");
    const emailEl = document.getElementById("dropdownEmail");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!avatarBtn) return;

    if (user) {
        avatarBtn.textContent = user.name ? user.name.charAt(0).toUpperCase() : "U";
        if (nameEl) nameEl.textContent = user.name || "User";
        if (emailEl) emailEl.textContent = user.email || "";
    } else {
        avatarBtn.textContent = "?";
    }

    avatarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => dropdown.classList.remove("show"));

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        });
    }
}

initUserMenu();