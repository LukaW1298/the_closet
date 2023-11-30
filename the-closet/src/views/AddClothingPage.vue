<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kleidungsstück hinzufügen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hinzufügen</ion-title>
        </ion-toolbar>
      </ion-header>
      
      
      
      <form>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile">
          <label class="custom-file-label" for="customFile">Foto</label>
        </div>
        <div class="mb-3 px-4 row">
          <div class=" col-sm-3">
            <label for="formGroupExampleInput">Bezeichnung</label>
          </div>
          <div class=" col-sm-9">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="z.B. Bunter Blumenrock">
          </div>
        </div>
        <div class="mb-3 px-4 row">
          <div class="col-sm-3">
            <label for="inputState">Kategorie</label>
          </div>
          <div class="col-md-9">
            <select id="inputState" class="col-sm-6 form-control">
              <option selected>Oberteile</option>
              <option>Unterteile</option>
              <option>Schuhe</option>
              <option>Accessoires</option>
              <option>Jacken</option>
              <option>Sonstiges</option>
            </select>
          </div>
        </div>
        <div class="mb-3 px-4 row">
          <div class="col-sm-3">
            <label for="inputState">Unterkategorie</label>
          </div>
          <div class="col-md-9">
            <select id="inputState" class="col-sm-6 form-control">
              <option selected>Oberteile</option>
              <option>Unterteile</option>
              <option>Schuhe</option>
              <option>Accessoires</option>
              <option>Jacken</option>
              <option>Sonstiges</option>
            </select>
          </div>
        </div>
        <div class="mb-3 px-4 row">
          <div class="col-sm-3">
            <label for="inputState">Detailkategorie</label>
          </div>
          <div class="col-md-9">
            <select id="inputState" class="col-sm-6 form-control">
              <option selected>Oberteile</option>
              <option>Unterteile</option>
              <option>Schuhe</option>
              <option>Accessoires</option>
              <option>Jacken</option>
              <option>Sonstiges</option>
            </select>
          </div>
        </div>

        <div class="mb-3 px-4 row">
          <div class="col-sm-3">
            <label for="inputState">Marke</label>
          </div>
          <div class="col-md-9">
            <select id="inputState" class="col-sm-6 form-control">
              <option selected>Amisu</option>
              <option>H&M</option>
              <option>Arket</option>
              <option>Zara</option>
              <option>Bershka</option>
            </select>
          </div>
        </div>

        <div class="mb-3 px-4 row">
          <div class=" col-sm-3">
            <label for="formGroupExampleInput">Größe</label>
          </div>
          <div class=" col-sm-9">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="z.B. M">
          </div>
        </div>

        <div class="mb-3 px-4 row">
          <div class=" col-sm-3">
            <label for="formGroupExampleInput">Kaufpreis (€)</label>
          </div>
          <div class=" col-sm-9">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="z.B. 19,99">
          </div>
        </div>

        <div class="mb-3 px-4 row">
          <div class=" col-sm-3">
            <label for="formGroupExampleInput">Material</label>
          </div>
          <div class="col-sm-9">
            <select id="material" class="col-sm-6 form-control" multiple="true">
              <option selected>Baumwolle</option>
              <option>Elasthan</option>
              <option>Polyester</option>
              <option>Merinowolle</option>
              <option>Schurwolle</option>
            </select>
          </div>
        </div>



        <div class="mb-3 px-4 row">
          <!-- <v-swatches v-model="color"></v-swatches> -->
        </div>
        
        
      </form>
      
      
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import VSwatches from 'vue-swatches'
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: "AddClothingPage",
  components: { VSwatches, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
  setup() {
    const color = ref("#ffffff")



return {
  color: "#fff000"
}
  }
}

)





</script>
