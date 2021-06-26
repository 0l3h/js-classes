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
        for (let i = arguments.length + this.length - 1; i >= arguments.length; i--) {
            this[i] = this[i - arguments.length];
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

const array1 = new MyArray();

array1.push(9, 7, 3);
array1.unshift(34, 56);

console.table(array1);


// RangeValidator
class RangeValidator {
    constructor(number1, number2) {
        this.to = number2;
        this.from = number1;
    }

    checkRangeValue(rangeLimit) {
        if(typeof rangeLimit !== 'number') {
            throw new TypeError("Value must be a number")
        }
        if(!Number.isSafeInteger(rangeLimit)) {
            throw new RangeError(`Value must be bigger than ${Number.MIN_SAFE_INTEGER} and less than ${Number.MAX_SAFE_INTEGER}`);
        }
    }

    set from(value) {
        if (value > this._to) {
            throw new RangeError("First value of the range must be less than the second value");
        }
        this.checkRangeValue(value);

        this._from = value;
    }

    get from() {
        return this._from;
    }

    set to(value) {
        if (value < this._from) {
            throw new RangeError("Second value of the range must be bigger than the first value");
        }
        this.checkRangeValue(value);

        this._to = value;
    }

    get to() {
        return this._to;
    }

    getterRange() {
        return [this.from, this.to];
    }

    validate(value) {
        this.checkRangeValue(value);
        
        return this.from <= value && value <= this.to; 
    }    
}    

try {
    const range = new RangeValidator(1, 5);
    console.log(range.getterRange());
    console.log(range.validate(2));
} catch(error) {
    console.error(error);
}