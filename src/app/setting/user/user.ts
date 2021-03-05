export class User {
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    enabled : string;
    attributes : UserAttribute;
    credentials : Array<UserCredentials>;
}

export class UserAttribute {
    departmentNm : string;
    position : string;
    phoneNumber : string;
}

export class UserCredentials {
    
    constructor(
        public type:string,
        public value:string,
        public temporary:boolean){}
}