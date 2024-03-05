import Villager from "../Logic/Villager"
import { IoPersonOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { GiPitchfork } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";
import { GiDrippingSword } from "react-icons/gi";

type VillagerCardProps = {
    villager: Villager
    selected: boolean
    onClick: () => void
}

export default function VillagerCard({ villager, selected, onClick }: VillagerCardProps) {


    return (
        <div className={"border-2 border-gray-300 rounded-xl p-3 cursor-pointer "+ (selected? "bg-amber-300" : "bg-amber-600")} onClick={onClick}>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                    <IoPersonOutline />
                    {villager.name}
                    { " " }
                    {villager.surname}
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <FaHeart />
                        {villager.health}
                    </div>
                    <div className="flex flex-row-reverse items-center gap-2">
                        <GiPitchfork />
                        {villager.workForce}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <GiSpellBook />
                        {villager.magic}
                    </div>
                    <div className="flex flex-row-reverse items-center gap-2">
                        <GiDrippingSword />
                        {villager.strength}
                    </div>
                </div>
            </div>
        </div>
    )

}