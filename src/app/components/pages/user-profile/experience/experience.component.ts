import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../partials/modal/modal.component';
import { ExperienceD } from '../../../../../constants/data/form-fields';
import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_experience_url } from '../../../../../constants/url/urls';

@Component({
  standalone: true,
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  imports: [CommonModule, FormsModule, ModalComponent],
})
export class ExperienceComponent {
  @Input() Id!: string;
  @Input() experiences: any[] = [];

  isModalVisible = false;
  formFields = ExperienceD[0];
  formTitle = 'Add Experience';

  selectedExperience: any = {};
  editingExpId: string | null = null;

  constructor(
    private http: HttpService,
    private notify: NotifyService,
  ) {}

  openModal(exp?: any) {
    if (exp) {
      this.formTitle = 'Edit Experience';
      this.editingExpId = exp._id;

      // ✅ prepare data for modal
      this.selectedExperience = {
        ...exp,
        technologiesUsed: exp.technologiesUsed?.join(', ') || '',
        achievements: exp.achievements?.join(', ') || '',
        isCurrentJob: exp.isCurrentJob ? ['current'] : [],
        employmentType: [exp.employmentType], // because your modal uses array
      };
    } else {
      this.formTitle = 'Add Experience';
      this.editingExpId = null;
      this.selectedExperience = {};
    }

    this.isModalVisible = true;
  }

  onCloseModal() {
    this.isModalVisible = false;
  }
  get experienceList() {
    return this.experiences ?? [];
  }

  handleFormDataChange(data: any[]) {
    const formData: any = {};

    data.forEach((field) => {
      formData[field.name] = field.value;
    });

    formData.isCurrentJob = formData.isCurrentJob?.length > 0;

    formData.employmentType = Array.isArray(formData.employmentType)
      ? formData.employmentType[0] || ''
      : formData.employmentType;

    formData.technologiesUsed = formData.technologiesUsed
      ? formData.technologiesUsed.split(',').map((t: string) => t.trim())
      : [];

    formData.achievements = formData.achievements
      ? formData.achievements.split(',').map((a: string) => a.trim())
      : [];

    if (formData.isCurrentJob) {
      formData.endDate = null;
    }

    

    // REQUIRED FIELD VALIDATION
    if (!formData.companyName?.trim()) {
      this.notify.notifyMessage('error', 'Company Name is required.');
        this.isModalVisible = true;
      return;
    }

    if (!formData.jobTitle?.trim()) {
      this.notify.notifyMessage('error', 'Job Title is required.');
      return;
    }

    if (!formData.employmentType) {
      this.notify.notifyMessage('error', 'Employment Type is required.');
      return;
    }

    if (!formData.startDate) {
      this.notify.notifyMessage('error', 'Start Date is required.');
      return;
    }

    // End Date required if not current job
    if (!formData.isCurrentJob && !formData.endDate) {
      this.notify.notifyMessage('error', 'End Date is required.');
      return;
    }
    // Date validation
    if (
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      this.notify.notifyMessage(
        'error',
        'Start Date cannot be later than End Date.',
      );
      return;
    }
    // ✅ ADD vs UPDATE
    if (this.editingExpId) {
      this.updateExperience(formData);
    } else {
      this.addExperience(formData);
    }
  }
  addExperience(body: any) {
    this.http.securePost(add_experience_url, body, 'userToken').subscribe({
      next: () => {
        this.notify.notifyMessage('success', 'Experience Added!');
        window.location.reload();
      },
      error: (err: any) => {
     
        this.notify.notifyMessage(
          'error',
          err?.error?.message || 'Unable to add experience. Please try again.',
        );
      },
    });
  }

  deleteExperience(expId: string) {
    this.http.delete(`${add_experience_url}/${expId}`, 'userToken').subscribe({
      next: () => {
        this.notify.notifyMessage('success', 'Deleted Experience Successfully!');

        window.location.reload();
      },
      error: (err: any) => {
        this.notify.notifyMessage(
          'error',
          err?.error?.message || 'Unable to delete experience. Please try again.',
        );
      },
    });
  }
  updateExperience(body: any) {
    this.http
      .securePut(
        `${add_experience_url}/${this.editingExpId}`,
        body,
        'userToken',
      )
      .subscribe({
        next: () => {
          this.notify.notifyMessage('success', 'Experience Updated!');
          window.location.reload();
        },
        error: (err: any) => {
          this.notify.notifyMessage(
            'error',
            err?.error?.message ||
              'Unable to update experience. Please try again.',
          );
        },
      });
  }
}
