const ACCESS_TOKEN =
  "ya29.a0Aa4xrXO-CY1EIEzfEEmtjSlKfCxbmjm0w1WskXooWbyuULrbAtkQBuaElzmMwzIeV9FoApYZvWRTQLYdZaelpl4KZh2Gl5l3E0fh3OP-1nSKYuxFTyZRzTWZKtJjblQb76bMPn6c_ke6OEhRB9xi6IYVR59baCgYKATASARESFQEjDvL9aYfAN0nufxmZYkHjkpgEOQ0163";
 
const SHEET_ID = '11q1BIrpLy6LQcj7emLLFyLvJS_wCWMlQ2_CrygSqkcc';

//////////////////////////////////////////////////////
// Ingresos
document.getElementById('fecha').valueAsDate = new Date();
const form1 = document.getElementById("id-fomulario2");

function onRegistrarIngresos() {
  //Obtenemos los datos del formulario
const categoriaIngreso = document.getElementById('categoria-ingresos').value;
const fecha = document.getElementById('fecha').value;
const monto = document.getElementById('monto').value;

if (categoriaIngreso == '' || fecha == '' || monto == '' ) {
    alert('Los campos deben ser obligatorios');
    return;
  } else {
//Creamos el JSON que espera nuestra API
let data = {};
let values = [];
let fila = [categoriaIngreso, fecha, monto];

values.push(fila);
data.range = "hojaIngresos";
data.majorDimension = "ROWS";
data.values = values;
//Verificar que coincida con el nombre de la hoja de nuestro sheet
data.range = "hojaIngresos";

data.majorDimension = "ROWS";
data.values = values;

//Invocamos al método POST de la API
fetch(
`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaIngresos:append?valueInputOption=USER_ENTERED`,
{
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  body: JSON.stringify(data)
}
).then(function (response) {
response.json().then(function (data) {

});
});

//Limpiamos los campos del formulario para permitir cargar un nuevo gasto

document.getElementById('categoria-ingresos');
document.getElementById('fecha').valueAsDate = new Date();
document.getElementById('monto').value = "";

    }
}

form1.addEventListener("submit", function (e) {
  e.preventDefault();
  onRegistrarIngresos();
});