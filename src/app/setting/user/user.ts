export class User {
    id : string;
    checked : true;
    username : string;
    firstName : string;
    lastName : string;
    email : string;
    enabled : string;
    createdTimestamp : number;
    attributes : UserAttribute;
    credentials : Array<UserCredentials>;
    groups : Array<string>;
}

export class UserAttribute {
    departmentNm : string[] = [];
    position : string[] = [];
    phoneNumber : string[] = [];
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