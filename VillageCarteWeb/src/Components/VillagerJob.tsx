import Job from "../Logic/Job";
import Villager from "../Logic/Villager";
import farmer from "../assets/Card/Farmer.jfif";
import VillagerCard from "./VillagerCard";
import { v4 } from "uuid";

type VillageDetailProps = {
    job: Job,
    villagers: Villager[],
    selectedVillager: Villager,
    onChangeSelectedVillager: (villager: Villager) => void
}

export default function VillagerJob({job, villagers, selectedVillager, onChangeSelectedVillager} : VillageDetailProps) {

    const displayedVillagers = villagers.filter(villager => villager.job.name === job.name);

    return <div className="bg-blue-100 rounded-md overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-2 items-center">
            <img src={job.image} alt="Farmer" className='h-20 w-20 border-2 border-gray-300 rounded-md' />
            <h1 className="text-2xl font-bold">{job.name}</h1>
        </div>
        <div className="px-2 flex flex-col">
            
        {displayedVillagers.map(villager => <VillagerCard key={v4()} villager={villager} selected={villager === selectedVillager} onClick={() => onChangeSelectedVillager(villager)} />)}
        </div>
    </div>
}