let dataSearch = [];

document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const searchValue = document.getElementById('searchInput').value;

  if (searchValue <= 0) {
    fetch('http://158.247.122.111:3000/car')
        .then(response => response.json())
        .then(data => {
          dataSearch = data.data; // Ensure dataSearch is updated
          crearTarjetas(dataSearch);
        })
        .catch(err => console.log(err));
  } else {
    fetch(`http://158.247.122.111:3000/car/model/${searchValue}`)
        .then(response => response.json())
        .then(data => {
          dataSearch = data.data; // Ensure dataSearch is updated
          crearTarjetas(dataSearch);
        })
        .catch(err => console.log(err));
  }
});

(() => {
  fetch('http://158.247.122.111:3000/car')
      .then(response => response.json())
      .then(data => {
        dataSearch = data.data; // Ensure dataSearch is updated
        crearTarjetas(dataSearch);
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
        <button class="btn btn-primary edit-btn" data-id="${item._id}">Edit</button>
        <button class="btn btn-danger delete-btn" data-id="${item._id}">Delete</button>
      </div>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });

  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', handleEdit);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDelete);
  });
}

function handleEdit(event) {
  const carId = event.target.getAttribute('data-id');
  console.log('Car ID:', carId); // Log the car ID
  console.log('Data Search:', dataSearch); // Log the dataSearch array
  const car = dataSearch.find(item => item._id === carId);

  if (car) {
    document.getElementById('editCarId').value = car._id;
    document.getElementById('editModel').value = car.model;
    document.getElementById('editPlate').value = car.plate;
    document.getElementById('editDepartment').value = car.department;
    document.getElementById('editTown').value = car.town;
    document.getElementById('editImage').value = car.imag;

    const editCarModal = new bootstrap.Modal(document.getElementById('editCarModal'));
    editCarModal.show();
  } else {
    console.error('Car not found');
  }
}

document.getElementById('editCarForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const carId = document.getElementById('editCarId').value;
  const updatedCar = {
    model: document.getElementById('editModel').value,
    plate: document.getElementById('editPlate').value,
    department: document.getElementById('editDepartment').value,
    town: document.getElementById('editTown').value,
    imag: document.getElementById('editImage').value
  };

  fetch(`http://158.247.122.111:3000/car/${carId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCar)
  })
      .then(response => {
        if (response.ok) {
          alert('Car updated successfully');
          // Refresh the car list
          fetch('http://158.247.122.111:3000/car')
              .then(response => response.json())
              .then(data => crearTarjetas(data.data))
              .catch(err => console.log(err));
        } else {
          throw new Error('Error updating the car');
        }
      })
      .catch(err => alert(`Error: ${err.message}`));
});

function handleDelete(event) {
  const carId = event.target.getAttribute('data-id');
  if (confirm('Are you sure you want to delete this car?')) {
    fetch(`http://158.247.122.111:3000/car/${carId}`, {
      method: 'DELETE'
    })
        .then(response => {
          if (response.ok) {
            alert('Car deleted successfully');
            // Refresh the car list
            fetch('http://158.247.122.111:3000/car')
                .then(response => response.json())
                .then(data => crearTarjetas(data.data))
                .catch(err => console.log(err));
          } else {
            throw new Error('Error deleting the car');
          }
        })
        .catch(err => alert(`Error: ${err.message}`));
  }
}