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