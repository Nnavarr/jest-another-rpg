const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
})

test("gets player's stats as a n object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));  
    player.inventory = [];
    expect(player.getInventory()).toEqual(false);
  });


// health test
test("get player's health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
})

// player is alive test
test('checks if player is alive or not', () =>{
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    // set health to 0, dead, check for dead return
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
})

// check for correct amount of health being subtracted
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);
    player.reduceHealth(99999);
    expect(player.health).toBe(0);

})

// get players attack value
test("get player's attack value", () =>{
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);

})

// check potion was added correctly
test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    // add potion and check to ensure the inventory actually grew
    player.addPotion(new Potion());
    expect(player.inventory.length).toBeGreaterThan(oldCount);

})

// check to ensure the correct potion is used and stats applied
test('uses a potion from inventory', () =>{
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
})

jest.mock('../lib/Potion');
console.log(new Potion());