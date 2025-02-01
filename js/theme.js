document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle-button');
    const toggleIcon = document.getElementById('theme-toggle-icon');
    const body = document.body;
    // const icon = toggleButton.firstChild.firstChild;

    // Check Local Storage for theme preference    
    const currentTheme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'dark';
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
            // try {
            //     const mapboxIcons = document.querySelectorAll('.icons-custom-mapbox');

            //     mapboxIcons.forEach(icon => {
            //         const svg = `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>`;
            //         const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
            //         icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
            //         icon.style.backgroundSize = 'contain';
            //         icon.style.backgroundRepeat = 'no-repeat';
            //         icon.style.backgroundPosition = 'center';
            //     });

            // }
            // catch (warn) {
            //     console.warn('Error: ', warn);
            // }
            // try {
            //     const inertiaIcons = document.querySelectorAll('.icons-custom-inertia');

            //     inertiaIcons.forEach(icon => {
            //         const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><g transform='translate(0,200) scale(0.1,-0.1)' fill='black' stroke='none'><path d='M0 1000 l0 -1000 1000 0 1000 0 0 1000 0 1000 -1000 0 -1000 0 0 -1000z m900 205 l205 -205 -205 -205 -205 -205 -213 0 -214 0 196 201 c108 110 196 205 196 209 0 4 -88 99 -196 209 l-196 201 214 0 213 0 205 -205z m636 0 l203 -205 -203 -205 -203 -205 -212 0 c-116 0 -211 3 -211 7 0 4 89 97 197 205 l198 198 -198 198 c-108 108 -197 201 -197 205 0 4 95 7 212 7 l211 0 203 -205z'/></g></svg>`;
            //         const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
            //         icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
            //         icon.style.backgroundSize = 'contain';
            //         icon.style.backgroundRepeat = 'no-repeat';
            //         icon.style.backgroundPosition = 'center';
            //     });
            // } catch (warn) {
            //     console.warn('Error: ', warn);
            // }
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleIcon.classList.remove('bi-moon-fill');
            toggleIcon.classList.add('bi-sun-fill');
            // try {
            //     const mapboxIcons = document.querySelectorAll('.icons-custom-mapbox');

            //     mapboxIcons.forEach(icon => {
            //         const svg = `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='white' d='m12 0c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794s-1.323-7.316 2.794-11.433c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174z'/></svg>`;
            //         const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
            //         icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
            //         icon.style.backgroundSize = 'contain';
            //         icon.style.backgroundRepeat = 'no-repeat';
            //         icon.style.backgroundPosition = 'center';
            //     });

            // }
            // catch (warn) {
            //     console.warn('Error: ', warn);
            // }
            // try {
            //     const inertiaIcons = document.querySelectorAll('.icons-custom-inertia');

            //     inertiaIcons.forEach(icon => {
            //         const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><g transform='translate(0,200) scale(0.1,-0.1)' fill='white' stroke='none'><path d='M0 1000 l0 -1000 1000 0 1000 0 0 1000 0 1000 -1000 0 -1000 0 0 -1000z m900 205 l205 -205 -205 -205 -205 -205 -213 0 -214 0 196 201 c108 110 196 205 196 209 0 4 -88 99 -196 209 l-196 201 214 0 213 0 205 -205z m636 0 l203 -205 -203 -205 -203 -205 -212 0 c-116 0 -211 3 -211 7 0 4 89 97 197 205 l198 198 -198 198 c-108 108 -197 201 -197 205 0 4 95 7 212 7 l211 0 203 -205z'/></g></svg>`;
            //         const encodedSVG = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
            //         icon.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodedSVG}")`;
            //         icon.style.backgroundSize = 'contain';
            //         icon.style.backgroundRepeat = 'no-repeat';
            //         icon.style.backgroundPosition = 'center';
            //     });
            // } catch (warn) {
            //     console.warn('Error: ', warn);
            // }
        }
    });
});
