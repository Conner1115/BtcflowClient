export async function postJson(url: string, body: Record<string, any>) {
  return await fetch("https://hackathonserver.replitironclad.repl.co" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export async function getJSON(url: string) {
  return await fetch("https://hackathonserver.replitironclad.repl.co" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
}
