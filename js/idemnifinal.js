//Idemnizaciones.

const importeagregado = 1.21

function calcularIndemnizacion(sueldo, años, fallecimiento) {
    let sueldobase = parseFloat(sueldo) * importeagregado
    let sueldox = sueldobase * años

    if (fallecimiento === "si") {
        sueldox = sueldox * 0.50
    }

    return sueldox
}

document.querySelector("#calcularBtn").addEventListener("click", function() {
    const sueldo = document.querySelector("#salario").value
    const años = document.querySelector("#anios").value
    const fallecimiento = document.querySelector("#despido").value

    if (sueldo !== "" && años !== "" && fallecimiento !== "Seleccionar...") {
        const indemnizacion = calcularIndemnizacion(sueldo, años, fallecimiento)
        document.querySelector("#valorIdemnizacion").innerText = indemnizacion.toFixed(2)
        guardarIndemnizacionEnLS(indemnizacion)
    } else {
        alert("Por favor, complete todos los campos.")
    }
})

//Local Storage

function recuperarUltimaIdemnizacion() {
    return JSON.parse(localStorage.getItem("ultimaIndemnizacion"))
}

function guardarIndemnizacionEnLS(indemnizacion) {
    const ultimaIndemnizacion = {
        fecha: new Date(),
        indemnizacion: indemnizacion.toFixed(2)
    };

    localStorage.setItem("ultimaIndemnizacion", JSON.stringify(ultimaIndemnizacion))
}

document.querySelector("#btnverultimaidemnizacion").addEventListener("click", () => {
    const ultimaIndemnizacion = recuperarUltimaIdemnizacion()

    if (ultimaIndemnizacion !== null) {
        alert("Su última indemnización fue el: " + new Date(ultimaIndemnizacion.fecha).toLocaleString() + " con un monto de: $" + ultimaIndemnizacion.indemnizacion)
    } else {
        alert("No has realizado cotizaciones previamente.")
    }
})