import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
// @ts-ignore: mapbox-gl does not provide TypeScript declarations for this CSS import.
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../../environments/environment.development';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
})
export class MiniMap implements AfterViewInit {
  divElemet = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if (!this.divElemet()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElemet()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/standard',
      zoom: this.zoom(),
      center: this.lngLat(),
      interactive: false,
      pitch: 30
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
