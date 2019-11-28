export class randomService {
  /**
   * 获取uid
   * @author 马哥哥哟
   * 原文链接 https://blog.csdn.net/mcj_2017/article/details/82115015
   */
  guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
