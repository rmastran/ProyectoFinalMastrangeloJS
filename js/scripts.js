//Variable que mantiene el estado visible del carrito
let carritoVisible = false;
let carrito = [];

setup();
obtenerItemsCarrito();
// const agregarCarritoItemsDOM = async () => {
//   /*  Modelo
//         <div id="1" class="item">
//             <span class="anfitrion-item">Francia 1924</span>
//             <span class="campeon-item">Campeón: Uruguay</span>
//             <img src="img/pelota1924.png" alt="" class="img-item">
//             <span class="precio-item">$65.000</span>
//             <button class="boton-item">Agregar al Carrito</button>
//         </div>
//     */
//   try {
//     const response = await fetch("./producto.json");
//     const producto = await response.json();

//     producto.forEach((item) => {
//       const parent = document.getElementsByClassName("contenedor-items")[0];
  
//       const divItem = document.createElement("div");
//       const spanAnfitrion = document.createElement("span");
//       const spanCampeon = document.createElement("span");
//       const img = document.createElement("img");
//       const spanPrecio = document.createElement("span");
//       const button = document.createElement("button");
  
//       divItem.id = item.id;
//       divItem.className = "item";
//       spanAnfitrion.className = "anfitrion-item";
//       spanCampeon.className = "campeon-item";
//       img.className = "img-item";
//       spanPrecio.className = "precio-item";
//       button.className = "boton-item";
//       button.onclick = function (event) {
//         agregarAlCarritoClicked(event);
//       };
  
//       img.src = item.img;
  
//       spanAnfitrion.innerHTML = item.anfrition;
//       spanCampeon.innerHTML = "Campeon: " + item.campeon;
//       spanPrecio.innerHTML = item.precio;
//       button.innerHTML = "Agregar al Carrito";
  
//       divItem.appendChild(spanAnfitrion);
//       divItem.appendChild(spanCampeon);
//       divItem.appendChild(img);
//       divItem.appendChild(spanPrecio);
//       divItem.appendChild(button);
  
//       parent.appendChild(divItem);
//     }); 
//   } catch(error){
//     console.log(error);
//   }
// }
agregarCarritoItemsDOM();

function setup() {
  // Iniciacion
  //Agregremos funcionalidad a los botones eliminar del carrito
  let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (let i = 0; i < botonesEliminarItem.length; i++) {
    let button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito);
  }

  //Agrego funcionalidad al boton sumar cantidad
  let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
  for (let i = 0; i < botonesSumarCantidad.length; i++) {
    let button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidad);
  }

  //Agrego funcionalidad al buton restar cantidad
  let botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (let i = 0; i < botonesRestarCantidad.length; i++) {
    let button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidad);
  }

  //Agregamos funcionalidad al boton comprar
  document
    .getElementsByClassName("btn-pagar")[0]
    .addEventListener("click", pagarClicked);
}

//Agregamos los objetos carritos en localstorage y lo guardamos en la variable global carrito
function obtenerItemsCarrito() {
  const localCarrito = localStorage.getItem("carrito");
  if (localCarrito) {
    //Operador $$ (Nullish Coalescing)
    carrito = JSON.parse(localCarrito) ?? [];
  }

  carrito.forEach((element) => {
    agregarItemAlCarrito(
      element.id,
      element.anfitrion,
      element.campeon,
      element.precio,
      element.imagenSrc,
      element.cantidad,
      true
    );
    hacerVisibleCarrito();
  });
}

