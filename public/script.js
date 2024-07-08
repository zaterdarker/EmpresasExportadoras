document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('http://localhost:5500/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const previewDiv = document.getElementById('preview');
        previewDiv.innerHTML = '<h2>Vista Previa del Archivo Cargado</h2>';
        
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>NIT</th>
                    <th>Razón Social</th>
                    <th>Cod. Depto</th>
                    <th>Departamento</th>
                    <th>Cod. Municipio</th>
                    <th>Municipio</th>
                    <th>CIIU Rev 4 principal</th>
                    <th>Descripción CIIU principal</th>
                    <th>Cadena CIIU principal</th>
                    <th>Valor agregado empresa</th>
                    <th>Activos</th>
                    <th>Ingresos operacionales</th>
                    <th>Utilidad</th>
                    <th>Tamaño empresa</th>
                    <th>Sucursal sociedad extranjera</th>
                    <th>Antigüedad empresa</th>
                    <th>RUES</th>
                    <th>Supersociedades</th>
                    <th>Exportadora</th>
                </tr>
            </thead>
            <tbody>
                ${data.slice(0, 20).map(row => `
                    <tr>
                        <td>${row.NIT}</td>
                        <td>${row['Razón Social']}</td>
                        <td>${row['Cod. Depto']}</td>
                        <td>${row.Departamento}</td>
                        <td>${row['Cod. Municipio']}</td>
                        <td>${row.Municipio}</td>
                        <td>${row['CIIU Rev 4 principal']}</td>
                        <td>${row['Descripción CIIU principal']}</td>
                        <td>${row['Cadena CIIU principal']}</td>
                        <td>${row['Valor agregado empresa']}</td>
                        <td>${row.Activos}</td>
                        <td>${row['Ingresos operacionales']}</td>
                        <td>${row.Utilidad}</td>
                        <td>${row['Tamaño empresa']}</td>
                        <td>${row['Sucursal sociedad extranjera']}</td>
                        <td>${row['Antigüedad empresa']}</td>
                        <td>${row.RUES}</td>
                        <td>${row.Supersociedades}</td>
                        <td>${row.Exportadora}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        previewDiv.appendChild(table);

        createPagination(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function createPagination(data) {
    const previewDiv = document.getElementById('preview');
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';

    const pages = Math.ceil(data.length / 20);
    for (let i = 1; i <= pages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => showPage(data, i));
        paginationDiv.appendChild(button);
    }

    previewDiv.appendChild(paginationDiv);
}

function showPage(data, page) {
    const start = (page - 1) * 20;
    const end = start + 20;
    const rows = data.slice(start, end);

    const tableBody = document.querySelector('#preview table tbody');
    tableBody.innerHTML = rows.map(row => `
        <tr>
            <td>${row.NIT}</td>
            <td>${row['Razón Social']}</td>
            <td>${row['Cod. Depto']}</td>
            <td>${row.Departamento}</td>
            <td>${row['Cod. Municipio']}</td>
            <td>${row.Municipio}</td>
            <td>${row['CIIU Rev 4 principal']}</td>
            <td>${row['Descripción CIIU principal']}</td>
            <td>${row['Cadena CIIU principal']}</td>
            <td>${row['Valor agregado empresa']}</td>
            <td>${row.Activos}</td>
            <td>${row['Ingresos operacionales']}</td>
            <td>${row.Utilidad}</td>
            <td>${row['Tamaño empresa']}</td>
            <td>${row['Sucursal sociedad extranjera']}</td>
            <td>${row['Antigüedad empresa']}</td>
            <td>${row.RUES}</td>
            <td>${row.Supersociedades}</td>
            <td>${row.Exportadora}</td>
        </tr>
    `).join('');
}
