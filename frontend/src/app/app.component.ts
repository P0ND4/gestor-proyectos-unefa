import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './shared/header/header.component';
import { MenuService } from './shared/menu.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {
    initFlowbite();
  }
}
