const URL = "http://localhost:3000";
const modal = document.getElementById("mBorrar");
const idProd = document.getElementById("producId");
const tbody = document.getElementById("registros");
const form = document.getElementById("frm");
const nin = document.getElementById("nombre")
const pin = document.getElementById("precio");
const padre = pin.closest(".input-box");
const padre2 = nin.closest(".input-box");
const icon = padre.querySelector(".fas");
const icon2 = padre2.querySelector(".fas");
const errorLabel = document.getElementById("errLabel");
const save = document.getElementById("save");
const back = document.getElementById("back");
const mod = document.getElementById("mod");
const ma = document.getElementById("ma");
const btnOk = document.getElementById("ok");
const btnSalir = document.getElementById("salir");
const expRegNombre = /[a-zA-Z\s]{3,}/gm;
const expRegPrecio = /^[0-9]{3}/gm;
tbody.addEventListener("click", acciones);
nin.addEventListener("blur",validarNombre);
pin.addEventListener("blur",valirdarPrecio);
mod.addEventListener("click",salir);
save.addEventListener("click",enviarFormulario);
back.addEventListener("click",salir);
btnOk.addEventListener("click",borrProductos);
btnSalir.addEventListener("click",salirModal);
window.addEventListener("load",obtenerProductos);
function handlerJsonRequest(respuesta){
  if(!respuesta.ok){
    throw new Error("Error ajax");
  }
  return respuesta.json();
}
const states = {
  nombre: false,
  precio: false,
};
function obtenerProductos(){
fetch(URL+"/products")
.then(handleJsonResponse)
.then(result =>{
  renderTabla(result);
});
}
function renderTabla(productos){
let tabla = productos.map(crearFilaProducto);
tbody.innerHTML=tabla.join('');
}
function crearFilaProducto(producto){
return  `
<tr>
          <td>${producto.id}</td>
          <td>${producto.name}</td>
          <td>${producto.price} $</td>
          <td><i data-id="${producto.id}" class="fa fa-edit"></i></td>
          <td><i data-id="${producto.id}" class="fa fa-trash"></i></td>
        </tr>
`;
}
function enviarFormulario(e){
  const { id, nombre, precio } = form.elements;
  e.preventDefault();
  if((states.nombre && states.precio)){
    let prod = {
      name: nombre.value,
      price: precio.value
    };
      if(id.value==""){
        crearProducto(prod);
      }
      else{
        modiProducto(id.value, prod);
      }
  }
  else{
    nin.dispatchEvent(new Event('blur'));
    pin.dispatchEvent(new Event('blur'));
  }
}
function crearProducto(prod){
  fetch(URL+"/products", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(prod)
  })
    .then(handlerJsonRequest)
    .then(() => {
      obtenerProductos();
      removeIcon();
      borrar();
    })
    .catch(err=>console.error(err));
}
function buscarId(id){
  fetch(URL+`/products/${id}`)
.then(handleJsonResponse)
.then(result =>{
  form.elements.id.value=result.id;
  form.elements.nombre.value=result.name;
  form.elements.precio.value=result.price;
  ma.classList.toggle("hidden");
});
}
function salir(){
  form.elements.id.value="";
  form.elements.nombre.value="";
  form.elements.precio.value="";
  removeIcon();
  ma.classList.toggle("hidden")
}
function borrar(){
  form.elements.id.value=""
form.elements.nombre.value="";
form.elements.precio.value="";
}
function validarNombre(){
  if(expRegNombre.test(nombre.value) == false){
    states.nombre = false;
    icon2.classList.remove("fa-check-circle");
    icon2.classList.add("fa-times-circle");
  }else {
    states.nombre = true;
    icon2.classList.remove("fa-times-circle");
    icon2.classList.add("fa-check-circle");
  }
}
function valirdarPrecio(){
   if(expRegPrecio.test(precio.value) == false){
    states.precio = false;
     icon.classList.remove("fa-check-circle");
     icon.classList.add("fa-times-circle");
   }else {
    states.precio = true;
     icon.classList.remove("fa-times-circle");
     icon.classList.add("fa-check-circle");
   }
}
function removeIcon(){
  icon.classList.remove("fa-check-circle");
  icon2.classList.remove("fa-check-circle");
  icon.classList.remove("fa-times-circle");
  icon2.classList.remove("fa-times-circle");
}
function acciones(e){
  if(e.target.classList.contains("fa-edit")){
    const id = e.target.dataset.id;
 buscarId(id);
  }else if(e.target.classList.contains("fa-trash")){
    const id = e.target.dataset.id;
    modalBorrar(id);
  }
}
function modiProducto(id,prod){
  fetch(URL+`/products/${id}`, 
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(prod)
  })
    .then(handlerJsonRequest)
    .then(() => {
      
      removeIcon();
      borrar();
      ma.classList.toggle("hidden");
      obtenerProductos();
    })
    .catch(err=>console.error(err));
}
function borrProductos(){
   const id = idProd.value;
  fetch(URL+`/products/${id}`, 
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(handlerJsonRequest)
    .then(() => {
      salirModal();
      obtenerProductos();
    })
    .catch(err=>console.error(err));
}
function modalBorrar(id){
  modal.classList.toggle("hidden");
 idProd.value = id;
}
function salirModal(){
  modal.classList.toggle("hidden");
}