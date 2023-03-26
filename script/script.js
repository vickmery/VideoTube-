import { datosVideos } from "./data.js";
const datosGuardados = JSON.parse(localStorage.getItem("datosVideos")) || datosVideos;
// Si no hay datos en el localStorage guardamos todos los videos
if(localStorage.getItem("datosVideos") === null) {
  localStorage.setItem("datosVideos", JSON.stringify(datosVideos));
}
console.log(datosGuardados);

const containerVideos = document.querySelector(".main__videos");

const printVideos = (container, videoList) => {
  container.innerHTML = "";
  videoList.forEach((video) => {
    container.innerHTML += `
    <article class="videos" name=${video.id} data-video='video' id="${video.category}">
      <figure class="video__figure">
        <img src="${video.thumbnail}" data-video='video' name=${video.id} id="${video.category}">
        <span  data-video='video' name=${video.id} id="${video.category}">${video.duration}</span>
      </figure>
      <section class="video__description"  data-video='video' name=${video.id} id="${video.category}">
        <figure class="video__thumbail" data-video='video' name=${video.id} id="${video.category}">
          <img src="${video.logo}">
        </figure>
        <section class="video__info"  data-video='video' name=${video.id} id="${video.category}">
          <h1>${video.titulo}</h1>
          <p>${video.creador}</p>
          <p>${video.visitas} - ${video.fecha_subida}</p>
        </section>
      </section>
    </article>`;
  });
};


document.addEventListener("DOMContentLoaded", () => {
 
  printVideos(containerVideos, datosGuardados) //escucha evento
});
const BotonProBuscar = document.getElementById ("BotonProBuscar")
console.log ("BotonProBuscar", BotonProBuscar)
BotonProBuscar.addEventListener("click",(event)=> {
  const busqueda12 = document.getElementById ("busqueda12").value 

const filtradoBusqueda = datosGuardados.filter(item=> item.titulo.includes(busqueda12))
console.log ("esto es una busqueda, busqueda", filtradoBusqueda)
printVideos(containerVideos,filtradoBusqueda ) //imprime en pantalla la busqueda del usuario
}) 

document.addEventListener("click", (event) => {
  const videoAttribute = event.target.getAttribute("data-video");

  if (videoAttribute === "video") {
    const id = event.target.getAttribute("name");
    const categoryVid = event.target.getAttribute("id");
    sessionStorage.setItem("category", JSON.stringify(categoryVid));
    sessionStorage.setItem("id", JSON.stringify(id));
    window.location.href = "./pages/video.html";
  }
});

const subir = document.querySelector(".subir__video");

subir.addEventListener("click", () => {
  window.location.href = "/pages/subir.html";
});