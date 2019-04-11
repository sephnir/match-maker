import IEntity from "../entity/interface/IEntity";

export class EntityQuery {
  static find(dataSet: IEntity[], query: (entry: IEntity) => boolean) {
    return undefined; //dataSet.find(query);
    //TODO - Fix find() function
  }

  static select(dataSet: IEntity[], query: (entry: IEntity) => boolean) {
    return dataSet.filter(query);
  }

  static delete(dataSet: IEntity[], query: (entry: IEntity) => boolean) {
    let entries = 0;
    try {
      let temp = this.select(dataSet, query);
      temp.forEach(item => {
        let ind = dataSet.indexOf(item);

        if (ind != -1) {
          dataSet.splice(ind, 1);
          entries++;
        }
      });
    } catch {
      return false;
    }
    return entries;
  }

  static sort(dataSet: IEntity[], condition: (entry: IEntity) => number) {
    let temp = dataSet.slice();
    return temp.sort(condition);
  }
}
