(() => {
    fetch('http://158.247.122.111:3000/car')
        .then(data => data.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
})();