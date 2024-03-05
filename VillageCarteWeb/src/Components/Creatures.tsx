import { v4 } from "uuid"
import Creature from "../Logic/Creature"
import CreatureCard from "./CreatureCard"

type CreaturesProps = {
    creatures: Creature[]
}

export default function Creatures({ creatures }: CreaturesProps) {

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-12">
            <h1 className="text-3xl font-bold">
                Creatures
            </h1>
            <div className="grid grid-cols-2 gap-4 overflow-y-auto h-3/4">
                {creatures.map((creature) => (
                    <CreatureCard creature={creature} key={v4()} />
                ))}
            </div>
        </div>
    )
}