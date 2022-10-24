const SHEET_ID = "11q1BIrpLy6LQcj7emLLFyLvJS_wCWMlQ2_CrygSqkcc";

const ACCESS_TOKEN =
  "ya29.a0Aa4xrXO-CY1EIEzfEEmtjSlKfCxbmjm0w1WskXooWbyuULrbAtkQBuaElzmMwzIeV9FoApYZvWRTQLYdZaelpl4KZh2Gl5l3E0fh3OP-1nSKYuxFTyZRzTWZKtJjblQb76bMPn6c_ke6OEhRB9xi6IYVR59baCgYKATASARESFQEjDvL9aYfAN0nufxmZYkHjkpgEOQ0163";

fetch(
  // Obtenemos los datos de la planilla, de la hoja hojaGastos, columnas A y B desde la segunda fila
  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaIngresos!A2:E`,
  {
         headers: {
                    "Content-Type": "application/json",
                      Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
  }
        //esperamos el response
)
.then(function (response) {
        //esperamos el json del response para poder utilizarlo
        response.json().then(
            function (data) {
            const VALUES = data.values;
          //  console.log(VALUES)
            // Obtenemos el elemento del dom
            const LISTA = document.getElementById("lista-ingresos");

            for (var i = 0; i < VALUES.length; i++) {
            //console.log(i);
              // Div que va a contener los datos del producto
             const PRODUCTO = document.createElement("div");
             PRODUCTO.className =  "lista-item";

                         // Nombre de la categoria
                        const itemCategoria = document.createElement("span");
                        itemCategoria.className = "item categoria";
                        itemCategoria.innerHTML = VALUES[i][0]; 
                        // Descripcion del gasto
                        // fecha
                        const itemfecha = document.createElement("span");
                        itemfecha.className = "item fecha";
                        itemfecha.innerHTML = VALUES[i][1];
                         // Monto
                         const itemMonto = document.createElement("span");
                         itemMonto.className = "item monto";
                         itemMonto.innerHTML = VALUES[i][2];
                        // Agregamos todos los elementos al div de producto
                        PRODUCTO.appendChild(itemCategoria);
                        PRODUCTO.appendChild(itemfecha);
                        PRODUCTO.appendChild(itemMonto);
                        // Agregamos el producto a la lista
                        LISTA.appendChild(PRODUCTO);
                        
                    }
                }
        )   
    }
    );

