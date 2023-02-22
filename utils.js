const remove = (...selectors) =>
  selectors.forEach(selector => document.querySelectorAll(selector).forEach(el => el.remove()))

const _focus = input => {
  if (input) {
    input.disabled &&= false

    input.focus()

    const end = input.value.length

    input.setSelectionRange(end, end)
  }
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
  addEventListener('keydown', evt => {
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

const disable = selector => {
  let el = document.querySelector(selector)

  el && (el.disabled ||= true)
}

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
