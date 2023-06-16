const agregarCarritoItemsDOM = async () => {
  try {
    const response = await fetch("./productos.json");
    const productos = await response.json();

    productos.forEach((item) => {
      const parent = document.getElementsByClassName("contenedor-items")[0];
  
      const divItem = document.createElement("div");
      const spanAnfitrion = document.createElement("span");
      const spanCampeon = document.createElement("span");
      const img = document.createElement("img");
      const spanPrecio = document.createElement("span");
      const button = document.createElement("button");
  
      divItem.id = item.id;
      divItem.className = "item";
      spanAnfitrion.className = "anfitrion-item";
      spanCampeon.className = "campeon-item";
      img.className = "img-item";
      spanPrecio.className = "precio-item";
      button.className = "boton-item";
      button.onclick = function (event) {
        agregarAlCarritoClicked(event);
      };
  
      img.src = item.img;
  
      spanAnfitrion.innerHTML = item.anfrition;
      spanCampeon.innerHTML = "Campeon: " + item.campeon;
      spanPrecio.innerHTML = item.precio;
      button.innerHTML = "Agregar al Carrito";
  
      divItem.appendChild(spanAnfitrion);
      divItem.appendChild(spanCampeon);
      divItem.appendChild(img);
      divItem.appendChild(spanPrecio);
      divItem.appendChild(button);
  
      parent.appendChild(divItem);
    }); 
  } catch(error){
    console.log(error);
  }
}