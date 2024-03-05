import Creature from "../Logic/Creature";
import { GiDrippingSword } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

export default function CreatureCard({ creature }: { creature: Creature }) {

    return (
        <div className="flex flex-col items-center justify-center bg-slate-100 p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-slate-200 transition duration-300 cursor-context-menu">
            <img src={creature.image} alt={creature.name} className="h-48 w-48 rounded-full" />
            <h2 className="text-2xl mt-4">{creature.name}</h2>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <FaHeart />
                    {creature.health}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <GiDrippingSword />
                    {creature.damage}
                </div>
            </div>
        </div>
    )
}