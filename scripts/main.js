document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-section")
  const eyeContainer = document.querySelector(".eye-container")
  const aura = document.querySelector(".aura")
  const mainContent = document.querySelector(".main-content")
  const imgContainer = document.querySelector(".img-container")
  const carousel = document.querySelector(".carousel")
  const track = document.querySelector(".carousel-track")

  if (!heroSection || !eyeContainer || !aura || !mainContent || !imgContainer || !carousel || !track) {
    console.error("No se pudieron encontrar todos los elementos necesarios.")
    return
  }

  // Función para desplazarse al inicio de la página
  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  // Ejecutar scrollToTop inmediatamente y después de un pequeño retraso
  scrollToTop()
  setTimeout(scrollToTop, 100)

  // Verificar si la página se ha recargado
  if (performance.navigation.type === 1 || sessionStorage.getItem("reloaded")) {
    scrollToTop()
    sessionStorage.removeItem("reloaded")
  }

  // Marcar que la página se está recargando antes de que ocurra
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("reloaded", "true")
  })

  // Inyectar imagen de forma segura
  const img = new Image()
  img.src = "./assets/OjoBritannia.png"
  img.alt = "Eye of Sauron"
  img.classList.add("eye-image")
  img.onload = () => {
    eyeContainer.appendChild(img)
  }
  img.onerror = () => {
    console.error("Error al cargar la imagen.")
    eyeContainer.style.display = "none"
  }

  const img2 = new Image()
  img2.src = "./assets/SpawnOjo.png"
  img2.alt = "Spawn Eye"
  img2.onload = () => {
    imgContainer.appendChild(img2)
  }
  img2.onerror = () => {
    console.error("Error al cargar la imagen.")
    imgContainer.style.display = "none"
  }

  function updateScroll() {
    const scrolled = window.scrollY
    const threshold = window.innerHeight

    if (scrolled <= threshold) {
      const opacity = 1 - scrolled / threshold
      const scale = 1 - (scrolled / threshold) * 0.2

      heroSection.style.opacity = opacity.toString()
      eyeContainer.style.transform = `scale(${scale})`
      aura.style.opacity = opacity.toString()

      // Mantener las animaciones activas mientras es visible
      eyeContainer.style.animationPlayState = "running"
      aura.style.animationPlayState = "running"
    } else {
      heroSection.style.opacity = "0"
      eyeContainer.style.animationPlayState = "paused"
      aura.style.animationPlayState = "paused"
    }

    // Ajustar la posición del contenido principal
    mainContent.style.transform = `translateY(${Math.max(0, threshold - scrolled)}px)`
  }

  window.addEventListener("scroll", updateScroll)
  updateScroll() // Llamar a la función inicialmente para establecer el estado correcto

  // Funcionalidad del carrusel
  function setupCarousel() {
    // Duplicar las imágenes para crear un efecto continuo
    const images = Array.from(track.querySelectorAll("img"))
    const imageWidth = images[0].offsetWidth + Number.parseFloat(getComputedStyle(images[0]).marginRight)
    const totalWidth = images.length * imageWidth

    // Clonar imágenes hasta llenar el contenedor
    let clonedWidth = totalWidth
    while (clonedWidth < carousel.offsetWidth * 2) {
      // Asegurarse de que el contenido sea el doble del ancho del contenedor
      images.forEach((img) => {
        const clone = img.cloneNode(true)
        track.appendChild(clone)
        clonedWidth += imageWidth
      })
    }

    // Ajustar la animación basada en el contenido
    adjustCarouselAnimation()
  }

  function adjustCarouselAnimation() {
    const images = track.querySelectorAll("img")
    const imageWidth = images[0].offsetWidth + Number.parseFloat(getComputedStyle(images[0]).marginRight)
    const totalWidth = images.length * imageWidth
    const duration = (totalWidth / carousel.offsetWidth) * 15 // 15 segundos por vuelta completa

    track.style.animationDuration = `${duration}s`
  }

  setupCarousel()

  // Ajustar la animación cuando cambie el tamaño de la ventana
  window.addEventListener("resize", adjustCarouselAnimation)

  // Implementar animación del carrusel con requestAnimationFrame
  let lastTime = 0
  const speed = 0.05 // Ajusta este valor para controlar la velocidad

  function animateCarousel(currentTime) {
    if (lastTime === 0) {
      lastTime = currentTime
    }
    const deltaTime = currentTime - lastTime

    track.scrollLeft += speed * deltaTime

    if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
      track.scrollLeft = 0
    }

    lastTime = currentTime
    requestAnimationFrame(animateCarousel)
  }

  requestAnimationFrame(animateCarousel)
})