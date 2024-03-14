import Goblin from "../assets/Card/Goblin.webp";
import Orc from "../assets/Card/Orc.webp";
import Snake from "../assets/Card/Snake.webp";

export default class Creature{
    private _name: string;
    private _image: string;
    private _health: number;
    private _damage: number;

    private constructor(name: string, image: string, health: number, damage: number) {
        this._name = name;
        this._image = image;
        this._health = health;
        this._damage = damage;
    }

    get name() {
        return this._name;
    }

    get image() {
        return this._image;
    }

    get health() {
        return this._health;
    }

    get damage() {
        return this._damage;
    }

    set name(name: string) {
        this._name = name;
    }

    set health(health: number) {
        this._health = health;
    }


    static Goblin = () => new Creature("Goblin", Goblin, 10, 3);
    static Orc = () => new Creature("Orc", Orc, 50, 20);
    static Snake = () => new Creature("Snake", Snake, 5, 10);
}