import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  lat: number = 48.8566;
  lng: number = 2.3488;
  zoom: number = 12;
}
