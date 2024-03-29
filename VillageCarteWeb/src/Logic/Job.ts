import farmer from "../assets/Card/Farmer.jfif";
import soldier from "../assets/Card/Knight.jfif";
import doctor from "../assets/Card/Medic.jfif";

export default class Job {
    private _name: string;
    private _image: string;

    private constructor(name: string, image: string) {
        this._name = name;
        this._image = image;   
    }

    get name() {
        return this._name;
    }

    get image() {
        return this._image;
    }

    static Farmer = () => new Job("Farmer", farmer);
    static Soldier = () => new Job("Soldier", soldier);
    static Doctor = () => new Job("Doctor", doctor);
    static Unemployed = () => new Job("Unemployed", farmer);

    static getJob(name: string) : Job {
        name = name.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        switch(name) {
            case "Farmer":
                return Job.Farmer();
            case "Soldier":
                return Job.Soldier();
            case "Doctor":
                return Job.Doctor();
            case "Unemployed":
                return Job.Unemployed();
            default:
                throw new Error("Job not found");
        }
    }
}