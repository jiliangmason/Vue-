/**
 * Created by Administrator on 2017/7/21 0021.
 */
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype.walk = function (obj) {
    var val;
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (Object.prototype.toString.call(val) == '[object Object]') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

Observer.prototype.convert = function (key, val) {
    Object.defineProperty(this.data, key, {
        enummerable: true,
        configurable: true,
        get: function () {
            console.log('visit attribute', key);
            return val;
        },
        set: function (newValue) {
            console.log('set attribute', key);
            console.log('the new value is:', newValue);
            if (val === newValue) return;
            val = newValue;
        }
    });
};

var app1 = new Observer({
    name: 'zhangyaxiong',
    age: 25
});

var app2 = new Observer({
    university: 'uestc',
    major: 'optical'
});



