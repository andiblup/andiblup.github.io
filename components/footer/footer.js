// import Path from '../../js/path.js'

// let pathinstance = new Path();
// console.log(pathinstance.getRelativePathToComponents() + '/footer/footer.html');
function Footer() {
    // console.log(new Path().getRelativePathToComponents() + '/footer/footer.html);
    return {
        path: './components/footer/footer.html',
        loadFooter() {
            console.log(this.path);
            fetch(this.path)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('footer').innerHTML = html;
                })
                .catch(error => {
                    console.error('Error loading the footer:', error);
                });
        },
    }
}
