const remove = (...selectors) => {
  document.querySelectorAll(selectors).forEach(el => {
    el.remove()
  })
}

const blur = () => {
  const interval = setInterval(() => document.activeElement.blur())
  setTimeout(() => clearInterval(interval), 300)
}

const focus = selector => {
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView({ block: 'center' })
    el.focus()
    el.setSelectionRange(el.value.length, el.value.length)
  }
}

const focusOnSlash = (...selectors) => {
  addEventListener('keyup', ({ key }) => {
    if (key === '/' && !['input', 'textarea'].includes(document.activeElement.localName)) {
      const selector = selectors.find(selector => document.querySelector(selector))
      focus(selector)
    }
  })
}

const click = (selector, target = document) => {
  target.querySelector(selector)?.click()
}

const clickOnEnter = (...selectors) => {
  addEventListener('keyup', ({ key }) => {
    if (key === 'Enter' && !['input', 'textarea'].includes(document.activeElement.localName)) {
      const selector = selectors.find(selector => document.querySelector(selector))
      click(selector)
    }
  })
}

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

const warn = msg => {
  stop()
  document.title = msg
  document.body.remove()
  const observer = new MutationObserver(([{ target }]) => (target.text = msg))
  observer.observe(document.querySelector('title'), { childList: true })
}
