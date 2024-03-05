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

    static Goblin = new Creature("Goblin", Goblin, 10, 2);
    static Orc = new Creature("Orc", Orc, 30, 5);
    static Snake = new Creature("Snake", Snake, 3, 15);
}