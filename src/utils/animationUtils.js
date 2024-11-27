export const vScrollAnimate = {
    mounted: (el, binding) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Add animate.css classes when element is visible
            el.classList.add('animate__animated', binding.value || 'animate__fadeIn')
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
    }
  }
  