let datosPaises = []; 

async function buscarPorRegion() {
    const regionSeleccionada = document.getElementById("region").value;
    const url = `https://restcountries.com/v3.1/region/${regionSeleccionada}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se pudieron obtener los países");

        datosPaises = await response.json();
        renderizarPaises();
    } catch (error) {
        document.getElementById("resultado").innerHTML = `${error.message}`;
    }
}

function renderizarPaises() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; 

    datosPaises.forEach(pais => {
        const card = document.createElement("div");//se crea div para mostrar la informacion
        card.classList.add("card");//agrega una clase card (css)
        card.innerHTML = `
            <h3 style="cursor: pointer;" onclick="mostrarDetalles('${pais.name.common}', '${pais.capital ? pais.capital[0] : "No disponible"}', ${pais.population}, '${pais.region}', '${pais.flags.svg}')">${pais.name.common}</h3>
        `;
        resultado.appendChild(card);
    });
}
//actualiza el modal
function mostrarDetalles(nombre, capital, poblacion, continente, bandera) {
    document.getElementById('modalNombre').innerText = `Nombre: ${nombre}`;
    document.getElementById('modalCapital').innerText = `Capital: ${capital}`;
    document.getElementById('modalPoblacion').innerText = `Población: ${poblacion.toLocaleString()} habitantes`;
    document.getElementById('modalContinente').innerText = `Continente: ${continente}`;
    document.getElementById('modalBandera').src = bandera;

    // Mostrar el modal
    $('#tareaModal').modal('show');
}