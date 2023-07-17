const url = "http://localhost:3000";

async function listarrutas() {
    let rutas = await (await fetch(`${url}/Rutas`)).json();
    HTMLRutas(rutas);
}

listarrutas();


function categories(rutas, elementP) {
    let categoryName = "";
    rutas.forEach((elementC) => {
        if (elementP.RutaId == elementC.Id) {
            console.log(elementP.NomPuntos);
            categoryName = elementP.NomPuntos;
        }
    });
    return categoryName;
}

/*select funcion*/
function HTMLRutas(rutas) {
    let categoryId = document.querySelector("#conopuntos");
    categoryId.innerHTML = "";
    rutas.forEach((element) => {
        let option = document.createElement("option");
        console.log(element);
        option.setAttribute("value", `${element.Id}`);
        option.innerHTML = `${element.NomRuta}`;
        categoryId.appendChild(option);
    });
}


/* puntos?ruta= , buscar &= a buscar */

async function filtro(identificacion) {
    let puntos = await (await fetch(`${url}/Puntos?RutaId=${identificacion}`)).json();
    return puntos
}

const select = document.getElementById("conopuntos");

select.addEventListener("change", async (e) => {
    e.preventDefault();

    let identificacion = e.target.value;

    let puntos = await filtro(identificacion);

    console.log(puntos);

    let tbody = document.getElementById("puntospuntos")
    let str = ""
    puntos.forEach((element) => {
        str += `
        <div class="col-2" id="punto-${element.id}">
            <div class="card" style="width: 18rem;">
                <img src="${element.Imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.NomPuntos}</h5>
                    <button> editar</button>
                    <button> eliminar</button>
                </div>
            </div>
        </div>
        `
    })
    tbody.innerHTML = str
});



//  Llenan el formulario, y le click al boton
// Cada vez que le den click, usted va a extraer los valores que pusieron en el formulario
// Traer los value de los input
const botonagregaruta= document.getElementById("agregar");
const nombreruta= document.getElementById("nombreruta").value;
botonagregaruta.addEventListener("click", (e) => {
    e.preventDefault();

    const nuevaRuta = {
        NomRuta: nombreruta.value,
    };

    fetch(`${url}/Rutas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaRuta),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
});


//Para hacer un put, necesita el id del elemento a editar
//Cada vez que le den click en editar, extraer los datos
 // const editarRuta = {
//     //     Id: 50 ,
//     //     NomRuta: Medellin,
//     //   };
// fetch(url/Rutas/id, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(editarRuta),
//   })
// })

