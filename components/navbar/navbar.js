function Navbar() {
    return {
        init() {
            fetch('navbar.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('navbar').innerHTML = html;
                });
        }
    }
}