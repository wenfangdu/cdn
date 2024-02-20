const remove = (...selectors) => {
  document.querySelectorAll(selectors).forEach(el => {
      el.remove()
  })
}

const blur = () => {
  setTimeout(() => document.activeElement.blur(), 10)
}

const focus = input => {
  if (!input) {
    return
  }
  input.focus()
  const end = input.value.length
  input.setSelectionRange(end, end)
}

const focusOnSlash = (...selectors) =>
  addEventListener('keyup', ({ key }) => {
    if (key === '/' && !['input', 'textarea'].includes(document.activeElement.localName)) {
      const input = selectors.map(selector => document.querySelector(selector)).find(Boolean)
      _focus(input)
    }
  })

const focusOnMountedAndOnSlash = (selector, { onMounted = true } = {}) => {
  onMounted && _focus(document.querySelector(selector))
  focusOnSlash(selector)
}

const clickOnKey = (key, ...selectors) =>
  addEventListener('keyup', evt => {
    if (evt.key === key && !['input', 'textarea'].includes(document.activeElement.localName)) {
      const els = selectors.map(selector => document.querySelector(selector))
      if (els.some(Boolean)) {
        document.activeElement.blur()
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
