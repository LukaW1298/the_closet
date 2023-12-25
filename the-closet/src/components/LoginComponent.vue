<template>
    <div class="container-md mt-3 p-3" :style="{ backgroundColor: 'var(--bs-body-bg)' }">
        <h4 class="pb-3 text-center">Login</h4>
        <div>
            <form @submit.prevent="login">
                <div class="mb-3 px-4">
                    <label for="username" class="form-label">Username</label>
                    <input id="username" type="text" v-model="username" placeholder="Benutzername" class="form-control">
                </div>
                <div class="mb-3 px-4">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" v-model="password" placeholder="Passwort" class="form-control">
                </div>
                <div class="mb-3 px-4 d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">Log in</button>
                </div>
            </form>
        </div>

        <div v-if="responseError.length > 0" class="alert alert-danger mx-4" role="alert">
            The login attempt hasn't been successful.
            <br><br>
            Error message: {{ responseError }}
        </div>
        <slot></slot>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { postLogin } from '@/composables/PostCalls';
import { getUser } from '@/composables/GetCalls';
import { useUserStore } from '@/store/user';

const store = useUserStore();
const username = ref("");
const password = ref("");
const responseError = ref("");

const login = () => {
    postLogin(username.value, password.value)
        .then((response) => {
            console.log(response)

            if (response.ok) {
                getUser(username.value).then((result) => {
                    console.log(result)

                    store.$patch({
                        id: result.id,
                        name: result.username,
                        emailAddress: result.email
                    })   
                })

                router.push("/tabs");
            }

            return response.json();
        })
        .then((result) => {
            console.log("Result:", result);

            if (result.error)
                responseError.value = result.error;
            if (result.message && result.status !== "200")
                responseError.value = result.message;
        })
        .catch((error) => {
            console.log("Error:", String(error));
        })
}
</script>
