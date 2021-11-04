import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private alertController: AlertController,
               private toastController: ToastController ) { }

  async alertaInformativa( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  };

  async presentAlertConfirmAceptar( message: string ) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  };

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }

}
