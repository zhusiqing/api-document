const objToString = (param: any) => Object.prototype.toString.call(param);

class Observer {
  private handle: Map<string, [Function?]>
  constructor() {
    this.handle = new Map()
  };
  // 注册监听的事件
  on(type = '', callback: Function) {
    // 校验参数
    if (typeof type !== 'string') {
      const msg = `on type must is string, now is ${objToString(type)}`;
      throw new Error(msg);
    };
    if (typeof callback !== 'function') {
      const msg = `callback must is function, now is ${objToString(callback)}`;
      throw new Error(msg);
    };
    // 添加监听的事件，同一个事件可以多个函数监听
    if (!this.handle.has(type)) {
      this.handle.set(type, []);
    };
    this.handle.get(type)?.push(callback);
  };
  // 触发
  emit (type = '', ...params: []) {
    if (typeof type !== 'string') {
      const msg = `emit type must is string, now is ${objToString(type)}`;
      throw new Error(msg);
    };
    if (!this.handle.get(type)?.length) {
      const msg = `${type} is not exist`;
      throw new Error(msg);
    };
    const forHandle = (el: Function | undefined) => {
      if (objToString(el) === '[object Function]') {
        el && el(...params);
      } else {
        throw new Error(`${type} is not function`);
      };
    }
    this.handle.get(type)?.forEach(forHandle.bind(this));
  }
  // 销毁监听的事件
  destory(type = '') {
    if (typeof type !== 'string') {
      const msg = `emit type must is string, now is ${objToString(type)}`;
      throw new Error(msg);
    };
    if (!this.handle.get(type)?.length) {
      throw new Error(`${type} is not register`);
    };
    this.handle.delete(type);
  }
  // 查询是否注册
  list(type = '') {
    if (!type) {
      throw new Error(`${type} is not exist`);
    };
    if (this.handle.has(type)) {
      return this.handle.get(type);
    };
    return null;
  };
};

export default new Observer();
