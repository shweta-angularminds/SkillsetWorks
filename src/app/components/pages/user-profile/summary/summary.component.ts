import { Component, Input, OnInit } from '@angular/core';
import { NotifyService } from '../../../../services/notify.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../partials/modal/modal.component';
import { SUMMARY_FIELDS } from './constants/summary-form';
import { FormFieldValue, SummaryFormData } from './constants/summary.interface';
import { validateSummary } from './utils/summary.validator';
import { showError } from '../../../../utils/errorHandler';
import { SummaryService } from './service/summary.service';

@Component({
  standalone: true,
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  imports: [CommonModule, ModalComponent],
})
export class SummaryComponent implements OnInit {
  @Input()
  id!: string;
  @Input()
  summary: string = '';

  isModalVisible = false;

  readonly formFields = SUMMARY_FIELDS;
  readonly formTitle = 'Profile Summary';

  selectedFormData: Partial<SummaryFormData> = {};

  constructor(private summaryService:SummaryService,private notify: NotifyService) {}
  ngOnInit(): void {}

  openModal() {
    this.selectedFormData = {
      summary: this.summary,
    };

    this.isModalVisible = true;
  }

  onCloseModal() {
    this.resetModal();
  }

  handleFormDataChange(data: FormFieldValue[]): void {
    const summary = data[0]?.value?.trim();

    const error = validateSummary(summary);

    if (error) {
      this.notify.notifyMessage('error', error);
      return;
    }

    this.updateSummary(summary);
  }

  // PRIVATE METHODS

  private updateSummary(summary: string): void {
    this.summaryService.updateSummary(this.id, summary)
      .subscribe({
        next: () => {

          // update UI immediately
          this.summary = summary;

          this.notify.notifyMessage(
            'success',
            'Profile summary updated successfully'
          );

          this.resetModal();
        },

        error: (err:any) => showError(this.notify,err)
      });
  }

  
  private resetModal(): void {
    this.isModalVisible = false;
    this.selectedFormData = {};
  }
}
