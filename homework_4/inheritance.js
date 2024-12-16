class Car {
  constructor(color, brand) {
    // Object properties
    this.carColor = color;
    this.carBrand = brand;
  }
  //   Methods
  color() {
    return this.carColor;
  }
  brand() {
    return this.carBrand;
  }
}

class RacingCar extends Car {
  constructor(carColor, brand, topSpeed, engine) {
    super(carColor, brand);
    this.topSpeed = topSpeed;
    this.engine = engine;
  }
  maxSpeed() {
    return this.topSpeed;
  }
  engineType() {
    return this.engine;
  }
}

class RcCar extends Car {
  constructor(color, rechargableBattery) {
    super(color);
    this.rechargableBattery = rechargableBattery;
  }
}
const myCar = new Car("blue", "BMW");
const myRacingCar = new RacingCar("red", "ferrari", "703kmh", "V8");
const myRcCar = new RcCar("violet", true);

function logger() {
  // logging keys & values
  // console.log(
  //   Object.keys(myRacingCar).forEach((key) => {
  //     console.log(`${key}: ${myRacingCar[key]}`);
  //   })
  // );
  // logging entire objects
  console.log(myCar, "\n", myRacingCar, "\n", myRcCar);
}
logger();
