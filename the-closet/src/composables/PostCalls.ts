const address = import.meta.env.VITE_API_ADDRESS;
let headers = new Headers;
headers.append("Content-Type", "application/json")
headers.append("Access-Control-Allow-Origin", "*")

export async function postRegister(userName: string, emailAddress: string, password: string) {
    return fetch(address + "/api/register",
        {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            headers: headers,
            body: JSON.stringify({
                "username": userName,
                "email": emailAddress,
                "password": password
            })
        }
    );
}