export default class {
  /**
   * 缓存数据
   * @param {string} key 缓存键值
   * @param {number} ttl 缓存时间(秒)
   * @param {function} callback 返回数据函数
   */
  static remember(key, ttl, callback) {
    let item = this.get(key);
    let timestamp = Date.parse(new Date()) / 1000;

    if (item != null && item.expire > timestamp) {
      return item.data
    }

    let data = callback();

    this.set(key, {
      expire: ttl + timestamp,
      data
    })
    return data
  }

  /**
   * 缓存promise请求数据
   * @param {string} key 缓存键值
   * @param {number} ttl 缓存时间(秒)
   * @param {function} callback 返回 Promise
   * 示例： 缓存上传token
    let data = Cache.rememberPromise(
      "upload_token",
      600,
      ()=>Axios.get("/api/upload/token")
    );
    data.then(res => {
      console.log(res);
    })
   */
  static rememberPromise(key, ttl, callback) {
    let item = this.get(key);
    let timestamp = Date.parse(new Date()) / 1000;

    if (item != null && item.expire > timestamp) {
      return new Promise((resolve) => {
        resolve(item.data)
      })
    }

    return new Promise((resolve,reject) => {
      callback().then(res => {
        this.set(key, {
          expire: ttl + timestamp,
          data:res
        })
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    });
  }

  /**
   * 设置缓存
   * @param {*} key 
   * @param {*} value 
   */
  static set(key, value) {
    console.log('set Cache:' + key);
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取缓存
   * @param {*} key 
   * @param {*} _default
   */
  static get(key, _default = null) {
    console.log('get Cache:' + key);
    let value = sessionStorage.getItem(key);
    if(value == null){
      return _default
    }
    return JSON.parse(value);
  }

  /**
   * 删除缓存中的数据
   * @param {*} key 
   */
  static forget(key){
    console.log('forget Cache:' + key);
    sessionStorage.removeItem(key);
  }

  /**
   * 清空所有的缓存
   */
  static clear(){
    console.log('clear Cache');
    sessionStorage.clear();
  }
}
