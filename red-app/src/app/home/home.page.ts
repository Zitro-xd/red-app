import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/angular';
import { Network, ConnectionStatus } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  status = signal<ConnectionStatus | null>(null);
  private listener?: PluginListenerHandle;

  tipos: Record<string, string> = {
    wifi: 'Wi-Fi',
    cellular: 'Celular',
    none: 'Sin conexión',
    unknown: 'Desconocido',
  };

  async ngOnInit() {
    this.status.set(await Network.getStatus());

    this.listener = await Network.addListener('networkStatusChange', (s) => {
      this.status.set(s);
    });
  }

  ngOnDestroy() {
    this.listener?.remove();
  }
}