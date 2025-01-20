document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const sidebarToggle = document.getElementById("toggle-sidebar");
    const sidebar = document.querySelector("#sidebar");

    // Toggle Theme
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Persist theme
    });

    // Persist Theme on Reload
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Sidebar Toggle
    // if (sidebarToggle) {
        // sidebarToggle.addEventListener("click", () => {
        //     sidebar.classList.toggle("sidebar--open");
        // });
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    // }
    
});
