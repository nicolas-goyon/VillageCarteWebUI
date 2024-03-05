import Job from "./Job";

export default class Villager {
    name: string;
    surname: string;
    age: number;
    health: number;
    hunger: number;
    baseHealth: number;
    workForce: number;
    magic: number;
    strength: number;
    job: Job;
    caracteristics: string[];

    constructor(name : string, surname: string, age: number, health: number, hunger: number, baseHealth: number, workForce: number, magic: number, strength: number, job: Job, caracteristics: string[]) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.health = health;
        this.hunger = hunger;
        this.baseHealth = baseHealth;
        this.workForce = workForce;
        this.magic = magic;
        this.strength = strength;
        this.job = job;
        this.caracteristics = caracteristics;
    }
}