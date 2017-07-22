/**
 * Created by Administrator on 2017/7/22 0022.
 */
function Observer(data) {
    this.data = data;
    this.makeObserver(data);
    this.events = new Event();
}

Observer.prototype.makeObserver = function (obj) {
    var val;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val == 'object') {
                new Observer(val);
            }
        }

        this.convert(val, key);
    }
};

Observer.prototype.convert = function (val, key) {
    var _this = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('you visit:', key);
            return val;
        },
        set: function (newvalue) {
            console.log('you set new key:', key);
            console.log('the new value is:', newvalue);
            _this.events.emit(key, val, newvalue);
            val = newvalue;
            if (typeof val == 'object') {
                new Observer(val); //如果设置的新值是一个对象的话
            }
        }
    })
};

Observer.prototype.$watch = function (attr, callback) {
     this.events.on(attr, callback)
};

//实现一个事件模型：
function Event() {
    this.events = {}
}

Event.prototype.on = function (attr, callback) {
    if (this.events[attr]) {
        this.events[attr].push(callback)
    }
    else {
        this.events[attr] = [callback];  //如果没有attr属性，给其赋值为一个数组[callback]
    }
};

Event.prototype.emit = function (attr, ...args) {
    if (this.events[attr]) {
        this.events[attr].forEach(callback=>{  //执行任务队列里面的各个callback
            callback(...args)
        })
    }
};

Event.prototype.off = function (attr) {
    for (var key in this.events) {
        if (key == attr && this.events.hasOwnProperty(key)) {
            delete this.events[key]
        }
    }
};

//测试
let app = new Observer({
    name: 'zhangyaxiong',
    age: 26
});

app.$watch('age', function(oldVal, newVal) {
    console.log(`我的年纪变了，原来是：${oldVal}, 现在已经是：${newVal}岁了`);
});

app.$watch('age', function(oldVal, newVal) {
    console.log(`我的年纪变了，真的变成${newVal}岁了诶`);
});

app.data.age = 100;