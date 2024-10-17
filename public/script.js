(() => {
  fetch('http://localhost:3000/car')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        crearTarjetas(data.data);
      })
      .catch(err => console.log(err));
})();

function crearTarjetas(lista) {
  const container = document.getElementById("card-group");
  container.innerHTML = '';

  lista.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-3 mb-3';

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marcador de posición: Capuchón de imagen" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
      </svg>
      <div class="card-body">
        <h5 class="card-title">${item.model}</h5>
        <p class="card-text">
          Placa: ${item.plate} <br>
          Departamento: ${item.department} <br>
          Ciudad: ${item.town}
        </p>
      </div>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });
}