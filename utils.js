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

const clickOnEnter = (...selectors) =>
  addEventListener('keydown', ({ key }) => {
    key === 'Enter' && selectors.forEach(selector => document.querySelector(selector)?.click())
  })

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
