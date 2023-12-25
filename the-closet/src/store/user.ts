import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const name = ref("");
    const emailAddress = ref("");
    const password = ref("");
    
    return { name, emailAddress, password }
})