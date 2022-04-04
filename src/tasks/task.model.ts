export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdBy: string,
    public status: 1 | 2 | 3 | 4 | 5,
    public updatedBy: string
  ) {}
}
