<template>
  <Panel class="mt-3 p-3" :header="$t('message.registration')">
    <div>
      <form>
        <div class="flex flex-col mb-3 px-4">
          <label for="email" class="form-label dark:text-neutral-100">
            {{ $t("message.emailAddress") }}
          </label>
          <InputText
            id="email" v-model="emailAddress"
            placeholder="mail@example.com"
            :class="{ '!border-red-800 dark:!border-red-300': emptyEmail }" @blur="emailFocusOut = true"
          />
          <div v-if="emptyEmail" class="text-xs text-red-800 dark:text-red-300">
            {{ $t("message.enterEmail") }}
          </div>
        </div>

        <div class="flex flex-col mb-3 px-4">
          <label for="username" class="form-label dark:text-neutral-100">
            {{ $t("message.username") }}
          </label>
          <InputText
            id="username" v-model="name"
            placeholder="example"
            :class="{ '!border-red-800 dark:!border-red-300': emptyUsername }" @blur="() => usernameFocusOut = true"
          />
          <div v-if="emptyUsername" class="text-xs text-red-800 dark:text-red-300">
            {{ $t("message.enterUsername") }}
          </div>
        </div>

        <div class="flex flex-col mb-3 px-4">
          <label for="password" class="form-label dark:text-neutral-100">
            {{ $t("message.password") }}
          </label>
          <Password
            id="password" v-model="password"
            input-class="w-full"
            :class="{ '!border-red-800 dark:!border-red-300': emptyPassword }"
            @blur="() => passwordFocusOut = true"
          />
          <div v-if="emptyPassword" class="text-xs text-red-800 dark:text-red-300">
            {{ $t("message.enterPwd") }}
          </div>
        </div>

        <div class="flex flex-col mb-3 px-4">
          <label for="password" class="form-label dark:text-neutral-100">
            {{ $t("message.retypePwd") }}
          </label>
          <Password
            id="password-retype" v-model="retypedPassword"
            input-class="w-full"
            :class="{ '!border-red-800 dark:!border-red-300': passwordsNotEqual }" :feedback="false"
            @blur="retypedPasswordFocusOut = true"
          />
          <div v-if="passwordsNotEqual" class="text-xs text-red-800 dark:text-red-300">
            {{ $t("message.retypePwdError") }}
          </div>
        </div>

        <div class="mb-3 px-4 d-flex justify-content-center">
          <Button
            type="button" class="btn btn-primary"
            :class="{ 'disabled': disabledRegisterButton }"
            :label="$t('message.register')" @click="submitForm"
          />
        </div>
      </form>
    </div>
    <div
      v-if="hasResponseError" class="alert alert-danger mx-4"
      role="alert"
    >
      <InlineMessage severity="error">
        {{ responseError }}
      </InlineMessage>
    </div>
    <slot />
  </Panel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { postRegister } from '@/composables/PostCalls';
import { useUserStore } from '@/store/user';
import { presentToast } from '@/helpers/toastController';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';


const store = useUserStore();
const { name, emailAddress } = storeToRefs(store);
const password = ref("");
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
      if (result.error)
        responseError.value = result.error;
      if (result.message && result.status !== "200")
        responseError.value = result.message;
    }).catch((error) => {
      responseError.value = String(error);
    });
}
</script>
