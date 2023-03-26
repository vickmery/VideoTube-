import { datosVideos } from "./data.js";
const datosGuardados = JSON.parse(sessionStorage.getItem("datosVideos")) || datosVideos;

const logo = document.querySelector(".header__figure ");

logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const idVideoJ = JSON.parse(sessionStorage.getItem("id")) || 0;
const idVideo = Number(idVideoJ);

const cateHolder = JSON.parse(sessionStorage.getItem("category"));

const video = datosGuardados.find((vid) => vid.id === idVideo);
const infoVideo = document.getElementById("main__video");
const recoVideo = document.getElementById("main__videos");


const showVideo = (contenedor, video) => {
  const seccionVideo = document.createElement("section");
  seccionVideo.classList.add("main_tests");
  seccionVideo.innerHTML = `
  <iframe src="${video.url}" class="frame__video"></iframe>
  <section class="video__rep">
    <figure class="video__thumbail" data-video='video'>
      <img src="${video.logo}">
    </figure>
    <section id="video__info"  data-video='video'>
      <h1>${video.titulo}</h1>
      <p>${video.creador}</p>
      <p>${video.visitas} - ${video.fecha_subida}</p>
    </section>
  </section>`;

  console.log(seccionVideo);
  contenedor.appendChild(seccionVideo);
};

const videosRecomendados = (contenedor) => {
  let recomendados = datosGuardados.filter(
    (videos) => videos.id != idVideo && videos.category === cateHolder
  );
  const seccionRecomendados = document.createElement("section");
  seccionRecomendados.classList.add("seccion__recom");
  seccionRecomendados.innerHTML = "";

  recomendados.forEach((vids) => {
    seccionRecomendados.innerHTML += `
    
  <section class="video__description" >
    <figure class="video__figure">
      <img src="${vids.thumbnail}" data-video='video' name=${vids.id} id="${vids.category}">
      <span  data-video='video'>${vids.duration}</span>
    </figure>
    <section class="video__info"  data-video='video'>
  
      <h1>${vids.titulo}</h1>
      <p>${vids.creador}</p>
      <p>${vids.visitas} - ${vids.fecha_subida}</p>
    </section>
  </section>
  `;
  });
  contenedor.appendChild(seccionRecomendados);
};

showVideo(infoVideo, video);
videosRecomendados(recoVideo);

document.addEventListener("click", (event) => {
  const videoAttribute = event.target.getAttribute("data-video");
  console.log("Hice Click", event.target);
  if (videoAttribute === "video") {
    const id = event.target.getAttribute("name");
    const categoryVid = event.target.getAttribute("id");
    sessionStorage.setItem("category", JSON.stringify(categoryVid));
    sessionStorage.setItem("id", JSON.stringify(id));
    window.location.href = "./video.html";
  }
});

const subir = document.querySelector(".subir__video");

subir.addEventListener("click", () => {
  window.location.href = "../pages/subir.html";
});