<template>
  <Panel class="mt-3 p-3 sm:w-9/12 lg:w-1/2 m-auto" :header="$t('message.login')">
    <div>
      <form @submit.prevent="login">
        <div class="mb-3 px-4 flex flex-col gap-x-3">
          <label for="username" class="dark:text-neutral-100 pb-2">
            {{ $t("message.username") }}
          </label>
          <InputText
            id="username" v-model="username"
            :placeholder="$t('message.username')"
          />
        </div>
        <div class="mb-3 px-4 pt-3 flex flex-col gap-x-3 w-full">
          <label for="password" class="dark:text-neutral-100 pb-2">
            {{ $t("message.password") }}
          </label>
          <Password
            id="password" v-model="password"
            input-class="w-full"
            :placeholder="$t('message.password')"
            :feedback="false"
          />
        </div>
        <div class="mb-3 px-4 pt-2 pb-6">
          <Checkbox       
            v-model="stayLoggedIn"  
            boolean 
            input-id="stay-logged-in"
            name="stay-logged-in"
            value="false"
          />
          <label for="stay-logged-in">
            Stay logged in
          </label>
        </div>
        <div class="mb-3 px-4">
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
import { User } from '@/custom_types';

// primary
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';
import Checkbox from 'primevue/checkbox';



const store = useUserStore();
const username = ref("");
const password = ref("");
const responseError = ref("");

const login = () => {
  postLogin(username.value, password.value)
    .then((response) => {
      console.log(response);

      if (response.ok) {
        getUser(username.value).then((result: Required<User>) => {
          console.log(result);

          store.login(result);
        });

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
    });
};

// stay logged in
const stayLoggedIn = ref<boolean>(false);
</script>
