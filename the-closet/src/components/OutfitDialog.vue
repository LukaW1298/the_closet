<template>
<Dialog v-model:visible="model">
test
</Dialog>
</template>
<script setup lang="ts">

import Dialog from 'primevue/dialog';

const model = defineModel<boolean>();

</script>