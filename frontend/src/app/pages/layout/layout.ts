import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NgxSonnerToaster } from 'ngx-sonner';
import { HeaderComponent } from '../../core/components/header/header';
import { FooterComponent } from '../../core/components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, NgxSonnerToaster, LucideAngularModule],
  templateUrl: './layout.html',
})
export class LayoutComponent {}