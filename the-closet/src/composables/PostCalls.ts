import { storeToRefs } from "pinia";
import { useClothingStore } from '@/store/clothingItem';

const address = import.meta.env.VITE_API_ADDRESS;
const headers = new Headers;
headers.append("Content-Type", "application/json");
headers.append("Access-Control-Allow-Origin", "*");

export function postRegister(userName: string, emailAddress: string, password: string) {
  return fetch(address + "/api/auth/register",
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

export function postLogin(userName: string, password: string) {
  return fetch(address + "/api/auth/login",
    {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: headers,
      body: JSON.stringify({
        "username": userName,
        "password": password
      })
    }
  );
}

// export function postImage(url: string) {
//   return fetch(address + "/api/images",
//     {
//       method: "POST",
//       mode: "cors",
//       redirect: "follow",
//       headers: headers,
//       body: JSON.stringify({
//         "url": url
//       })
//     }
//   );
// }


export function postClothing() {
  const { clothingItem} = storeToRefs(useClothingStore());

  return fetch(address + "/api/clothing",
    {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: headers,
      body: JSON.stringify(clothingItem.value)
    }
  );
}


export function postImage(image: File | Blob) {
  const formData = new FormData();
  formData.append("file", image);

  return fetch(address + "/api/images/upload", {
    method: "POST",
    body: formData
  });
}