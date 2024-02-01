import { describe, expect, test } from 'vitest';
import { postOutfit } from '../../src/composables/PostCalls';
import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { useUserStore } from '../../src/store/user';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const userStore = useUserStore();
userStore.id = 25;


describe("Outfit", () => {
  test("Save outfit", async () => {
    const response = await postOutfit("2024-01-01", 1, 1, [{
      clothing: {
        id: 29
      }
    }, {
      clothing: {
        id: 30
      }
    }], [{
      occasion: {
        id: 1
      }
    }]);

    expect(response.status).toSatisfy((value) => {
      return String(value).startsWith("2"); 
    });
  });

});