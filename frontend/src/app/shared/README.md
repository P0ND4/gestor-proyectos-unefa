# Sistema de Menú Dinámico con MenuService

## Cómo usar el sistema MenuService

### 1. Definir visibilidad de ítems en el servicio

En el archivo `menu.service.ts`, configura los ítems del menú usando la interfaz `MenuItem`:

```typescript
private menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    icon: '...', // SVG path
    label: 'Dashboard',
    visibleRoutes: ['/', '/dashboard']
  },
  {
    id: 'admin',
    icon: '...', // SVG path
    label: 'Admin',
    visibleRoutes: ['/admin/*'], // Visible en todas las subrutas
    hiddenRoutes: ['/admin/settings'] // Oculto en ruta específica
  }
];
```

Propiedades clave:

* visibleRoutes: Rutas donde el ítem es visible (uso de * para todas las rutas)

* hiddenRoutes: Rutas donde el ítem está oculto (anula visibleRoutes)

### 2. Añadir ítems dinámicamente

Inyecta el servicio y usa `addMenuItem` para añadir nuevos elementos

```typescript
this.menuService.addMenuItem({
  id: 'reports',
  icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  label: 'Reportes',
  visibleRoutes: ['/reports']
});
```

### 3. Modificar ítems existentes

Actualiza propiedades de ítems existentes con `updateMenuItem`

```typescript
this.menuService.updateMenuItem('profile', {
  visibleRoutes: ['*'], // Visible en todas las rutas
  hiddenRoutes: ['/login', '/register', '/guest/*'] // Excepciones
});
```

**Consejos de uso:**

* Usa /* para hacer coincidir subrutas

* Los hiddenRoutes tienen prioridad sobre visibleRoutes

* Asigna routerLink para navegación automática

* Los id deben ser únicos para cada ítem
