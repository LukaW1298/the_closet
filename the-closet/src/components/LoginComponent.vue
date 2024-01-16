<template>
  <Panel class="mt-3 p-3" :header="$t('message.login')">
    <div>
      <form @submit.prevent="login">
        <div class="mb-3 px-4 flex flex-col gap-x-3">
          <label for="username" class="form-label dark:text-neutral-100">
            {{ $t("message.username") }}
          </label>
          <InputText
            id="username" v-model="username"
            :placeholder="$t('message.username')"
          />
        </div>
        <div class="mb-3 px-4 flex flex-col gap-x-3">
          <label for="password" class="form-label dark:text-neutral-100">
            {{ $t("message.password") }}
          </label>
          <Password
            id="password" v-model="password"
            :placeholder="$t('message.password')"
            :feedback="false"
          />
        </div>
        <div class="mb-3 px-4 d-flex justify-content-center">
          <Button :label="$t('message.logIn')" type="submit" />
        </div>
      </form>
    </div>
    <div
      v-if="responseError.length > 0" class="alert alert-danger mx-4"
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
import { ref } from 'vue';
import router from '@/router';
import { postLogin } from '@/composables/PostCalls';
import { getUser } from '@/composables/GetCalls';
import { useUserStore } from '@/store/user';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';

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
      responseError.value = String(error);
    })
}
</script>
