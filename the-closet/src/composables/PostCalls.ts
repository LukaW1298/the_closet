import { storeToRefs } from "pinia";
import { useClothingStore } from '@/store/clothingItem';
import { useUserStore } from "../store/user";

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


export function postOutfit(date: string, weatherID: number, outfitTypeID: number, clothingOutfits, outfitOccasions) {
  const userStore = useUserStore();

  return fetch(address + "/api/outfit", {
    method: "POST",
    mode: "cors",
    headers: headers, 
    body: JSON.stringify({ 
      date: date,
      user: {
        id: userStore.id
      },
      weather: {
        id: weatherID
      },
      outfitType: {
        id: outfitTypeID
      },
      clothingOutfits: clothingOutfits,
      outfitOccasions: outfitOccasions
    })
  });
}