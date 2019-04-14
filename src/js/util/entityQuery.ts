import IEntity from "../entity/interface/IEntity";

export class EntityQuery {
  static find(dataSet: IEntity[], query: (entry: IEntity) => boolean) {
    return undefined; //dataSet.find(query);
    //TODO - Fix find() function
  }

  static relocate(dataSet: IEntity[], src: number, dest: number) {
    try {
      let temp = dataSet.splice(src, 1);
      if (temp[0]) {
        dataSet.splice(dest, 0, temp[0]);
      } else {
        return false;
      }
      return true;
    } catch (e) {
      console.log("Error @ relocate: " + e);
      return false;
    }
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
    } catch (e) {
      console.log("Error @ relocate: " + e);
      return false;
    }
    return entries;
  }

  static sort(dataSet: IEntity[], condition: (entry: IEntity) => number) {
    let temp = dataSet.slice();
    return temp.sort(condition);
  }
}
