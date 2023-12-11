<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kleiderschrank</ion-title>        

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Kleiderschrank</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div class="container-fluid pt-2 pb-3 d-flex justify-content-end">
        <button class="btn btn-primary btn-lg">Auswahlmodus aktivieren</button>
      </div>

      <div class="container-md">
        <div class="row align-items-center gy-5">

          
          <div class="col-sm-6 col-md-3" v-for="n in 19">
            <div class="card" :id="`card-${n}`">
              <!-- <div style="height: 10px;"> -->
              <input class="form-check-input check-input-clothing" type="checkbox" :id="`checkbox-${n-1}`" @click="event => addBorder(event, n)">
            <!-- </div> -->
              <img :src="`../../resources/test_items/clothing${n-1}.png`" class="card-img-top clothing-card-img" >
              <div class="card-body">
                <h5 class="card-title">T-Shirt</h5>
                <p class="card-text">Amisu | 38</p>
                <div class="d-flex justify-content-between">
                  

                  <font-awesome-icon icon="fa-solid fa-pen" transform="shrink-8" mask="fa-solid fa-circle" class="fa-lg"
                  :style="{ color: 'var(--bs-secondary)' }"/>
                  
                  
                    <font-awesome-layers class="fa-lg">

                      <font-awesome-icon icon="fa-solid fa-shirt" :style="{ color: 'var(--bs-primary)' }" transform="right-10"/>
                      <font-awesome-icon icon="fa-solid fa-circle-plus" transform="shrink-4 down-4" :style="{ color: 'var(--bs-primary-text-emphasis)' }" position="bottom-right" />

                    </font-awesome-layers>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';



  export default defineComponent({
    name: "WardrobeOverviewPage",
    components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, FontAwesomeIcon, FontAwesomeLayers},
    setup() {

      function addBorder(event: Event, id: number) {
        const card = document.getElementById(`card-${id}`)

        if (event?.target?.checked)
        {
          card?.classList.add("border-primary-subtle")
        }
        else
        {
          card?.classList.remove("border-primary-subtle")
        }
      }

      return {
        addBorder
      }

    }
  })
</script>

<style scoped>
.clothing-card-img {
  height: 150px;
  width: auto;
  object-fit: contain;
}

.check-input-clothing {
  position: absolute;
  height: 20px;
  width: 20px;
  right: 5px;
}

.border-primary-subtle {
  border: 5px solid var(--bs-primary-border-subtle);
}
</style>