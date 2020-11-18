export class UserModelConstants {
  nameMinLength = 3;
  nameMaxLength = 60;
  firstName = {
    lenError: `First name letters should be between ${this.nameMinLength} and ${this.nameMaxLength}`,
  };

  lastName = {
    lenError: `Last name letters should be between ${this.nameMinLength} and ${this.nameMaxLength}`,
  };

  emailMinLength = 5;
  emailMaxLength = 250;
  email = {
    lenError: `Email letters should be between ${this.emailMinLength} and ${this.emailMaxLength}`,
    isEmailError: `Email is not in valid structure`,
    uniqueError: `Email is already used`,
  };

  birthdate = {
    isDateError: `Birthdate is not valid date`,
  };
}
