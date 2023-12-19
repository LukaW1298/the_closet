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
                            <div class=" col-sm-4">
                                <label class="custom-file-label" for="customFile">Foto</label>
                            </div>
                            <div class=" col-sm-8">
                                <ImageInput />
                            </div>
                        </div>
                        <div class="mb-3 px-4 row">
                            <div class=" col-sm-4">
                                <label for="name">Bezeichnung</label>
                            </div>
                            <div class=" col-sm-8">
                                <input type="text" class="form-control" id="name"
                                placeholder="z.B. Bunter Blumenrock">
                            </div>
                        </div>
                        <div class="mb-3 px-4 row">
                            <div class="col-sm-4">
                                <label for="inputState">Kategorie</label>
                            </div>
                            <div class="col-sm-8">
                                <select id="parentCategory" name="parentCategory" class="col-sm-6 form-control" v-model="selectedParentCategoryId"
                                @change="changeChildCategories">
                                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                                
                            </select>
                        </div>
                    </div>
                    <div class="mb-3 px-4 row">
                        <div class="col-sm-4">
                            <label for="inputState">Unterkategorie</label>
                        </div>
                        <div class="col-sm-8">
                            <select id="childCategory" name="childCategory" class="col-sm-6 form-control" v-model="selectedChildCategoryId">
                                <option v-for="category in currentChildCategories" :value="category.id">{{ category.name
                                }}</option>
                                
                            </select>
                        </div>
                    </div>
                    
                    
                    <div class="mb-3 px-4 row">
                        <div class="col-sm-4">
                            <label for="brand">Marke</label>
                        </div>
                        <div class="col-sm-8">
                            <!-- <input type="text" class="form-control" id="brand" placeholder="z.B. Asos">
                            -->

                            <select id="brand" class="col-sm-6 form-control" :multiple="true">
                                <option :id="`brand-${brand.id}`" :name="`material-${brand.id}`" v-for="brand in brands" :value="brand.id">{{ brand.name }}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mb-3 px-4 row">
                        <div class=" col-sm-4">
                            <label for="size">Größe</label>
                        </div>
                        <div class=" col-sm-8">
                            <input type="text" class="form-control" id="size" placeholder="z.B. M">
                        </div>
                    </div>
                    
                    <div class="mb-3 px-4 row">
                        <div class=" col-sm-4">
                            <label for="price">Kaufpreis (€)</label>
                        </div>
                        <div class=" col-sm-8">
                            <input type="text" class="form-control" id="price" placeholder="z.B. 19,99">
                        </div>
                    </div>
                    
                    <div class="mb-3 px-4 row">
                        <div class=" col-sm-4">
                            <label for="material">Material</label>
                        </div>
                        <div class="col-sm-8">
                            <select id="material" class="col-sm-6 form-control" :multiple="true">
                                <option :id="`material-${material.id}`" :name="`material-${material.id}`" v-for="material in materials" :value="material.id">{{ material.material }}</option>
                            </select>
                        </div>
                    </div>
                    
                    
                    
                    <div class="mb-3 px-4 row">
                        <div class=" col-sm-4">
                            <label>Farbe</label>
                        </div>
                        <div class="col-sm-8">
                            <ColorPicker :colors="colors" v-model="selectedColorId" @update:model-value="console.log(selectedColorId)"/>
                        </div>
                    </div>
                    
                    
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Schließen</button>
                <button type="button" class="btn btn-primary">Speichern</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, onBeforeMount } from "vue";
import ImageInput from '@/components/ImageInput.vue';
import masterdata from '../../resources/test_data/masterdata.json'
import ColorPicker from '@/components/ColorPicker.vue';
import { Category, Material, Brand, WashingMode } from '@/custom_types';
import { getMaterials, getBrands, getWashingModes } from "@/composables/GetCalls";
//import { Modal } from 'bootstrap'
//import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

// initialize boostrap modal
//const modal = Modal.getOrCreateInstance(document.querySelector("#modalClothingItem"))
const modal = ref<any>(null);

const modalDisplay = ref("none");

const selectedParentCategoryId = ref<number>(1);
const selectedChildCategoryId = ref<number>(1);

const categories = ref<Category[]>(masterdata.categories);
const currentChildCategories = ref<Category[]>(masterdata.categories);

const materials = ref<Material[]>([]);
const brands = ref<Brand[]>([]);
const washingModes = ref<WashingMode[]>([]);
const colors = ref<any>(masterdata.colors);

const selectedColorId = ref<number>(1);


const openModal = () => {
    modalDisplay.value = "block";

    // if (modal.value != null)
    //     modal.value.show()
};

const closeModal = () => {
    modalDisplay.value = "none";

    // console.log("1")
    // if (modal.value != null)
    // {
    //     console.log("2")
    //     modal.value.hide()
    //     modal.value.dispose()
    // }
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
    modal.value = new Modal("#modalClothingItem", {backdrop: false})

});

onBeforeMount(() => {
    getMaterials().then((data) => {
        materials.value = data
        console.log(data)
    })

    getBrands().then((data) => {
        brands.value = data;
        console.log(data);
    })

    getWashingModes().then((data) => {
        washingModes.value = data;
        console.log(data);
    })
})


defineExpose({
    openModal,
    closeModal
});


</script>

<style scoped>

</style>
