export default class{
  /**
   * 移除对象中的指定键值
   * @param {Object} object
   * @param {string} key
   * @param {*} default
   */
  static pop(object, key, _default = null) {
    if (key in object) {
      let val = object[key];
      delete object[key];
      return val;
    }
    return _default;
  }

  /**
   * 对象比较差异
   * @param {*} value1
   * @param {*} value2
   */
  static diff(value1,value2){
    let diff = {};
    for(let key in value1){
      if(key in value2){
        if(value1[key] != value2[key]){
          diff[key] = value1[key];
        }
      }else{
        diff[key] = value1[key];
      }
    }

    for(let key in value2){
      if(key in value2){
        if(value2[key] != value1[key]){
          diff[key] = value2[key];
        }
      }else{
        diff[key] = value2[key];
      }
    }

    return diff;
  }
}
