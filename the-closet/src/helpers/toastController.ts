import { toastController } from '@ionic/vue';

export async function presentToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom', duration = 3000) {
  const toast = await toastController.create({
    message: message,
    duration: duration,
    position: position,
    swipeGesture: 'vertical'
  });

  await toast.present();
}