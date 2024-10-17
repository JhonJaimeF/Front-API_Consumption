fetch('./departments.json')
    .then(response => response.json())
    .then(departments => {
        // Llenar select de departments
        const departmentSelect = document.getElementById('departmentSelect');
        departments.forEach(department => {
            let option = document.createElement('option');
            option.value = department.code;
            option.textContent = department.name;
            departmentSelect.appendChild(option);
        });
    })
    .catch(err => console.log(err));

const departmentSelect = document.getElementById('departmentSelect');
const townSelect = document.getElementById('townSelect');

function updateTownOptions(towns) {
    const selectedValue = departmentSelect.value; 
    townSelect.innerHTML = ''; 

    towns
        .filter(town => town.department === selectedValue) 
        .forEach(town => {
            let option = document.createElement('option');
            option.value = town.department;
            option.textContent = town.name;
            townSelect.appendChild(option);
        });
}

fetch('./towns.json')
    .then(response => response.json())
    .then(towns => {
        updateTownOptions(towns);
        departmentSelect.addEventListener('change', () => updateTownOptions(towns));
    })
    .catch(err => console.log(err));

(() => {
    fetch('http://localhost:3000/dealer')
        .then(response => response.json())
        .then(data => {
            const dealers = data.data;
            const dealerSelect = document.getElementById('dealerSelect');
  
            dealers.forEach(dealer => {
                let option = document.createElement('option');
                option.value = dealer._id;
                option.textContent = dealer.name;
                dealerSelect.appendChild(option);
            });
         })
        .catch(err => console.log(err));
})();


document.querySelector('#btnSend').addEventListener('click', (event) => {
    
    // Previene que el formulario se envíe y recargue la página
    event.preventDefault(); 

    const plate = document.querySelector('#plate').value;  
    const model = document.querySelector('#model').value;  
    const valueDepartment = document.querySelector('#departmentSelect').options[document.querySelector('#departmentSelect').selectedIndex].text;  
    const valueTown = document.querySelector('#townSelect').options[document.querySelector('#townSelect').selectedIndex].text;
    const idDealer = document.querySelector('#dealerSelect').value;
  
    const data = { model: model, plate: plate, department: valueDepartment, town: valueTown, dealer: idDealer };

    // Muestra los datos en la consola
    //console.log(data);

    
    fetch(`http://localhost:3000/car/${idDealer}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Error al guardar los datos.");
        }
    })
    .then(res => alert("Datos guardados correctamente."))
    .catch(err => alert(`Error: ${err.message}`));
    
});