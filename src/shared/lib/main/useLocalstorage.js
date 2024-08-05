export const Lk = () => {

  const localStorage = window.localStorage

  function set (name, value)  {
    localStorage.setItem(name, value)
  }

  const get = (name) => {
    return localStorage.getItem(name)
  }

  const del = (name) => {
    localStorage.removeItem(name)
  }

  const clear = () => {
    localStorage.clear()
  }

  return { set, get, del, clear }
}

const lk = Lk()

export { lk }