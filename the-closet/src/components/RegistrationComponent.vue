<template>
    <div class="container-md mt-3 p-3" :style="{ backgroundColor: 'var(--bs-body-bg)' }">
        <h4 class="pb-3 text-center">Register</h4>
        <div>
            <form>
                <div class="mb-3 px-4">
                    <label for="email" class="form-label">E-mail address</label>
                    <input id="email" type="text" v-model="emailAddress" placeholder="mail@example.com"
                        :class="{ 'form-control': true, '!border-red-800': emptyEmail }" @blur="emailFocusOut = true">
                    <div v-if="emptyEmail" class="text-xs text-red-800">Please enter an e-mail address.</div>
                </div>

                <div class="mb-3 px-4">
                    <label for="username" class="form-label">Username</label>
                    <input id="username" type="text" v-model="name" placeholder="example"
                        :class="{ 'form-control': true, '!border-red-800': emptyUsername }"
                        @blur="() => usernameFocusOut = true">
                    <div v-if="emptyUsername" class="text-xs text-red-800">Please enter a username.</div>
                </div>

                <div class="mb-3 px-4">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" v-model="password" placeholder="password"
                        :class="{ 'form-control': true, '!border-red-800': emptyPassword }"
                        @blur="() => passwordFocusOut = true">
                    <div v-if="emptyPassword" class="text-xs text-red-800">Please enter a password.</div>
                </div>

                <div class="mb-3 px-4">
                    <label for="password" class="form-label">Re-type password</label>
                    <input id="password-retype" type="password" v-model="retypedPassword" placeholder="password"
                        :class="{ 'form-control': true, '!border-red-800': passwordsNotEqual }"
                        @blur="retypedPasswordFocusOut = true">
                    <div v-if="passwordsNotEqual" class="text-xs text-red-800">Re-typed password is not equal to password.
                    </div>
                </div>

                <div class="mb-3 px-4 d-flex justify-content-center">
                    <button type="button" @click="submitForm()"
                        :class="{ 'btn btn-primary': true, 'disabled': disabledRegisterButton }">Register</button>
                </div>
            </form>
        </div>
        <div v-if="hasResponseError" class="alert alert-danger mx-4" role="alert">
            The registration hasn't been successful. Make sure that you are connected to the internet.
            <br><br>
            If you still experience this problem with a network connection, <a href="/help">contact our support.</a>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { postRegister } from '@/composables/PostCalls';
import { useUserStore } from '@/store/user';
import { presentToast } from '@/helpers/toastController';

const store = useUserStore();
const { name, emailAddress, password } = storeToRefs(store);
const retypedPassword = ref("");

const emailFocusOut = ref(false);
const usernameFocusOut = ref(false);
const passwordFocusOut = ref(false);
const retypedPasswordFocusOut = ref(false);
const responseError = ref("");

const emptyEmail = computed(() => {
    return emailAddress.value.length === 0 && emailFocusOut.value;
})

const emptyUsername = computed(() => {
    return name.value.length === 0 && usernameFocusOut.value === true;
})

const emptyPassword = computed(() => {
    return password.value.length === 0 && passwordFocusOut.value === true;
})

const passwordsNotEqual = computed(() => {
    return password.value !== retypedPassword.value && retypedPasswordFocusOut.value;
})

const disabledRegisterButton = computed(() => {
    return emailAddress.value.length === 0 ||
        name.value.length === 0 ||
        password.value.length === 0 ||
        password.value !== retypedPassword.value
})

const hasResponseError = computed(() => {
    return responseError.value.length > 0;
})

function submitForm() {
    postRegister(name.value, emailAddress.value, password.value)
        .then((response) => {
            console.log(response.status)
            console.log(response)

            if (response.ok) {
                presentToast("Your registration has been successful. You can now log in with your new credentials.")
            }

            return response.json();
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            responseError.value = String(error);
        });
}
</script>
