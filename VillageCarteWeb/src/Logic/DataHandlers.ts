import Creature from "./Creature"
import Job from "./Job"
import Villager, { VillagerBuilder } from "./Villager"

export type VillagersState = {
    villagers: Villager[],
    setVillagers: (villagers: Villager[]) => void
}

export type FoodState = {
    food: number,
    setFood: (food: number) => void
}

export type CreatureState = {
    creatures: Creature[],
    setCreatures: (creatures: Creature[]) => void
}

export function handleMessages(event: MessageEvent, villagersState: VillagersState, foodState: FoodState, creatureState: CreatureState) {
    const pasedData = JSON.parse(event.data)
    switch (pasedData.eventType) {
        case "foodProduced":
            foodProduced(pasedData, foodState)
            break;
        case "foodEaten":
            foodEaten(pasedData, foodState, villagersState)
            break;
        case "newVillager":
            newVillager(pasedData, villagersState)
            break;
        case "newAttack":
            newAttack(pasedData, creatureState)
            break;
        case "attackDamage":
            attackDamage(pasedData, villagersState, creatureState)
            break;
        case "healVillagers":
            healVillagers(pasedData, villagersState)
            break;
        default:
            console.log(pasedData)
            alert("Unknown event type")
    }
}

export function foodProduced(pasedData: { newAmount: number }, foodState: FoodState) {
    foodState.setFood(pasedData.newAmount)
}

export function foodEaten(pasedData: { newAmount: number, guys: any }, foodState: FoodState, villagersState: VillagersState) {
    if (pasedData === undefined || pasedData.newAmount === undefined || pasedData.guys === undefined) {
        throw new Error("Invalid foodEaten event")
    }


    foodState.setFood(pasedData.newAmount)
    const guys = pasedData.guys
    // Edit villager's health
    const newVillagers = villagersState.villagers.map((villager) => {
        const guy = guys.find((guy: any) => guy.name === villager.name && guy.surname === villager.surname)
        if (guy !== undefined) {
            villager.health = guy.health
        }
        return villager
    })


    villagersState.setVillagers(newVillagers)
}

export function newVillager(pasedData: { newGuy: any }, villagersState: VillagersState) {
    const newGuy = pasedData.newGuy
    const villager = new VillagerBuilder()
        .withName(newGuy.name)
        .withSurname(newGuy.surname)
        .withAge(newGuy.age)
        .withHealth(newGuy.health)
        .withHunger(newGuy.stomachSize)
        .withBaseHealth(newGuy.baseHealth)
        .withWorkForce(newGuy.workingForce)
        .withJob(Job.getJob(newGuy.job))
        .withMagic(newGuy.magic)
        .withStrength(newGuy.damage)
        .withCaracteristics(newGuy.characteristic)
        .build()

    villagersState.setVillagers([...villagersState.villagers, villager])
}

export function newAttack(pasedData: { creatures: any }, creatureState: CreatureState) {
    const newCreaturesData = pasedData.creatures
    const newCreatures = newCreaturesData.map((creatureData: any) => {
        const imageString = creatureData.name.split("-")[0];
        let creature = Creature.Goblin;
        switch (imageString) {
            case "Goblin":
                creature = Creature.Goblin
                break;
            case "Orc":
                creature = Creature.Orc
                break;
            case "Snake":
                creature = Creature.Snake
                break;
            default:
                creature = Creature.Goblin
        }
        creature.name = creatureData.name
        return creature
    })

    creatureState.setCreatures(newCreatures)
}

export function attackDamage(pasedData: { guys: any }, villagersState: VillagersState, creatureState: CreatureState) {
    const targets = pasedData.guys
    handleAttackDamage(targets, villagersState, creatureState)
}




export function handleAttackDamage(targets: any, villagersState: VillagersState, creatureState: CreatureState) {
    if (targets.length === 0) {
        return
    }

    const firstTarget = targets[0]
    const targetType = firstTarget.targetType // "villagers" or "creatures"

    if (targetType === "villager") {
        handleAttackDamageVillagers(targets, villagersState)
    } else if (targetType === "creature") {
        handleAttackDamageCreatures(targets, creatureState)
    }
    else {
        console.log(targets)
        alert("Unknown target type")
    }
}

export function handleAttackDamageVillagers(targets: any, villagerState: VillagersState){
    // {name: string, surname: string, newHealth: number}
    const newVillagers = villagerState.villagers.map((villager) => {
        const guy = targets.find((guy: any) => guy.name === villager.name && guy.surname === villager.surname)
        if (guy !== undefined) {
            villager.health = guy.newHealth
        }
        return villager
    })

    // Remove dead villagers
    const newVillagersFiltered = newVillagers.filter((villager) => villager.health > 0)

    villagerState.setVillagers(newVillagersFiltered)
}

export function handleAttackDamageCreatures(targets: any, creatureState: CreatureState){
    // {name: string, newHealth: number}
    const newCreatures = creatureState.creatures.map((creature) => {
        const guy = targets.find((guy: any) => guy.name === creature.name)
        if (guy !== undefined) {
            creature.health = guy.newHealth
        }
        return creature
    })

    // Remove dead creatures
    const newCreaturesFiltered = newCreatures.filter((creature) => creature.health > 0)

    creatureState.setCreatures(newCreaturesFiltered)
}

export function healVillagers(pasedData: { guys: {name:string, surname: string, health:number}[] }, villagersState: VillagersState){
    const guys = pasedData.guys
    // {name: string, surname: string, health: number}
    // Edit villager's health
    const newVillagers = villagersState.villagers.map((villager) => {
        const guy = guys.find((guy: any) => guy.name === villager.name && guy.surname === villager.surname)
        if (guy !== undefined) {
            villager.health = guy.health
        }
        return villager
    })
    villagersState.setVillagers(newVillagers)
}