// Configurar gráfico inicial
const ctx = document.getElementById('graficoTemperatura').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            borderColor: '#e74c3c',
            tension: 0.1
        }]
    }
});

// Función para actualizar datos
async function actualizarDatos() {
    const response = await fetch('URL_DE_TU_SCRIPT_DE_GOOGLE');
    const datos = await response.json();
    
    // Extraer datos relevantes (ajusta los índices según tu estructura)
    const timestamps = datos.map(row => row[0]);
    const temperaturas = datos.map(row => row[1]);
    
    // Actualizar gráfico
    chart.data.labels = timestamps;
    chart.data.datasets[0].data = temperaturas;
    chart.update();
    
    // Actualizar último valor
    document.getElementById('ultimaTemperatura').textContent = 
        temperaturas[temperaturas.length - 1];
}

// Actualizar cada 5 minutos
actualizarDatos();
setInterval(actualizarDatos, 300000);