//Eliminamos todos los elementos del carrito, vaciamos en localStorage y lo ocultamos
function pagarClicked() {
  Swal.fire(
    'Gracias por su compra!',
    'Compra realizada con éxito.',
    'success'
  )
  //Elimino todos los elmentos del carrito
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarTotalCarrito();
  ocultarCarrito();
}
//Funcion que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  let button = event.target;
  let item = button.parentElement;
  let id = item.id;
  let anfitrion = item.getElementsByClassName("anfitrion-item")[0].innerText;
  let campeon = item.getElementsByClassName("campeon-item")[0].innerText;
  let precio = item.getElementsByClassName("precio-item")[0].innerText;
  let imagenSrc = item.getElementsByClassName("img-item")[0].src;
  let cantidad = 1;

  let exist = false;
  carrito.forEach((element) => {
    if (element.id == id) {
      exist = true;
      return;
    }
  });

  if (!exist) {
    const objetoCarrito = {
      id,
      anfitrion,
      campeon,
      precio,
      imagenSrc,
      cantidad,
    };
    carrito.push(objetoCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  agregarItemAlCarrito(id, anfitrion, campeon, precio, imagenSrc, cantidad);
  hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
  carritoVisible = true;
  let carrito = document.getElementsByClassName("carrito")[0];
  carrito.style.marginRight = "0";
  carrito.style.opacity = "1";

  let items = document.getElementsByClassName("contenedor-items")[0];
  items.style.width = "60%";
}

//Funcion que agrega un item al carrito
function agregarItemAlCarrito(
  id,
  anfitrion,
  campeon,
  precio,
  imagenSrc,
  cantidad,
  local = false
) {
  let item = document.createElement("div");
  item.classList.add = "item";
  let itemsCarrito = document.getElementsByClassName("carrito-items")[0];

  if (!local) {
    //controlamos que el item que intenta ingresar no se encuentre en el carrito si es que lo agrego el usuario.
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName(
      "carrito-item-titulo"
    );
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
      if (nombresItemsCarrito[i].innerText == anfitrion) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Esta Pelota ya se agregó al carrito.'
        })
        return;
      }
    }
  }

  let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-id">${id}</span>
                <span class="carrito-item-titulo">${anfitrion}</span>
                <span class="carrito-item-titulo">${campeon}</span>
                <div class="selector-cantidad">
                    <i class="bi bi-dash-lg restar-cantidad"></i>
                    <input type="text" value="${cantidad}" class="carrito-item-cantidad" disabled>
                    <i class="bi bi-plus-lg sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  //Agregamos la funcionalidad eliminar al nuevo item
  item
    .getElementsByClassName("btn-eliminar")[0]
    .addEventListener("click", eliminarItemCarrito);

  //Agregmos al funcionalidad restar cantidad del nuevo item
  let botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
  botonRestarCantidad.addEventListener("click", restarCantidad);

  //Agregamos la funcionalidad sumar cantidad del nuevo item
  let botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
  botonSumarCantidad.addEventListener("click", sumarCantidad);

  //Actualizamos total
  actualizarTotalCarrito();
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
  let buttonClicked = event.target;
  let selector = buttonClicked.parentElement;
  let selectorParent = selector.parentElement;
  let id =
    selectorParent.getElementsByClassName("carrito-item-id")[0].innerText;
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;

  actualizaCantidad(id, cantidadActual);
  actualizarTotalCarrito();
}

//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
  let buttonClicked = event.target;
  let selector = buttonClicked.parentElement;
  let selectorParent = selector.parentElement;
  let id = selectorParent.getElementsByClassName("carrito-item-id")[0].innerText;
  let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
  cantidadActual--;
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
    actualizaCantidad(id, cantidadActual);
    actualizarTotalCarrito();
  } else {
    // Eliminar item del carrito enviando el evento click del Boton Eliminar
    Swal.fire({
      title: 'Está seguro?',
      text: "Se eliminará del carrito ésta Pelota!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'La Pelota ha sido eliminada del carrito.',
          'success'
        )
      }
    })
    let botonEliminar = selectorParent.parentElement.getElementsByClassName("btn-eliminar")[0];
    botonEliminar.click();
  }
}

function actualizaCantidad(id, cantidad) {
  carrito.forEach((element) => {
    if (element.id == id) {
      element.cantidad = cantidad;
    }
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizaDelCarrito(id) {
  carrito.forEach((element) => {
    if (element.id == id) {
      element.cantidad = cantidad;
    }
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  Swal.fire({
    title: 'Está seguro?',
    text: "Se eliminará del carrito esta Pelota!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'La Pelota ha sido eliminada del carrito.',
        'success'
      )
      let buttonClicked = event.target;
  let carritoItem = buttonClicked.parentElement;
  let carritoItemDetalles = carritoItem.getElementsByClassName(
    "carrito-item-detalles"
  )[0];
  let id =
    carritoItemDetalles.getElementsByClassName("carrito-item-id")[0].innerText;
  buttonClicked.parentElement.parentElement.remove();

  for (let i = 0; i < carrito.length; i++) {
    //Operador &&
    carrito[i].id == id && carrito.splice(i, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  //Actualizamos el total del carrito
  actualizarTotalCarrito();

  //la siguiente funciòn controla si hay elementos en el carrito
  //Si no hay elimino el carrito
  ocultarCarrito();
    }
  })
}

//Funcion que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    let carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    let items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
  //seleccionamos el contenedor carrito
  let carritoContenedor = document.getElementsByClassName("carrito")[0];
  let carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  let total = 0;
  //recorremos cada elemento del carrito para actualizar el total
  for (let i = 0; i < carritoItems.length; i++) {
    let item = carritoItems[i];
    let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
    //quitamos el simobolo peso y el punto de milesimos.
    let precio = parseFloat(
      precioElemento.innerText.replace("$", "").replace(".", "")
    );
    let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    let cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + total.toLocaleString("es") + ",00";
}