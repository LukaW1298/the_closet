import { toastController } from '@ionic/vue';


export async function presentToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom', duration: number = 5000) {
    const toast = await toastController.create({
        message: message,
        duration: duration,
        position: position
    });

    await toast.present();
}