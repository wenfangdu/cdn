const remove = (...selectors) => {
  document.querySelectorAll(selectors).forEach(el => {
    el.remove()
  })
}

const blur = () => {
  setTimeout(() => document.activeElement.blur(), 10)
}

const focus = selector => {
  const el = document.querySelector(selector)
  if (!el) {
    return
  }
  const end = el.value.length
  el.setSelectionRange(end, end)
  el.focus()
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
