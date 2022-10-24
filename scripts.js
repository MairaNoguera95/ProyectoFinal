const ACCESS_TOKEN =
  "ya29.a0Aa4xrXO-CY1EIEzfEEmtjSlKfCxbmjm0w1WskXooWbyuULrbAtkQBuaElzmMwzIeV9FoApYZvWRTQLYdZaelpl4KZh2Gl5l3E0fh3OP-1nSKYuxFTyZRzTWZKtJjblQb76bMPn6c_ke6OEhRB9xi6IYVR59baCgYKATASARESFQEjDvL9aYfAN0nufxmZYkHjkpgEOQ0163";

const SHEET_ID = '11q1BIrpLy6LQcj7emLLFyLvJS_wCWMlQ2_CrygSqkcc';

document.getElementById('fecha').valueAsDate = new Date();
const form = document.getElementById("formulario");

function onRegistrarGasto() {
  //Obtenemos los datos del formulario
  const categoriaGastos = document.getElementById('categoria-gastos').value;
  const descripcion = document.getElementById('descripcion').value;
  const fecha = document.getElementById('fecha').value;
  const monto = document.getElementById('monto').value;

  // Bloque de validacion
  // Se pregunta si cada campo tiene algun valor, en el caso de que queden vacios se aborta la funcion con un return para que de por finalizada la accion, en el caso de que traigan datos los campos se procede a realizar el guardado dentro del google sheet
  if (categoriaGastos == '' || descripcion == '' || fecha == '' || monto == '' ) {
    alert('Los campos deben ser obligatorios');
    return;
  } else {
    //Creamos el JSON que espera nuestra API
    let data = {};
    let values = [];
    let fila = [categoriaGastos, descripcion, fecha, monto];
    values.push(fila);
    data.range = "hojaGastos";
    data.majorDimension = "ROWS";
    data.values = values;
    //Verificar que coincida con el nombre de la hoja de nuestro sheet
    data.range = "hojaGastos";

    data.majorDimension = "ROWS";
    data.values = values;
    //Invocamos al método POST de la API
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaGastos:append?valueInputOption=USER_ENTERED`,
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
    // alert('Tus gastos se registraron con éxito');
    document.getElementById('descripcion').value = "";
    document.getElementById('fecha').valueAsDate = new Date();
    document.getElementById('monto').value = "";
  }
}
// Se envia el evento listener el cual ejecuta la funcion para guardar en el sheet
form.addEventListener("submit", function (e) {
  e.preventDefault();
  onRegistrarGasto();
});