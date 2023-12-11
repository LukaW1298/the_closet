<!-- ModalDialog.vue -->
<template>
    <div class="modal fade show in" id="modalClothingItem" :style="{ 'display': modalDisplay }">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Hinzufügen</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="custom-file mb-3 px-4 row">
                            <div class=" col-sm-3">
                                <label class="custom-file-label" for="customFile">Foto</label>
                            </div>
                            <div class=" col-sm-9">
                                <ImageInput />
                            </div>
                        </div>
                        <div class="mb-3 px-4 row">
                            <div class=" col-sm-3">
                                <label for="formGroupExampleInput">Bezeichnung</label>
                            </div>
                            <div class=" col-sm-9">
                                <input type="text" class="form-control" id="formGroupExampleInput"
                                    placeholder="z.B. Bunter Blumenrock">
                            </div>
                        </div>
                        <div class="mb-3 px-4 row">
                            <div class="col-sm-3">
                                <label for="inputState">Kategorie</label>
                            </div>
                            <div class="col-md-9">
                                <select id="parentCategory" name="parentCategory" class="col-sm-6 form-control" v-model="selectedParentCategoryId"
                                    @change="changeChildCategories">
                                    <option v-for="category in categories" :value="category.id">{{ category.name }}</option>

                                </select>
                            </div>
                        </div>
                        <div class="mb-3 px-4 row">
                            <div class="col-sm-3">
                                <label for="inputState">Unterkategorie</label>
                            </div>
                            <div class="col-md-9">
                                <select id="childCategory" name="childCategory" class="col-sm-6 form-control" v-model="selectedChildCategoryId">
                                    <option v-for="category in currentChildCategories" :value="category.id">{{ category.name
                                    }}</option>

                                </select>
                            </div>
                        </div>


                        <div class="mb-3 px-4 row">
                            <div class="col-sm-3">
                                <label for="inputState">Marke</label>
                            </div>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="z.B. Asos">
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
                                <select id="material" class="col-sm-6 form-control" :multiple="true">
                                    <option id="materialId" name="materialId" v-for="material in materials" :value="material.id">{{ material.name }}</option>
                                </select>
                            </div>
                        </div>



                        <div class="mb-3 px-4 row">
                            <ColorPicker :colors="colors" v-model="selectedColorId" @update:model-value="console.log(selectedColorId)"/>
                        </div>


                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Schließen</button>
                    <button type="button" class="btn btn-primary">Speichern</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import { ref, reactive, onMounted } from "vue";
import ImageInput from '@/components/ImageInput.vue';
import masterdata from '../../resources/test_data/masterdata.json'
import ColorPicker from '@/components/ColorPicker.vue';
import { Category, Material } from '@/custom_types';
//import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

const modalDisplay = ref("none");

const selectedParentCategoryId = ref<number>(1);
const selectedChildCategoryId = ref<number>(1);

const categories = ref<Category[]>(masterdata.categories);
const currentChildCategories = ref<Category[]>(masterdata.categories);

const materials = ref<Material[]>(masterdata.materials);
const colors = ref<any>(masterdata.colors);

const selectedColorId = ref<number>(1);


const openModal = () => {
    modalDisplay.value = "block";
};

const closeModal = () => {
    modalDisplay.value = "none";
};

function changeChildCategories() {
    let childCategoryArray: any = [];

    if (categories.value instanceof Array && typeof categories.value.filter == "function")
        childCategoryArray = categories.value.filter((el) => el.id === selectedParentCategoryId.value)[0].child_categories;

    if (typeof childCategoryArray != "undefined")
        currentChildCategories.value = childCategoryArray;
}

onMounted(() => {
    changeChildCategories();
});

defineExpose({
    openModal,
    closeModal
});


</script>
  
<style scoped>

</style>
  