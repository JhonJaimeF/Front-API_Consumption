(() => {
    fetch('http://localhost:3000/')
        .then(data => data.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
})();