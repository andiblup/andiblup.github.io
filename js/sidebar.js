document.addEventListener("DOMContentLoaded", () => {
    // const sidebarToggle = document.getElementById("toggle-sidebar");
    // const sidebar = document.querySelector("#sidebar");
    //     sidebarToggle.addEventListener("click", () => {
    //         sidebar.classList.toggle("open");
    //     });
    //? Sidebar
    const sidebarToggle = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    // const navElements = document.getElementsByClassName('nav-link');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        overlay.classList.toggle('visible');
        // Array.from(navElements).forEach(element => {
        //     element.classList.toggle('display-none')
        // });

        const icon = sidebarToggle.querySelector('.icon i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('bi-chevron-left');
            icon.classList.add('bi-chevron-right');
        } else {
            icon.classList.remove('bi-chevron-right');
            icon.classList.add('bi-chevron-left');
        }
    });

    overlay.addEventListener('click', function () {
        sidebar.classList.add('collapsed');
        overlay.classList.remove('visible');

        const icon = sidebarToggle.querySelector('.icon i');
        icon.classList.remove('bi-chevron-left');
        icon.classList.add('bi-chevron-right');
    });

});
