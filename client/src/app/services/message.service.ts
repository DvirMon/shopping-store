import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  // handle input error messages
  public getErrorMessage(control: FormControl, placeHolder: string): string {

    if (placeHolder === "Password" || placeHolder === "Confirmation Password") {
      return this.passwordCustomErrorMessage(control, placeHolder)
    }

    if (control.hasError('min')) {
      return 'Value in not valid ';
    }

    if (control.hasError('maxlength')) {
      return `${placeHolder} length must be less or equal to ${control.errors.maxlength.requiredLength} characters long`;
    }

    if (control.hasError('minlength')) {
      return `${placeHolder} length must be at least ${control.errors.minlength.requiredLength} characters long`;
    }
    if (control.hasError('pattern')) {
      return `invalid ${placeHolder} format`;
    }

  }

  public passwordCustomErrorMessage(control: FormControl, placeHolder: string): string {
    if (control.hasError('maxlength') || control.hasError('minlength')) {
      return `${placeHolder} length must be 8-24 characters long`;
    }

    if (control.hasError('pattern')) {
      return ` ${placeHolder} must contain at least one lowercase, uppercase and numeric character`;
    }

  }

  public generate() : string {

    const passwordLength = 12;
    const lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const getRandom = function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    var finalCharacters = "";

    finalCharacters = finalCharacters.concat(getRandom(upperCharacters));

    finalCharacters = finalCharacters.concat(getRandom(numbers));

    for (let i = 1; i < passwordLength - 3; i++) {
      finalCharacters = finalCharacters.concat(getRandom(lowerCharacters));
    }

    //shuffle!
    return finalCharacters.split('').sort(function () {
      return 0.5 - Math.random()
    }).join('');
  }

}
