import { Component, OnInit, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { Data, ActivatedRoute } from '@angular/router';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    },
  ]
})
export class DateInputComponent implements OnInit, ControlValueAccessor {

  @Input() public control: FormControl
  @Input() public hint: string
  @Input() public controlName: string
  public OccupiedDates: number[] = []

  public value: any
  public error: string
  public minDate: Date = new Date()

  onChange: (event) => void
  onTouched: () => void

  constructor(
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription()

    this.control.statusChanges.subscribe(
      (status) => {
        if (status === "INVALID") {
          this.handleDateErrorMessage()
        }
      }
    )
  }

  public writeValue(value: any): void {
    this.value = value ? value : ""
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn
    console.log(this.control.errors)

  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  private routeSubscription() {
    this.activeRoute.data.subscribe((data: Data) => {
      if (data.dates) {
        this.OccupiedDates = data.dates
      }
    })
  }

  public dateFilter(date: Date | null): boolean {

    // get date as day number in the year
    const day = this.dayOfYear(date)

    // disabled dates
    return !this.OccupiedDates.find(date => date === day)
  }

  private dayOfYear(date) {
    const x = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    const y = Date.UTC(date.getFullYear(), 0, 0)
    return (x - y) / 24 / 60 / 60 / 1000;
  }

  public dateClass = (date: Date): MatCalendarCellCssClasses => {
    const day = this.dayOfYear(date)
    // const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return this.OccupiedDates.find(date => date === day) ? 'custom-date-error' : '';
  }

  private handleDateErrorMessage() {
    if (this.control.hasError('required')) {
      this.error = "Date is required"
    }
    if (this.control.hasError('matDatepickerMin')) {
      this.error = "This date is invalid"

    }
    if (this.control.hasError('matDatepickerFilter')) {
      this.error = "This date is full, please pick another date"
    }
  }



}
