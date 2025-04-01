import { Injectable, computed, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  visibleRoutes: string[]; // Rutas donde este ítem es visible
  hiddenRoutes?: string[]; // Rutas donde este ítem está oculto (opcional)
}

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  // Estados del menú
  private _isExpanded = signal(false);
  private _isToggled = signal(false);
  private _currentUrl = signal('');

  // Rutas donde el menú completo no se muestra
  private restrictedRoutes = ['/login'];//Se puede agregar más rutas aquí

  private menuItems: MenuItem[] = [
    {
      id: 'home',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      label: 'Inicio',
      visibleRoutes: ['/', '/dashboard'] // Solo visible en estas rutas
    },
    {
      id: 'profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      label: 'Perfil',
      visibleRoutes: ['*'], // Visible en todas las rutas excepto en hiddenRoutes
      hiddenRoutes: ['/login', '/register']
    },
    {
      id: 'settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      label: 'Configuración',
      visibleRoutes: ['/settings', '/profile'], // Solo visible en estas rutas
      hiddenRoutes: ['/login']
    }
  ];

  // Propiedades calculadas
  isExpanded = computed(() => this._isExpanded());
  isToggled = computed(() => this._isToggled());
  isRestrictedRoute = computed(() => this.restrictedRoutes.includes(this._currentUrl()));
  isSidebarVisible = computed(() => !this.isRestrictedRoute());

  // Estado para el efecto de fondo
  shouldDimBackground = computed(() => this.isRestrictedRoute() && this._isExpanded());

  // Ítems del menú visibles en la ruta actual
  visibleMenuItems = computed(() => {
    const currentUrl = this._currentUrl();
    return this.menuItems.filter((item: MenuItem) => {
      // Si tiene visibleRoutes = ['*'], mostrar en todas las rutas excepto hiddenRoutes
      if (item.visibleRoutes.includes('*')) {
        return !item.hiddenRoutes?.some((route: string) =>
          route === currentUrl || currentUrl.startsWith(route)
    );}

      // Mostrar si la ruta actual coincide con alguna de las rutas visibles
      return item.visibleRoutes.some((route: string) =>
        route === currentUrl || currentUrl.startsWith(route)
    );});
  });

  constructor(private router: Router) {
    this.setupRouterListener();
  }

  private setupRouterListener() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.url.split('?')[0];
        this._currentUrl.set(url);

        if (this.isRestrictedRoute()) {
          this.collapseMenu();
        }
      });
  }

  // Métodos para manejar el estado del menú
  toggleMenu() {
    this._isToggled.update(value => !value);

    if (this.isRestrictedRoute()) {
      this._isExpanded.set(this._isToggled());
    } else {
      this._isExpanded.update(value => !value);
    }
  }

  expandMenu() {
    if (!this.isRestrictedRoute() || this._isToggled()) {
      this._isExpanded.set(true);
    }
  }

  collapseMenu() {
    this._isExpanded.set(false);
    this._isToggled.set(false);
  }

  setRestrictedRoutes(routes: string[]) {
    this.restrictedRoutes = [...routes];
  }

  addMenuItem(item: MenuItem) {
    this.menuItems.push(item);
  }

  updateMenuItem(id: string, changes: Partial<MenuItem>) {
    const index = this.menuItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.menuItems[index] = { ...this.menuItems[index], ...changes };
    }
  }

  removeMenuItem(id: string) {
    this.menuItems = this.menuItems.filter(item => item.id !== id);
  }
}
