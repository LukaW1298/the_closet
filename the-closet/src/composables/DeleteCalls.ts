const address = import.meta.env.VITE_API_ADDRESS;
const headers = new Headers;
headers.append("Content-Type", "application/json");
headers.append("Access-Control-Allow-Origin", "*");

export function deleteClothing(id: number | string) {

  return fetch(address + "/api/clothing/" + id,
    {
      method: "DELETE",
      mode: "cors",
      redirect: "follow",
      headers: headers
    }
  );
}