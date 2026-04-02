import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { user_add_education_url } from '../../../../../constants/url/urls';


import { Education } from '../../../../../constants/interfaces/user.interface';
import { EducationField } from '../../../../../constants/data/form-fields';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../../../partials/modal/modal.component";
@Component({
  standalone:true,
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  imports: [CommonModule, FormsModule, ModalComponent]
})
export class EducationComponent implements OnInit {
  @Input()
  education!: Education | null;
  @Input() id!: string;
  isModalVisible = false;
  selectedEducation: string = '';
  educationFields: any[] = [];
  educationData = EducationField;

  constructor(
    private http: HttpService,
    private notify: NotifyService,
    private localstorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.setEducationFields(this.selectedEducation);
  }

  setEducationFields(educationLevel: string): void {
    const selectedEducationLevel = this.educationData.find(
      (education) => education.title === educationLevel
    );
    if (selectedEducationLevel) {
      this.educationFields = selectedEducationLevel.fields;
    }
  }

  onEducationLevelChange(educationLevel: string): void {
    this.selectedEducation = educationLevel;
    this.setEducationFields(educationLevel);
  }

  async openModal() {
    if (this.education && this.education[this.selectedEducation]) {
      const selectedEducationData = this.education[this.selectedEducation];

      await this.populateEducationFields(selectedEducationData);
    } else {
      this.isModalVisible = true;
    }
  }

  async populateEducationFields(selectedEducationData: any) {
    for (const field of this.educationFields) {
      const fieldValue = (selectedEducationData as any)[field.name] || '';
      field.value = fieldValue;
    }

    this.isModalVisible = true;
  }

  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(labelValuePairs: any) {
    const educationData: { [key: string]: string } = {};

    labelValuePairs.forEach((item: { name: string; value: string }) => {
      educationData[item.name] = item.value;
    });

    const body = {
      educationField: this.selectedEducation,
      educationData: educationData,
    };
    this.http
      .post(user_add_education_url + this.id + '/education', body)
      .subscribe({
        next: (res: any) => {
          this.notify.notifyMessage('success', 'Education added succesfully!');
          window.location.reload();
        },
        error: (err: any) => {
          this.notify.notifyMessage('error', err.message);
        },
      });
  }
}
