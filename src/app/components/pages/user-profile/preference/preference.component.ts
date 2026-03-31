import { Component, Input } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_details } from '../../../../../constants/url/urls';
const formFields = [
  {
    label: 'Preferred Work Type',
    inputType: 'checkbox',
    name: 'job_type', // Unique name for form handling
    options: [
      { label: 'Internship', value: 'internship' },
      { label: 'Job', value: 'job' },
    ],
    value: [], // Array to store selected values
  },
  {
    label: 'Join Time',
    inputType: 'radio',
    name: 'join_time', // Unique name for form handling
    options: [
      { label: '15 Days', value: '15 days' },
      { label: '1 Month', value: '1 month' },
      { label: '2 Months', value: '2 months' },
      { label: '3 Months', value: '3 months' },
    ],
    value: [], // Array to store selected values
  },
  {
    label: 'locations',
    inputType: 'select',
    name: 'locations',
    options: [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'pune', label: 'Pune' },
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'hyderabad', label: 'Hyderabad' },
      { value: 'chennai', label: 'Chennai' },
      { value: 'chandigarh', label: 'Chandigarh' },
      { value: 'kolkata', label: 'Kolkata' },
      { value: 'gurgaon', label: 'Gurgaon' },
      { value: 'ahemdabad', label: 'Ahemdabad' },
    ],
    value: [],
  },
  // Other fields
];

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css',
})
export class PreferenceComponent {
  isModalVisible = false;
  formFields = formFields;

  formTitle = 'Add Preference';
  @Input()
  Id!: string;
  @Input()
  preferences: any;
  constructor(private http: HttpService, private notify: NotifyService) {}
  openModal() {
    this.formFields = formFields;
    this.isModalVisible = true;
  }
  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(labelValuePairs: any) {
  
    const transformedData: any = {};

    labelValuePairs.forEach((pair: { name: string; value: any }) => {
      // Check if the field is "locations" and the value is an array
      if (pair.name === 'locations' && Array.isArray(pair.value)) {
        transformedData[pair.name] = pair.value; // Store the array as it is
      } else {
        // For other fields like "job_type" or "join_time", just assign the value
        transformedData[pair.name] = pair.value;
      }
    });

    this.updatePreference(transformedData)
    // You can now use transformedData for further processing, such as emitting or saving
  }
  updatePreference(data:any){
    this.http.Patch(add_details+'/'+this.Id+'/preference',data).subscribe({
      next:(res:any)=>{
        this.notify.notifyMessage('success','Preference updated successfully');
        window.location.reload();
      },
      error:(err)=>{
        this.notify.notifyMessage('error',err.message);        
      }
    })
  }
}
