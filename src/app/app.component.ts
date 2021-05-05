import { Component , OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IBeaconRegion, IBeaconAdvertisement } from 'capacitor-ibeacon';
const { IBeacon } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  async ngOnInit() {
    await IBeacon.requestAlwaysAuthorization();
    IBeacon.addListener('enteredRegion', (response) => {
      const region = response.region;
      console.log(`Entered region: ${region.identifier} (${region.uuid})`);
    });
    IBeacon.addListener('leftRegion', (response) => {
      const region = response.region;
      console.log(`Left region: ${region.identifier} (${region.uuid})`);
    });
    IBeacon.startMonitoringForRegion({
      uuid: 'DEADBEEF-0000-0000-0000-000000000000',
      identifier: 'Dead Beef',
    });
  }


}
