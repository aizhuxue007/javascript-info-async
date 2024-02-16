async function loadJson(url) {
    try {
        const resp = await fetch(url)
        return resp.json()
    } catch (err) {
        throw err
    }
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert);

