export class RandomService {
  /**
   * 获取uid
   * @author 马哥哥哟
   * 原文链接 https://blog.csdn.net/mcj_2017/article/details/82115015
   */
  guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0;
      let v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 产生指定长度的随机字符串0-9a-zA-Z
   */
  randomString(length: number): string {
    if (length <= 0) return '';
    const str =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let retStr = '';
    for (let i = 0; i < length; i++) {
      const randomChar = str[Math.floor(Math.random() * 62)];
      retStr = retStr + randomChar;
    }
    return retStr;
  }
}
