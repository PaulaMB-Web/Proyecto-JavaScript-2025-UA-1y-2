function buscarPais() {
    const nombrePais = document.getElementById("btnpais").value.trim();//elimina espacios en blanco

    if (nombrePais === "") {
        alert("Por favor, ingresa un país.");
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${nombrePais}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("País no encontrado");
            }
            return response.json();
        })
        .then(data => {
            mostrarDatos(data[0]);
        })
        .catch(error => {
            document.getElementById("resultado").innerHTML = `${error.message}`;
        });
}

function mostrarDatos(pais) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h2>${pais.name.common}</h2>
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "No disponible"}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()} habitantes</p>
        <p><strong>Región:</strong> ${pais.region}</p>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" class="bandera">
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnpais').addEventListener('click', mostrarDatos, false);
  
});
