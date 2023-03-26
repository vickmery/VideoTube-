// Obtener datos del almacenamiento local o crear un array vacío.

const regresar = document.querySelector(".header__figure");
  regresar.addEventListener("click", () => {
  window.location.href = "../index.html";
});


function datos() {
  // Obtenemos todos los videos guardados del localStorage.
  const datosGuardados = JSON.parse(localStorage.getItem("datosVideos")) || [];
  // Accedemos a la ultima posicion del array de videos.
  const lastItem = datosGuardados[datosGuardados.length - 1];
  // traemos el valos del ultimo id y le sumamos 1 ejemplo: (4 + 1).
  const id = lastItem ? lastItem.id + 1 : 1;
  // Capturamos los values de todos los inputs y selects.
  const select = document.querySelector("#categorias");
  const category = select.value;
  const creador = document.getElementById("creador_video").value;
  const titulo = document.getElementById("titulo_video").value;
  const url = document.getElementById("url_video").value;
  const duration = document.getElementById("duration_video").value;
  const visitas = Math.floor(Math.random() * 1000000) + " visitas";

  // Creamos un objecto con los datos de los inputs y lo agregamos a la ultima posicion del array de videos con el metodo push
  datosGuardados.push({
    id,
    category,
    creador,
    titulo,
    visitas,
    url,
    duration,
  });
  // Subimos el arreglo con el nuevo video al localStorage nuevamente.
  localStorage.setItem("datosVideos", JSON.stringify(datosGuardados));
  // Mostramos una alerta para que el usuario sepa que se guardo de forma correcta.
  Swal.fire("Buen trabajo!", "El nuevo video fue creado exitosamente", "success");
}

const form = document.getElementById("form"); //capturamos la etiqueta form del html.
form.addEventListener("submit", (event) => { // Escuchamos el evento submit.
  event.preventDefault(); //cancelamos para que se recargue la pagina automaticamente.
  const regex = /^\s*$|^\s+/;
  // Capturamos todos los campos que se llenan en el formulario.
  const formInputs = form.querySelectorAll("input, select");
  // verificar si todos los inputs estan con algun valor.
  let i = 0;
  while (i < formInputs.length) {
    if (regex.test(formInputs[i].value)) {
      Swal.fire({
        title: "Por favor, llene todos los campos del formulario",
        icon: "error"
      });
      return;
    }
    i++;
  }
  // Validacion para saber si todos los campos estan llenos.
  if(formInputs.length === i) {
    datos();
    i = 0;
  }
})