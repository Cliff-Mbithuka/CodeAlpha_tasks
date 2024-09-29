import { Component, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  selector: "age-profile",
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css'],
  encapsulation: ViewEncapsulation.None
})
export default class ageComponent implements AfterViewInit {

  // Access form and inputs via ViewChild
  @ViewChild('form') form!: ElementRef<HTMLFormElement>;
  @ViewChild('dayInput') dayInput!: ElementRef<HTMLInputElement>;
  @ViewChild('monthInput') monthInput!: ElementRef<HTMLInputElement>;
  @ViewChild('yearInput') yearInput!: ElementRef<HTMLInputElement>;

  // Error message selectors
  @ViewChild('errorDay') errorDay!: ElementRef<HTMLSpanElement>;
  @ViewChild('errorMonth') errorMonth!: ElementRef<HTMLSpanElement>;
  @ViewChild('errorYear') errorYear!: ElementRef<HTMLSpanElement>;

  // Result selectors
  @ViewChild('resultYear') resultYear!: ElementRef<HTMLSpanElement>;
  @ViewChild('resultMonth') resultMonth!: ElementRef<HTMLSpanElement>;
  @ViewChild('resultDay') resultDay!: ElementRef<HTMLSpanElement>;

  ngAfterViewInit() {
    // Event listener for form submission
    this.form.nativeElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.validateForm();
    });
  }

  validateForm() {
    const day = parseInt(this.dayInput.nativeElement.value || '0', 10);
    const month = parseInt(this.monthInput.nativeElement.value || '0', 10);
    const year = parseInt(this.yearInput.nativeElement.value || '0', 10);
    const currentDate = new Date();
    let error = false;

    // Validate the day
    if (day < 1 || day > new Date(year, month, 0).getDate() || isNaN(day)) {
      error = true;
      this.errorDay.nativeElement.textContent = "Must be a valid day";
    } else {
      this.errorDay.nativeElement.textContent = "";
    }

    // Validate the month
    if (month < 1 || month > 12 || isNaN(month)) {
      error = true;
      this.errorMonth.nativeElement.textContent = "Must be a valid month";
    } else {
      this.errorMonth.nativeElement.textContent = "";
    }

    // Validate the year
    if (year < 1900 || year > currentDate.getFullYear() || isNaN(year)) {
      error = true;
      this.errorYear.nativeElement.textContent = "Must be a valid year";
    } else {
      this.errorYear.nativeElement.textContent = "";
    }

    // If there are errors, reset the results
    if (error) {
      this.resultYear.nativeElement.textContent = "--";
      this.resultMonth.nativeElement.textContent = "--";
      this.resultDay.nativeElement.textContent = "--";
    } else {
      // Calculate the age
      const birthDate = new Date(year, month - 1, day);
      let days = currentDate.getDate() - birthDate.getDate();
      let months = currentDate.getMonth() - birthDate.getMonth();
      let years = currentDate.getFullYear() - birthDate.getFullYear();

      if (days < 0) {
        days += 30;
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      this.resultYear.nativeElement.textContent = years.toString();
      this.resultMonth.nativeElement.textContent = months.toString();
      this.resultDay.nativeElement.textContent = days.toString();
    }
  }
}
