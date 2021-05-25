export class Ingredient {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public delayTime: number,
    public isCreated: boolean = false
  ) {}
}
