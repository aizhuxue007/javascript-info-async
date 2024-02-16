class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  const resp = await fetch(url);
  if (resp.status == 200) {
    return resp.json();
  } else {
    throw new HttpError(response);
  }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");
  const resp = await loadJson(`https://api.github.com/users/${name}`)
  const user = resp.user
  const err = resp.status
  if (user) {
    alert(`Full name: ${user.name}.`);
    return user;
  } else if (err instanceof HttpError && err.response.status == 404) {
    alert("No such user, please reenter.");
        return demoGithubUser();
  } else {
    throw err;
  }
}

demoGithubUser();
