import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('sidebar') sidebarRef!: ElementRef;

  constructor(public menuService: MenuService) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (this.menuService.isExpanded() && !this.sidebarRef.nativeElement.contains(event.target)) {
      this.menuService.collapseMenu();
    }
  }
}
