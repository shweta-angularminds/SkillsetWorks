import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

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
