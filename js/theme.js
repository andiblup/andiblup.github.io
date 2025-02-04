document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle-button');
    const toggleIcon = document.getElementById('theme-toggle-icon');
    const body = document.body;
    // const icon = toggleButton.firstChild.firstChild;

    // Check Local Storage for theme preference    
    const preferedTheme = localStorage.getItem('theme');
    let currentTheme = '';
    if (!preferedTheme) {
        currentTheme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'dark';
    } else {
        currentTheme = preferedTheme;
    }

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleIcon.classList.remove('bi-moon-fill');
        toggleIcon.classList.add('bi-sun-fill');
    }

    toggleButton.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleIcon.classList.remove('bi-sun-fill');
            toggleIcon.classList.add('bi-moon-fill');

        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleIcon.classList.remove('bi-moon-fill');
            toggleIcon.classList.add('bi-sun-fill');

        }
        //* Update Chart.js colors
            const textColor = window.getComputedStyle(document.body).getPropertyValue('--text');

            Object.keys(window.charts).forEach((key) => {

                let chart = window.charts[key];

                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.y.ticks.color = textColor;
                chart.options.plugins.legend.labels.color = textColor;
                chart.options.plugins.title.color = textColor;
            
                chart.update();

            });
            
    });
});
