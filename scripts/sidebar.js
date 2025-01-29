document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector("#sidebar")
  const sidebarToggle = document.querySelector("#sidebarToggle")
  let lastScrollTop = 0
  let isScrollingUp = false

  function toggleSidebar() {
    if (sidebar && sidebarToggle) {
      sidebar.classList.toggle("open")
      if (sidebar.classList.contains("open")) {
        sidebarToggle.style.opacity = "0"
        sidebarToggle.style.pointerEvents = "none"
      } else {
        setTimeout(() => {
          sidebarToggle.style.opacity = "1"
          sidebarToggle.style.pointerEvents = "auto"
        }, 300)
      }
    }
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (sidebar && !sidebar.classList.contains("open")) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        isScrollingUp = false
        if (sidebarToggle) {
          sidebarToggle.style.opacity = "0"
          sidebarToggle.style.transform = "translateY(-100%)"
        }
      } else {
        // Scrolling up
        isScrollingUp = true
        if (sidebarToggle) {
          sidebarToggle.style.opacity = "1"
          sidebarToggle.style.transform = "translateY(0)"
        }
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar)
  }

  window.addEventListener("scroll", handleScroll)

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (sidebar && sidebarToggle && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
      if (sidebar.classList.contains("open")) {
        toggleSidebar()
      }
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) {
      toggleSidebar()
    }
  })

  // Añadir botón de cierre en el sidebar
  const closeButton = document.createElement("button")
  closeButton.innerHTML = "×"
  closeButton.classList.add("sidebar-close")
  closeButton.addEventListener("click", toggleSidebar)
  sidebar.appendChild(closeButton)
})