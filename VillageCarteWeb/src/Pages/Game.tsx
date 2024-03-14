
import Job from '../Logic/Job'
import Villager from '../Logic/Villager'
import VillageDetail from '../Components/VillageDetail'
import VillagerJob from '../Components/VillagerJob'
import { useEffect, useState } from 'react'
import Creature from '../Logic/Creature'
import Creatures from '../Components/Creatures'
import { BackendConnexion } from '../Logic/BackendConnexion'
import { handleMessages } from '../Logic/DataHandlers'


type GameProps = {
    baseVillager: Villager
    baseFood: number
}

export default function Game({ baseVillager, baseFood }: GameProps) {

    useEffect(() => {
        const instance = BackendConnexion.getInstance()
        instance.setOnMessage(recuperationEvent)
    });


    const recuperationEvent = (event: MessageEvent) => {
        const villagerState = { villagers: villagers, setVillagers: setVillagersState }
        const foodState = { food: food, setFood: setFood }
        const creatureState = { creatures: creatures, setCreatures: setCreatures }
        handleMessages(event, villagerState, foodState, creatureState)
    }


    const [villagers, setVillagersState] = useState([baseVillager])
    const [food, setFood] = useState(baseFood)
    const [selectedVillager, setSelectedVillager] = useState(villagers[0])


    const onVillagerChangeJob = (villager: Villager, job: Job) => {
        const instance = BackendConnexion.getInstance()
        instance.send({ eventType: "jobChange", guy: { name: villager.name, surname: villager.surname, newJob: job.name } })


        villager.job = job
        setVillagersState([...villagers])
    }

    const onSelectedVillagerChange = (villager: Villager) => {
        setSelectedVillager(villager)
    }


    const [creatures, setCreatures] = useState<Creature[]>([])

    return (
        <div className="flex flex-row gap-12 p-2 h-full w-full">
            <VillageDetail selectedVillager={selectedVillager} onChangeJob={onVillagerChangeJob} food={food} numberOfVillagers={villagers.length} />
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