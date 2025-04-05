class Key {
    private readonly signature: number;

    constructor() {
        this.signature = Math.random();
    }

    getSignature(): number {
        return this.signature;
    }
}

class Person {
    private readonly key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    getKey(): Key {
        return this.key;
    }
}

abstract class House {
    protected door: boolean = false;
    protected key: Key;
    protected tenants: Person[] = [];

    constructor(key: Key) {
        this.key = key;
    }

    comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
            console.log(`${person.getKey().getSignature()} entered the house.`);
        } else {
            console.log('The door is closed.');
        }
    }

    abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
            console.log('The door is now open.');
        } else {
            console.log('The key does not match.');
        }
    }
}

const key = new Key();
const key2 = new Key();
const notMyHouse = new MyHouse(key2);

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

notMyHouse.openDoor(key);
notMyHouse.comeIn(person);

export {};