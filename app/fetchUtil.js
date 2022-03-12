function handleJsonResponse(r) {
    if(r.status == 404){
      throw new Error("Recurso no encontrado");
    }
  
    if(r.status != 200){
      throw new Error("Error de ajax");
    }
  
    return r.json();
  }
  