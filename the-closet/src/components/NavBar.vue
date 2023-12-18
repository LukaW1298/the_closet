<template>
    <nav class="navbar navbar-light bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand d-flex justify-content-between w-100 " href="javascript:void(0)" disabled>
                <div class="text-white">
                    <img src="/resources/favicon-96.png" alt="" width="30" height="24" class="d-inline-block align-text-top">
                    The Closet
                </div>
                <div class="text-white">
                    <slot></slot>
                </div>
                <div class="d-flex align-items-center text-white" :style="{ columnGap: '10px' }">
                    <font-awesome-icon icon="fa-moon" />
                    
                    <div class="form-check form-switch">
                        
                        <input class="form-check-input" 
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        @change="event => toggleColorMode(event)"
                        :checked="isThemeLight"
                        >
                        
                    </div>
                    <font-awesome-icon icon="fa-sun"/>
                </div>
            </a>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, onBeforeMount } from 'vue';

const isThemeLight = ref(false);

function toggleColorMode(event: Event) {
    if (event.target != null && (<HTMLInputElement>event.target).checked){
        document.documentElement.classList.remove("dark")
        document.documentElement.setAttribute("data-bs-theme", "light")
        localStorage.setItem("theme", "light");      
    }
    else {
        document.documentElement.classList.add("dark")
        document.documentElement.setAttribute("data-bs-theme", "dark")
        localStorage.setItem("theme", "dark");
    }
}

onBeforeMount(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute("data-bs-theme", "dark")
        isThemeLight.value = false;
    } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.setAttribute("data-bs-theme", "light")
        isThemeLight.value = true;
    }
})

</script>
<style scoped>
.form-check-input:checked {
    background-color: rgb(var(--royal-purple-500));
    border-color: #7030a0;
}

/*html[data-bs-theme=light] .navbar {
    background-color: rgb(var(--royal-purple-400)) !important;
    
}*/
</style>