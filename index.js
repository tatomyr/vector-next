/**
 * Defining of Discrete Vector class
 * Min value -- 0
 * Max value is set by 'range' parameter
 * Default range -- 1 (binary vector)
 */

module.exports = class DiscreteVector extends Array {
  constructor(origin, range = 1) {
    super();

    if (Array.isArray(origin)) {
      origin.forEach((item, i) => this[i] = 0);
    } else if (typeof origin === 'number') {
      this.push(...Array(origin).fill(0));
    } else {
      throw(new Error('Argument is neither array nor number!'));
    }

    Object.defineProperty(this, 'range', {
      value: range,
      enumerable: false
    });
    Object.defineProperty(this, 'combinations', {
      value: Math.pow(range + 1, this.length),
      enumerable: false
    });
  }

  // Finds next combination for discrete vector
  // Imperative implementation:
  next() {
    for (let i = 0; i < this.length; i++) {
      if (this[i] < this.range) {
        this[i]++;
        break;
      } else {
        this[i] = 0;
      }
    }
    return this;
  }

  // Functional implementation:
  next_() {
    this.some((item, i) => item < this.range ? ++this[i] : this[i] = 0);
    return this;
  }

  // Fills the vector with random values
  random() {
    this.forEach((item, i) => this[i] = Math.floor(Math.random() * (this.range + 1)));
    return this;
  }

  // Reset the discrete vector
  reset() {
    this.forEach((item, i) => this[i] = 0);
    return this;
  }

  // Coerces (range + 1)-ary number given in discrete vector to the decimal value
  index() {
    return this.reduce((prev, item, i) => prev + item * Math.pow(this.range + 1, i), 0);
  }

  // Fills new array with proper amount of origin's array items
  // Imperative implementation:
  fillWith(origin) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this[i]; j++) result.push(origin[i]);
    }
    return result;
  }

  // Functional implementation:
  fillWith_(origin) {
    return this.reduce((prev, item, i) => [...prev, ...Array(item).fill(origin[i])], []);
  }
}
