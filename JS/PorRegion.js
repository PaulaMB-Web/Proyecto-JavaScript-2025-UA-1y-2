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
        document.getElementById("resultado").innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function renderizarPaises() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; 

    datosPaises.forEach(pais => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${pais.name.common}</h3>
            <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "No disponible"}</p>
            <p><strong>Población:</strong> ${pais.population.toLocaleString()} habitantes</p>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
        `;
        resultado.appendChild(card);
    });
}

