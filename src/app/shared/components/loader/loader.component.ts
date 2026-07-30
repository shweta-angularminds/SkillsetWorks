import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  isLoading$ = this.loaderService.loading$;
  options: AnimationOptions = {
    path: 'assets/images/SandyLoading.json', // your lottie file
  };
  constructor(private loaderService: LoaderService) {}
}
