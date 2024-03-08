
import { LuWheat } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import VillagerDetail from "./VillagerDetail";
import Villager from "../Logic/Villager";
import Job from "../Logic/Job";

type VillageDetailProps = {
    selectedVillager: Villager,
    food: number,
    numberOfVillagers: number,
    onChangeJob: (villager: Villager, job: Job) => void
}

export default function VillageDetail({selectedVillager, onChangeJob, food, numberOfVillagers} : VillageDetailProps) {

    return (
        <div className="flex flex-col items-center justify-between h-full w-1/4">
            <div className="flex flex-row items-center justify-center gap-12 border-2 border-gray-300 rounded-md p-4">
                <div className="flex flex-row items-center gap-2">
                    <LuWheat /> {food}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <IoPersonOutline /> {numberOfVillagers}
                </div>
            </div>
            <VillagerDetail selectedVillager={selectedVillager} onChangeJob={onChangeJob} />
        </div>

    )
}