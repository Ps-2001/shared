export const Ck = () => {

  function set (name, value, maxAge, path)  {

    if (!name || !value) return false

    let str = `${name}=${value}`

    if (maxAge) str += `;max-age=${maxAge}`
    if (path) str += `;path=${path}`

    document.cookie = str
  }

  const get = (name) => {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    return matches ? decodeURIComponent(matches[0]).split('=')[1] : null;
  }

  const getAll = () => {

    let obj = {};
    let cookies = document.cookie.split(/;/);

    for (let i = 0, len = cookies.length; i < len; i++) {
      const cookie = cookies[i].split(/=/);
      obj[cookie[0]] = cookie[1];
    }

    return obj
  }

  const del = (name) => {

    if (!name) return false
    document.cookie = `${name}=;max-age=-1`;

  }

  const clear = () => {

    let cookies = document.cookie.split(/;/);

    for (let i = 0, len = cookies.length; i < len; i++) {
      const cookie = cookies[i].split(/=/);
      document.cookie = cookie[0] + "=;max-age=-1";
    }

  }

  return { set, getAll, get, del, clear }
}

const ck = Ck()

export { ck }