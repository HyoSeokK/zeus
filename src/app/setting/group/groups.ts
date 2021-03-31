export class Groups {
    selected : true;
    id : string;
    name : string;
    path : string;
    attributes : GroupsAttr;
}
export class GroupsAttr {
    token : Array<string> = []

    constructor(
        tokenVal : string
    ){
        this.token.push(tokenVal)
    }
}