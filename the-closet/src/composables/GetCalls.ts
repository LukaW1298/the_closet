import { ref } from 'vue';
import { Category, Material } from '@/custom_types';

const address = import.meta.env.VITE_API_ADDRESS;
const requestOptions = {
  method: "GET",
  mode: "cors",
  redirect: "follow"
};
console.log("address", address);

export async function getMaterials() {
  return fetch(address + "/api/materials", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getBrands() {
  return fetch(address + "/api/brands", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getWashingModes() {
  return fetch(address + "/api/washingModes", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getUser(username: string) {
  return fetch(address + "/api/auth/" + username, {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getParentCategories() {
  return fetch(address + "/api/parentCategorys", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getCategories() {
  return fetch(address + "/api/categories", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getStatus() {
  return fetch(address + "/api/statuss", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getColors() {
  return fetch(address + "/api/colors", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}


export async function getClothings() {
  return fetch(address + "/api/clothing", {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}

export async function getClothing(id: number) {
  return fetch(address + "/api/clothing/" + id, {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    }
    );
}

export async function getImage(id: number) {
  return fetch(address + "/api/images/" + id, {
    method: "GET",
    mode: "cors",
    redirect: "follow"
  })
    .then(response => {
      return response.json();
    });
}