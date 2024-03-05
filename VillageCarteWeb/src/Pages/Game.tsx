
import Job from '../Logic/Job'
import Villager from '../Logic/Villager'
import VillageDetail from '../Components/VillageDetail'
import VillagerJob from '../Components/VillagerJob'
import { useState } from 'react'
import Creature from '../Logic/Creature'
import Creatures from '../Components/Creatures'




export default function Game() {


    const [villagers, setVillagersState] = useState([
        new Villager("John", "Doe", 20, 100, 100, 100, 100, 100, 100, Job.Farmer, ["Strong", "Healthy", "Hardworking"]),
        new Villager("Jane", "Doe", 20, 100, 100, 100, 100, 100, 100, Job.Soldier, ["Strong", "Healthy", "Hardworking"]),
        new Villager("Jack", "Doe", 20, 100, 100, 100, 100, 100, 100, Job.Doctor, ["Strong", "Healthy", "Hardworking"]),
        new Villager("Jill", "Doe", 20, 100, 100, 100, 100, 100, 100, Job.Unemployed, ["Strong", "Healthy", "Hardworking"])
    ])

    const [selectedVillager, setSelectedVillager] = useState(villagers[0])


    const onVillagerChangeJob = (villager: Villager, job: Job) => {
        villager.job = job
        setVillagersState([...villagers])
    }

    const onSelectedVillagerChange = (villager: Villager) => {
        setSelectedVillager(villager)
    }


    const [creatures, setCreatures] = useState([Creature.Snake, Creature.Orc, Creature.Goblin, Creature.Goblin])

    return (
        <div className="flex flex-row gap-12 p-2 h-full w-full">
            <VillageDetail selectedVillager={selectedVillager} onChangeJob={onVillagerChangeJob} />
            <div className="gap-12 h-full w-1/2">
                {/* 4 zones, top left, top right, bottom left and bottom right */}
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                    <VillagerJob job={Job.Farmer} villagers={villagers} selectedVillager={selectedVillager} onChangeSelectedVillager={onSelectedVillagerChange} />
                    <VillagerJob job={Job.Soldier} villagers={villagers} selectedVillager={selectedVillager} onChangeSelectedVillager={onSelectedVillagerChange} />
                    <VillagerJob job={Job.Doctor} villagers={villagers} selectedVillager={selectedVillager} onChangeSelectedVillager={onSelectedVillagerChange} />
                    <VillagerJob job={Job.Unemployed} villagers={villagers} selectedVillager={selectedVillager} onChangeSelectedVillager={onSelectedVillagerChange} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-12 h-full w-1/4">
                <Creatures creatures={creatures} />
            </div>

        </div>
    )

}