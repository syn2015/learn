# object变化侦测

## object.defineProperty

```javascript
function defineReactive (data, key, val) {
  let childOb = observe(val);
  let dep = new Dep();
  Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        return val
      },
      set: function (newVal) {
        if(val === newVal){
          return
        }
        val = newVal;
        dep.notify();
      }
  });
}
//object.defineProperty将属性转换成getter和setter的形式来追踪变换，在getter中收集依赖，在setter中触发依赖
```

Dep类

```javascript
export default class Dep {
  constructor () {
    this.id = uid++;
    this.subs = [];
  }

  addSub (sub) {
    this.subs.push(sub);
  }

  removeSub (sub) {
    remove(this.subs, sub);
  }

  depend () {
    if (window.target) {
      window.target.addDep(this);
    }
  }

  removeSub (sub) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      return this.subs.splice(index, 1)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

```

