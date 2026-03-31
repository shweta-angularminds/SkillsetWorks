import { Component, Input, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  standalone: true,
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css',
  imports: [PdfViewerModule],
})
export class PdfViewerComponent implements OnInit {
  @Input()
  pdfFileUrl!: string;

  constructor() {}
  ngOnInit(): void {}
}
