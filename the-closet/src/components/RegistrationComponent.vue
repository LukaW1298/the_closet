<template>
    <div class="container-md mt-3 p-3" :style="{ backgroundColor: 'var(--bs-body-bg)' }">
        <h4 class="pb-3 text-center">Registrieren</h4>
        <div>
            <form @submit.prevent="login">
                <div class="mb-3 px-4">
                    <label for="username" class="form-label">E-Mail</label>
                    <input id="username" type="text" v-model="state.username" placeholder="mail@example.com"
                        class="form-control">
                </div>
                <div class="mb-3 px-4">
                    <label for="username" class="form-label">Benutzername</label>
                    <input id="username" type="text" v-model="state.username" placeholder="example" class="form-control">
                </div>
                <div class="mb-3 px-4">
                    <label for="password" class="form-label">Passwort</label>
                    <input id="password" type="password" v-model="state.password" placeholder="password"
                        class="form-control">
                </div>
                <div class="mb-3 px-4 d-flex justify-content-center">

                    <button type="submit" class="btn btn-primary">Registrieren</button>
                </div>
            </form>
        </div>

        
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex'; // Assuming Vuex is set up properly
import router from '@/router';


export default {
    setup() {
        const store = useStore(); // Access the Vuex store

        // Reactive state using the Composition API
        const state = reactive({
            username: '',
            password: ''
        });

        const errorMessage = ref("");

        // Login function
        const login = () => {
            // Perform authentication logic using Vuex actions
            store.dispatch('loginUser', {
                username: state.username,
                password: state.password
            }).then(() => {
                // Redirect to dashboard or another route on successful login
                // Example: router.push('/dashboard');

                console.log('Logged in successfully!');

                router.push("/tabs");
            }).catch(error => {
                // Handle authentication error
                errorMessage.value = error;
                console.error('Login failed:', error);
            });
        };

        return {
            state,
            login,
            errorMessage
        };
    }
};
</script>
