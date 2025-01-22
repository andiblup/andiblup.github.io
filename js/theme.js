document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    // const icon = toggleButton.firstChild.firstChild;

    // Check Local Storage for theme preference    
    const currentTheme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'dark';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.classList.remove('bi-moon');
        toggleButton.classList.add('bi-sun');
        try {
            const icons = document.querySelectorAll('.icons-custom-mapbox');
            icons.forEach(icon => {
                icon.backgroundImage = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='white' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>")`;
            });
        }
         catch (error) {
            console.error('Error: ', error);
        }
    }

    toggleButton.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleButton.classList.remove('bi-sun');
            toggleButton.classList.add('bi-moon');
            try {
                const icons = document.querySelectorAll('.icons-custom-mapbox');
                
                icons.forEach(icon => {
                    const svg = `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>`;
                    const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
                    icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
                    icon.style.backgroundSize = 'contain';
                    icon.style.backgroundRepeat = 'no-repeat';
                    icon.style.backgroundPosition = 'center';
                });
            }
             catch (error) {
                console.error('Error: ', error);
            }
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleButton.classList.remove('bi-moon');
            toggleButton.classList.add('bi-sun');
            try {
                const icons = document.querySelectorAll('.icons-custom-mapbox');
                
                
                icons.forEach(icon => {
                    const svg = `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='white' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>`;
                    const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
                    icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
                    icon.style.backgroundSize = 'contain';
                    icon.style.backgroundRepeat = 'no-repeat';
                    icon.style.backgroundPosition = 'center';
                });
                
            }
             catch (error) {
                console.error('Error: ', error);
            }
        }
    });
});
