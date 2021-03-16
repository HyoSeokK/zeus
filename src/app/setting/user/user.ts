export class User {
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    enabled : string;
    createdTimestamp : number;
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

export class AdminInfo {
    adminId : string;
    adminPw : string;
    clientId : string;
    clientSecret : string;
    tokenUrl : string;

}