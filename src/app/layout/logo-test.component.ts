import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-test',
  imports: [],
  template: `
    <div class="p-6 space-y-8">
      <h1 class="text-2xl font-bold mb-4">SVG Logo Test</h1>
      
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold mb-2">Expanded Logo (200x48)</h2>
          <div class="border border-gray-300 p-4 rounded-lg">
            <img src="/logo-expanded.svg" alt="Expanded Logo" class="w-full max-w-xs" />
            <p class="text-sm text-gray-600 mt-2">Used when sidebar is expanded (width: 200px)</p>
          </div>
        </div>
        
        <div>
          <h2 class="text-lg font-semibold mb-2">Collapsed Logo (48x48)</h2>
          <div class="border border-gray-300 p-4 rounded-lg">
            <img src="/logo-collapsed.svg" alt="Collapsed Logo" class="h-16 w-auto" />
            <p class="text-sm text-gray-600 mt-2">Used when sidebar is collapsed and in header</p>
          </div>
        </div>
        
        <div>
          <h2 class="text-lg font-semibold mb-2">Original Logo (120x40)</h2>
          <div class="border border-gray-300 p-4 rounded-lg">
            <img src="/logo.svg" alt="Original Logo" class="h-10 w-auto" />
            <p class="text-sm text-gray-600 mt-2">Kept for backward compatibility</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LogoTestComponent {}