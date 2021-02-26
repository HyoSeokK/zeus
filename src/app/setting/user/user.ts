export class User {
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    attributes : UserAttribute;
}

export class UserAttribute {
    departmentNm : string;
    position : string;
    phoneNumber : string;
}