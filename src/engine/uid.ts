export class UniqueIdGenerator{
    index = 0;
    create(prefix : string = "uid"){
        let newId = `${prefix}-${this.index}`;
        this.index++;
        return newId;
    }
}