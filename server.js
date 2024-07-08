const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, req.file.path);

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    //Siguiendo el formato de la tabla
    const rows = data.slice(1).map(row => ({
        NIT: row[0] || '',
        'Razón Social': row[1] || '',
        'Cod. Depto': row[2] || '',
        Departamento: row[3] || '',
        'Cod. Municipio': row[4] || '',
        Municipio: row[5] || '',
        'CIIU Rev 4 principal': row[6] || '',
        'Descripción CIIU principal': row[7] || '',
        'Cadena CIIU principal': row[8] || '',
        'Valor agregado empresa': row[9] || '',
        Activos: row[10] || '',
        'Ingresos operacionales': row[11] || '',
        Utilidad: row[12] || '',
        'Tamaño empresa': row[13] || '',
        'Sucursal sociedad extranjera': row[14] || '',
        'Antigüedad empresa': row[15] || '',
        RUES: row[16] || '',
        Supersociedades: row[17] || '',
        Exportadora: row[18] || ''
    }));

    res.json(rows);
    
    //Eliminar por el momento, ya luego veremos como hacemos con el posgresql
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error al eliminar el archivo:', err);
        }
    });
});

//Colocamos port 5500 para prueba local
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
