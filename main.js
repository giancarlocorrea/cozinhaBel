window.addEventListener('scroll', onScroll)

const navigation = document.getElementById('navigation')
const isMobile = window.matchMedia('only screen and (max-width: 480px)').matches
const isDesktop = window.matchMedia(
  'only screen and (max-width: 1400px)'
).matches

onScroll()
function onScroll() {
  showNavOnScroll()

  if (isMobile) showBackToTopButtonOnScroll(8000)
  else if (isDesktop) showBackToTopButtonOnScroll(3400)

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2

  // verificar se a seção passou da linha
  // quais dados vou precisar?
  const sectionTop = section.offsetTop
  const sectionHeight = section.offsetHeight
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

  // verificar se a base está abaixo da linha alvo

  const sectionEndsAt = sectionTop + sectionHeight
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    if (!navigation.classList.contains('scroll')) {
      navigation.classList.add('scroll')
    }
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll(point) {
  if (scrollY > 550) {
    if (!backToTopButton.classList.contains('show')) {
      backToTopButton.classList.add('show')
    }
  } else {
    backToTopButton.classList.remove('show')
  }

  if (scrollY >= point) {
    updateBackToTopButton(backToTopButton, 'light')
    return
  }
  if (
    backToTopButton.querySelector('circle').style.fill == `var(--brand-light)`
  ) {
    updateBackToTopButton(backToTopButton, 'dark')
  }
}

function updateBackToTopButton(button, op) {
  if (op == 'dark') {
    button.querySelector('circle').style.fill = `var(--primary-color)`
    button.querySelectorAll('path').forEach(element => {
      element.style.stroke = `var(--brand-light)`
    })
  } else if (op == 'light') {
    button.querySelector('circle').style.fill = `var(--brand-light)`
    button.querySelectorAll('path').forEach(element => {
      element.style.stroke = `var(--primary-color)`
    })
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
  document.querySelector('.menu').style.transform = 'translateX(0%)'
}

function closeMenu() {
  document.querySelector('.menu').style.transform = 'translateX(100%)'

  setTimeout(function () {
    document.body.classList.remove('menu-expanded')
  }, 500)
}

ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 1500
}).reveal(`
  #home, 
  #home img, 
  #home .stats, 
  #services,
  #services header,
  #services .cards,
  #services .card,
  #about, 
  #about header, 
  #about .content`)
