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
      <img class="card-img-top" src="${item.imag}" alt="Imagen del coche" width="100%" height="180" style="object-fit: cover;">
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

