import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Cookies from 'js-cookie';
import { User } from "@/custom_types";


export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const emailAddress = ref("");
  const id = ref(-1);

  const isLoggedIn = computed(() => {
    loadFromCookie();

    return id.value > -1;
  });

  function login(newUser: Required<User>, stayLoggedIn: boolean) {
    id.value = newUser.id;
    name.value = newUser.username;
    emailAddress.value = newUser.email;

    if (stayLoggedIn)
      saveToCookie();
  }

  function logout() {
    Cookies.remove("user", {
      sameSite: "strict"
    });

    name.value = "";
    emailAddress.value = "";
    id.value = -1;

  }

  function saveToCookie () { 
    Cookies.set("user", JSON.stringify({
      name: name.value,
      emailAddress: emailAddress.value,
      id: id.value
    }), {
      sameSite: "strict",
      expires: 3
    });
  }

  function loadFromCookie () {
    const cookie = Cookies.get("user");

    if (cookie !== undefined) {
      ({ name: name.value,
         emailAddress: emailAddress.value,
         id: id.value } = JSON.parse(cookie));
    }
  }


    
  return {
    name,
    emailAddress,
    id,
    saveToCookie,
    loadFromCookie,
    isLoggedIn,
    logout,
    login
  };
});

