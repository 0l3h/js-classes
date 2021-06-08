'use strict';

// MyArray
class MyArray {
    constructor() {
        for(let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }

        this.length = arguments.length;
    }

    unshift() {
        for (let i = arguments.length + this.length - 1; i >= 0; i--) {
            this[i] = this[i - arguments.length]
        }
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
            this.length++;
        }

        return this.length;
    }

    push() {
        for (let i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
            this.length++;
        }

        return this.length;
    }
}

const array1 = new MyArray(3, 6, 5, 6, 7, 10, 14);

array1.push(9, 7, 3);
array1.unshift(34, 56);

console.table(array1);


// RangeValidator
class RangeValidator {
    constructor(number1, number2) {
        if (typeof number1 !== "number" || typeof number2 !== "number") {
            throw new TypeError("Value type of the arguments must be a Number");
        }
        if(!Number.isSafeInteger(number1) || !Number.isSafeInteger(number2)) {
            throw new RangeError(`Value of the arguments must be bigger than ${Number.MIN_SAFE_INTEGER} and less than ${Number.MAX_SAFE_INTEGER}`);
        }

        this.from = number1;
        this.to = number2;
    }

    set from(value) {
        this._from = value;
    }

    get from() {
        return this._from;
    }

    set to(value) {
        this._to = value;
    }

    get to() {
        return this._to;
    }

    getterRange() {
        return [this.from, this.to];
    }

    validate(value) {
        if(typeof value !== "number") {
            throw new TypeError("Value must be a number");
        }
        if(!Number.isSafeInteger(value)) {
            throw new RangeError(`Value must be bigger than ${Number.MIN_SAFE_INTEGER} and less than ${Number.MAX_SAFE_INTEGER}`);
        }

        return this.from < value < this.to; 
    }    
}    

try {
    const range = new RangeValidator(-3, 6)
    console.log(range.getterRange());
    console.log(range.validate(3));
} catch(error) {
    console.error(error);
}
