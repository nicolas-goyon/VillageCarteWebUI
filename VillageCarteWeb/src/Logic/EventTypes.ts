import Job from "./Job"
import Villager, { VillagerBuilder } from "./Villager"


/* -------------------------------------------------------------------------- */
/*                               INCOMING EVENTS                              */
/* -------------------------------------------------------------------------- */


export type newVillage = {
    eventType: "newVillage",
    baseGuy: {
        name: string,
        surname: string,
        age: number,
        characteristic: string[]
        job: string,
        stomachSize: number,
        health: number,
        magic: number,
        damage: number,
        baseHealth: number,
        workingForce: number,
    }
}







/* -------------------------------------------------------------------------- */
/*                              OUTCOMING EVENTS                              */
/* -------------------------------------------------------------------------- */

export type jobChange = {
    eventType: "jobChange",
    guy: {
        name: string,
        surname: string,
        newJob: string
    }
}


