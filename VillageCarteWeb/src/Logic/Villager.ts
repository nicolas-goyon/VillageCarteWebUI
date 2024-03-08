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

export class VillagerBuilder {
    private name: string | undefined;
    private surname: string | undefined;
    private age: number | undefined;
    private health: number | undefined;
    private hunger: number | undefined;
    private baseHealth: number | undefined;
    private workForce: number | undefined;
    private magic: number | undefined;
    private strength: number | undefined;
    private job: Job | undefined;
    private caracteristics: string[] | undefined;

    constructor() {
        this.name = undefined;
        this.surname = undefined;
        this.age = undefined;
        this.health = undefined;
        this.hunger = undefined;
        this.baseHealth = undefined;
        this.workForce = undefined;
        this.magic = undefined;
        this.strength = undefined;
        this.job = undefined;
        this.caracteristics = undefined;
    }

    public withName(name: string) {
        this.name = name;
        return this;
    }

    public withSurname(surname: string) {
        this.surname = surname;
        return this;
    }

    public withAge(age: number) {
        this.age = age;
        return this;
    }

    public withHealth(health: number) {
        this.health = health;
        return this;
    }

    public withHunger(hunger: number) {
        this.hunger = hunger;
        return this;
    }

    public withBaseHealth(baseHealth: number) {
        this.baseHealth = baseHealth;
        return this;
    }

    public withWorkForce(workForce: number) {
        this.workForce = workForce;
        return this;
    }

    public withMagic(magic: number) {
        this.magic = magic;
        return this;
    }

    public withStrength(strength: number) {
        this.strength = strength;
        return this;
    }

    public withJob(job: Job) {
        this.job = job;
        return this;
    }

    public withCaracteristics(caracteristics: string[]) {
        this.caracteristics = caracteristics;
        return this;
    }

    public build() {
        if (this.name === undefined) {
            throw new Error("Name is required");
        }
        if (this.surname === undefined) {
            throw new Error("Surname is required");
        }
        if (this.age === undefined) {
            throw new Error("Age is required");
        }
        if (this.health === undefined) {
            throw new Error("Health is required");
        }
        if (this.hunger === undefined) {
            throw new Error("Hunger is required");
        }
        if (this.baseHealth === undefined) {
            throw new Error("BaseHealth is required");
        }
        if (this.workForce === undefined) {
            throw new Error("WorkForce is required");
        }
        if (this.magic === undefined) {
            throw new Error("Magic is required");
        }
        if (this.strength === undefined) {
            throw new Error("Strength is required");
        }
        if (this.job === undefined) {
            throw new Error("Job is required");
        }
        if (this.caracteristics === undefined) {
            throw new Error("Caracteristics is required");
        }
        


        return new Villager(this.name, this.surname, this.age, this.health, this.hunger, this.baseHealth, this.workForce, this.magic, this.strength, this.job, this.caracteristics);
    }
}