import IEntity from "../entity/interface/IEntity";
import IAsset from "../entity/interface/IAsset";

export class EntityQuery {
  static find(dataSet: IEntity[], query: (entry: IEntity) => boolean) {
    return undefined; //dataSet.find(query);
    //TODO - Fix find() function
  }

  /**
   * Move an entity item in an array to a different position.
   * @param dataSet Array of entities to modify.
   * @param src The original position of the item.
   * @param dest The destination position of the item to relocate to.
   */
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

  /**
   * Get name of entity with duplicate numbering appended.
   * @param dataSet
   * @param name
   */
  static getDupeName(dataSet: IAsset[], name: string) {
    let dupe = false;
    let count = 0;
    let nameMod = name;

    do {
      dupe = false;
      for (let i = 0; i < dataSet.length; i++) {
        if (dataSet[i].getName() == nameMod) dupe = true;
      }

      if (dupe) {
        count++;
        nameMod = name + "(" + count + ")";
      }
    } while (dupe);

    return nameMod;
  }

  /**
   * Search through an entity array and returns a list that satisfy the condition.
   * @param dataSet Array of entities to search in.
   * @param query The query condition function that returns boolean.
   */
  static select(dataSet: IEntity[], query: (entry: IEntity) => boolean) {
    return dataSet.filter(query);
  }

  /**
   * Search through an entity array and delete items that satisfy the condition.
   * @param dataSet Array of entities to delete from.
   * @param query The query condition function that returns boolean.
   */
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
}
