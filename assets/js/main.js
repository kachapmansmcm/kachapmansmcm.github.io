(function() {
    "use strict";
  

    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
    
        if (selectEl) {
          if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
          } else {
            selectEl.addEventListener(type, listener)
          }
        }
      }

      const scrollto = (el) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      //shows different sections based on navbar navigation
      on('click', '#navbar .nav-link', function(e) {
        let section = select(this.hash)
        if (section) {
          e.preventDefault()
    
          let navbar = select('#navbar')
          let header = select('#header')
          let sections = select('section', true)
          let navlinks = select('#navbar .nav-link', true)
    
          navlinks.forEach((item) => {
            item.classList.remove('active')
          })
    
          this.classList.add('active')
      
          if (this.hash == '#header') {
            header.classList.remove('header-top')
            sections.forEach((item) => {
              item.classList.remove('section-show')
            })
            return;
          }
    
          if (!header.classList.contains('header-top')) {
            header.classList.add('header-top')
            setTimeout(function() {
              sections.forEach((item) => {
                item.classList.remove('section-show')
              })
              section.classList.add('section-show')
    
            }, 350);
          } else {
            sections.forEach((item) => {
              item.classList.remove('section-show')
            })
            section.classList.add('section-show')
          }
    
          scrollto(this.hash)
        }
      }, true)


  //sets navbar for intial page load
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });
})()
