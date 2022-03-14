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