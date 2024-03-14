import { expect, test, describe } from 'vitest'
import * as dh from '../Logic/DataHandlers'
import Job from '../Logic/Job'
import Creature from '../Logic/Creature'

describe('DataHandlers', () => {
    test('foodProduced event', () => {
        const villagersState = { villagers: [], setVillagers: (villagers: any) => { } }
        const foodState = {
            food: 0, setFood: (food: number) => {
                expect(food).toBe(100)
            }
        }
        const creatureState = { creatures: [], setCreatures: (creatures: any) => { } }
        const data = { eventType: "foodProduced", newAmount: 100 }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, villagersState, foodState, creatureState)
    })

    test('foodProduced', () => {
        const foodState = {
            food: 0, setFood: (food: number) => {
                expect(food).toBe(100)
            }
        }
        const data = { newAmount: 100 }
        const foodProduced = dh.foodProduced(data, foodState)
        expect(foodProduced).toBe(undefined)
    })

    test('foodEaten event', () => {
        const villagersState = { villagers: [], setVillagers: (villagers: any) => { } }
        const foodState = {
            food: 0, setFood: (food: number) => {
                expect(food).toBe(100)
            }
        }
        const data = { eventType: "foodEaten", newAmount: 100, guys: [] }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, villagersState, foodState, { creatures: [], setCreatures: (creatures: any) => { } })
    });

    test('foodEaten', () => {
        const foodState = {
            food: 0, setFood: (food: number) => {
                expect(food).toBe(100)
            }
        }
        const villagersState = { villagers: [], setVillagers: (villagers: any) => { } }
        const data = { newAmount: 100, guys: [] }
        const foodEaten = dh.foodEaten(data, foodState, villagersState)
        expect(foodEaten).toBe(undefined)
    });

    test('newVillager event', () => {
        const villagersState = {
            villagers: [], setVillagers: (villagers: any) => {
                expect(villagers).toEqual([{ name: "John", surname: "Doe", job: Job.Farmer, health: 100, age: 0, hunger: 100, baseHealth: 100, workForce: 1, magic: 0, strength: 0, caracteristics: [] }])
            }
        }
        const data = { eventType: "newVillager", newGuy: { name: "John", surname: "Doe", job: "Farmer", health: 100, age: 0, stomachSize: 100, baseHealth: 100, workingForce: 1, magic: 0, damage: 0, characteristic: [] } }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, villagersState, { food: 0, setFood: (food: number) => { } }, { creatures: [], setCreatures: (creatures: any) => { } })
    });

    test('newVillager', () => {
        const villagersState = {
            villagers: [], setVillagers: (villagers: any) => {
                expect(villagers).toEqual([{ name: "John", surname: "Doe", job: Job.Farmer, health: 100, age: 0, hunger: 100, baseHealth: 100, workForce: 1, magic: 0, strength: 0, caracteristics: [] }])
            }
        }
        const data = { newGuy: { name: "John", surname: "Doe", job: "Farmer", health: 100, age: 0, stomachSize: 100, baseHealth: 100, workingForce: 1, magic: 0, damage: 0, characteristic: [] } }
        const newVillager = dh.newVillager(data, villagersState)
        expect(newVillager).toBe(undefined)
    });

    test('newAttack event', () => {
        const creatureState = {
            creatures: [], setCreatures: (creatures: any) => {
                expect(creatures).toEqual([Creature.Goblin])
            }
        }
        const data = { eventType: "newAttack", creatures: [{ name: "Goblin", health: 10, damage: 3 }] }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, { villagers: [], setVillagers: (villagers: any) => { } }, { food: 0, setFood: (food: number) => { } }, creatureState)
    });

    test('newAttack', () => {
        const creatureState = {
            creatures: [], setCreatures: (creatures: any) => {
                expect(creatures).toEqual([Creature.Goblin])
            }
        }
        const data = { creatures: [{ name: "Goblin", health: 10, damage: 3 }] }
        const newAttack = dh.newAttack(data, creatureState)
        expect(newAttack).toBe(undefined)
    });

    test('attackDamage event: Villager', () => {
        const village = { villagers: [{ name: "John", surname: "Doe", job: Job.Farmer, health: 100, age: 0, hunger: 100, baseHealth: 100, workForce: 1, magic: 0, strength: 0, caracteristics: [] }] }

        const villagersState = {
            villagers: village.villagers, setVillagers: (villagers: any) => {
                expect(villagers).toEqual([{ name: "John", surname: "Doe", job: Job.Farmer, health: 97, age: 0, hunger: 100, baseHealth: 100, workForce: 1, magic: 0, strength: 0, caracteristics: [] }])
            }
        }

        const data = { eventType: "attackDamage", guys: [{ name: "John", surname: "Doe", newHealth: 97, targetType: "villager" }] }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, villagersState, { food: 0, setFood: (food: number) => { } }, { creatures: [], setCreatures: (creatures: any) => { } })
    });

    test('attackDamage event: Creature', () => {
        const expected = [Creature.Goblin]
        expected[0].health = 7
        const creaturesState = {
            creatures: [Creature.Goblin], setCreatures: (creatures: any) => {
                expect(creatures).toEqual(expected)
            }
        }
        const data = { eventType: "attackDamage", guys: [{ name: "Goblin", newHealth: 7, targetType: "creature" }] }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, { villagers: [], setVillagers: (villagers: any) => { } }, { food: 0, setFood: (food: number) => { } }, creaturesState)
    });

    test('healVillagers event', () => {
        const village = { villagers: [{ name: "John", surname: "Doe", job: Job.Farmer, health: 100, age: 0, hunger: 100, baseHealth: 100, workForce: 1, magic: 0, strength: 0, caracteristics: [] }] }

        const villagersState = {
            villagers: village.villagers, setVillagers: (villagers: any) => {
                expect(villagers).toEqual([{ name: "John", surname: "Doe", job: Job.Farmer, health: 100, age: 0, hunger: 100, baseHealth: 100, workForce: 1, magic: 0, strength: 0, caracteristics: [] }])
            }
        }

        const data = { eventType: "healVillagers", guys: [{ name: "John", surname: "Doe", health: 100 }] }
        const event = new MessageEvent('message', { data: JSON.stringify(data) })
        dh.handleMessages(event, villagersState, { food: 0, setFood: (food: number) => { } }, { creatures: [], setCreatures: (creatures: any) => { } })
    });

})