let obj = {
    age: 50,
    name: "oldDeng",
    wife: "小刘",
    son: "王小宝",
    addr: {
        country: "天朝",
        province: "黑龙江",
        community: "绿帽大街001号"
    },
    grilfirend: [
        "铁锤妹妹",
        "绿茶妹妹",
        "翠花妹妹"
    ]
};
let arr = [ 1, 2, 3];

function arrayVariantfunc ( arr) {
    let funcs = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];
    let arrProxy = Object.create( Array.prototype);

    funcs.forEach( key => {
        let temp = Array.prototype[ key];
        arrProxy[ key] = function () {
            let result = temp.call( this, ...arguments);
            rander();
            return result;
        }
    })
    arr.__proto__ = arrProxy;
}
function rander () {
    console.log("===============rander");
}

function defineReactive( obj, prop, val = obj[prop]) {
    observer( val);
    Object.defineProperty( obj, prop, {
        get() {
            // console.log("=============读");
            return val;
        },
        set( newVal) {
          if( val === newVal) return;
          rander();
          val = newVal;
        }
    })
}
function observer( target) {
    if( {}.toString.call( target) === "[object Object]") {
        Object.keys( target).forEach( (key) => {
            defineReactive( target, key);
        })
    }
    if( Array.isArray( target)) {
        arrayVariantfunc( target);
    }
}

function $set( target, key, val) {
    if( {}.toString.call( target) === "[object Object]") {
        defineReactive( target, key, val);
        rander();
    }
    if( Array.isArray( target)) {
        target.splice( key, 1, val);
    }
}
function $delete( target, key) {
    if( {}.toString.call( target) === "[object Object]") {
        delete target[key];
        rander();
    }
    if( Array.isArray( target)) {
        target.splice( key, 1);
    }
}

// defineReactive( obj, "addr");
observer( obj);

console.log( obj.grilfirend);
obj.grilfirend.reverse();
console.log( obj.grilfirend);

// console.log( obj.addr);
// $delete( obj.addr, "province");
// console.log( obj.addr);

// console.log( obj.addr);
// $set( obj.addr, "planet", "earth");
// console.log( obj.addr);

// console.log( obj.grilfirend);
// $delete( obj.grilfirend, "2");
// console.log( obj.grilfirend);

// console.log( obj.grilfirend);
// $set( obj.grilfirend, "2", "二丫");
// console.log( obj.grilfirend);
