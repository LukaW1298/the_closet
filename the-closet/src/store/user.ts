import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const name = ref("");
    const emailAddress = ref("");
    const id = ref(0);
    
    return { name, emailAddress, id }
})