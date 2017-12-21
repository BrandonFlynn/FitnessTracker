import { Component,  ViewEncapsulation } from '@angular/core';
import {WebService} from "../services/web.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent  { constructor(public webService: WebService) { } }
