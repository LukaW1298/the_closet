import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
//import NavBar from '@/components/NavBar.vue'
import NavBar from '../../src/components/NavBar.vue'
import  PrimeVue from 'primevue/config';
import InputSwitch from 'primevue/inputswitch';
import { IonToolbar } from '@ionic/vue';

test("Navbar default slot", () => {
    const wrapper = mount(NavBar, {
        slots: {
            default: "Main Title"
        },
        global: {
            components: { InputSwitch, IonToolbar },
            plugins: [ PrimeVue ]
        }
    })

    expect(wrapper.find("[data-test-id=navbar-text]").text()).toEqual("Main Title")
})