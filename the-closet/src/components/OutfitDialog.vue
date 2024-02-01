<template>
  <Dialog v-model:visible="model" header="Outfit">
    <div class="grid grid-cols-1 gap-y-3 pb-5">
      <Calendar
        v-model="selectedDate" date-format="DD, dd/mm/yy"
        placeholder="Select date"
      />
      <Dropdown
        v-model="selectedWeather" :options="weathers"
        option-label="weather" option-value="id"
        placeholder="Select weather"
      />
      <Dropdown
        v-model="selectedOutfitType" :options="outfitTypes"
        option-label="outfitType" option-value="id"
        placeholder="Select type"
      />
      <MultiSelect
        v-model="selectedOccasions" :options="occasions"
        option-label="occasion" option-value="id"
        placeholder="Select occasion"
      />
    </div>
    <div class="flex justify-center">
      <Button
        label="Save" icon="pi pi-check"
        @click="saveOutfit"
      />
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';

// ------- PrimeVue ------- //
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';

// -------- Custom -------- //
import { useWeatherStore, useOccasionStore, useOutfitTypeStore } from '@/store/masterdata';
import { Clothing } from '@/custom_types';
import { postOutfit } from '@/composables/PostCalls';
import { presentToast } from '@/helpers/toastController';
import { useWardrobeModeStore } from '@/store/outfitStore';
import { toIsoDate } from '@/helpers/dateFunctions';
import { useOutfitListStore } from '@/store/outfit';
import router from '@/router';

// -------- Stores -------- //
const { weathers } = storeToRefs(useWeatherStore());
const { occasions } = storeToRefs(useOccasionStore());
const { outfitTypes } = storeToRefs(useOutfitTypeStore());
const wardrobeModeStore = useWardrobeModeStore();
const outfitListStore = useOutfitListStore();


const model = defineModel<boolean>();
const props = defineProps<{
  selectedClothes: Record<number | string, Clothing>
}>();


const selectedDate = ref<Date>(new Date());
const selectedWeather = ref();
const selectedOutfitType = ref();
const selectedOccasions = ref();

const selectedClothesList = computed(() => {
  const list = [];

  for (const id of Object.keys(props.selectedClothes)) {
    list.push({
      "clothing": {
        "id": id
      }
    });
  }

  return list;
});

const selectedOccasionsList = computed(() => {
  const list = [];

  for (const id of Object.values(selectedOccasions.value)) {
    list.push({
      "occasion": {
        "id": id
      }
    });
  }

  return list;
});



function saveOutfit() {
  postOutfit(toIsoDate(selectedDate.value),
    Number(selectedWeather.value),
    Number(selectedOutfitType.value), 
    selectedClothesList.value, 
    selectedOccasionsList.value
  ).then((response) => {
    if (response.ok) {
      presentToast("Outfit has been created.");
      wardrobeModeStore.mode = "view";
      model.value = false;
      outfitListStore.fetch();
      router.push("/tabs/outfits");
    }
    else {
      presentToast("Error when trying to save outfit.");
    }
  });
}

watch(selectedDate, async(newDate, oldDate) => {
  console.log(newDate);
});
</script>