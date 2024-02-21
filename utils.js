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

const clickOnKey = (key, ...selectors) =>
  addEventListener('keyup', evt => {
    if (evt.key === key && !['input', 'textarea'].includes(document.activeElement.localName)) {
      const els = selectors.map(selector => document.querySelector(selector))
      if (els.some(Boolean)) {
        blur()
        els.forEach(el => el?.click())
      }
    }
  })

const clickOnEnter = (...selectors) => clickOnKey('Enter', ...selectors)

const clickOnEsc = (...selectors) => clickOnKey('Escape', ...selectors)

const clickOnSlash = (...selectors) => clickOnKey('/', ...selectors)

const warn = msg => {
  document.title = msg
  stop()
  document.body.remove()
  const observer = new MutationObserver(
    ([{ target }]) => target.text === msg || (target.text = msg),
  )
  observer.observe(document.querySelector('title'), { childList: true })
}

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
