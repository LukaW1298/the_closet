<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Registrieren</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Hinzufügen</ion-title>
          </ion-toolbar>
        </ion-header>
        
        
        
        <form>
         
          <div class="mb-3 px-4 row">
            <div class=" col-sm-3">
              <label for="formGroupExampleInput">Benutzername</label>
            </div>
            <div class=" col-sm-9">
              <input type="text" class="form-control" id="formGroupExampleInput" placeholder="z.B. anna123">
            </div>
          </div>
          <div class="mb-3 px-4 row">
            <div class=" col-sm-3">
              <label for="formGroupExampleInput">Passwort</label>
            </div>
            <div class=" col-sm-9">
              <input type="password" class="form-control" id="formGroupExampleInput" placeholder="Sicheres Passwort">
            </div>
          </div>
         
          
          
        </form>
        
        
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  </script>
  