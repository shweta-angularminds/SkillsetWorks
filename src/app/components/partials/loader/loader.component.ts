import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  isLoading$ = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}
}
