document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    // const icon = toggleButton.firstChild.firstChild;

    // Check Local Storage for theme preference    
    const currentTheme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.classList.remove('bi-moon');
        toggleButton.classList.add('bi-sun');
    }

    toggleButton.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleButton.classList.remove('bi-sun');
            toggleButton.classList.add('bi-moon');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleButton.classList.remove('bi-moon');
            toggleButton.classList.add('bi-sun');
        }
    });
});
