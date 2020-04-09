export default class {
  /**
   * 生成随机字符串
   * @param {number} length
   */
  static string(length = 32, type = 'alpha') {
    let types = {
      alpha: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz',
      alpha_num: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890',
      alpha_dash: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890-_'
    };
    let chars = types[type];
    let maxPos = chars.length;
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }
}
