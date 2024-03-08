
import Job from '../Logic/Job'
import Villager, { VillagerBuilder } from '../Logic/Villager'
import VillageDetail from '../Components/VillageDetail'
import VillagerJob from '../Components/VillagerJob'
import { useEffect, useState } from 'react'
import Creature from '../Logic/Creature'
import Creatures from '../Components/Creatures'
import { newVillage } from '../Logic/EventTypes'
import { BackendConnexion } from '../Logic/BackendConnexion'


type GameProps = {
    baseVillager: Villager
    baseFood: number
}

export default function Game({ baseVillager, baseFood }: GameProps) {

    useEffect(() => {
        const instance = BackendConnexion.getInstance()
        instance.setOnMessage(handleMessages)
    });


    const handleMessages = (event: MessageEvent) => {
        const pasedData = JSON.parse(event.data)
        if (pasedData.eventType === "foodProduced") {
            setFood(pasedData.newAmount)
        }
        else if (pasedData.eventType === "foodEaten") {
            setFood(pasedData.newAmount)
            const guys = pasedData.guys
            // {name: string, surname: string, health: number}
            // Edit villager's health
            const newVillagers = villagers.map((villager) => {
                const guy = guys.find((guy: any) => guy.name === villager.name && guy.surname === villager.surname)
                if (guy !== undefined) {
                    villager.health = guy.health
                }
                return villager
            })
            setVillagersState(newVillagers)
        } else if (pasedData.eventType === "newVillager") {
            const newGuy = pasedData.newGuy
            const villager = new VillagerBuilder()
                .withName(newGuy.name)
                .withSurname(newGuy.surname)
                .withAge(newGuy.age)
                .withHealth(newGuy.health)
                .withHunger(newGuy.stomachSize)
                .withBaseHealth(newGuy.baseHealth)
                .withWorkForce(newGuy.workingForce)
                .withJob(Job.getJob(newGuy.job))
                .withMagic(newGuy.magic)
                .withStrength(newGuy.damage)
                .withCaracteristics(newGuy.characteristic)
                .build()

            setVillagersState([...villagers, villager])
        }
        console.log(pasedData)
        console.log(pasedData.eventType)
    }

    const [villagers, setVillagersState] = useState([baseVillager])
    console.log(villagers)
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


    const [creatures, setCreatures] = useState([Creature.Snake, Creature.Orc, Creature.Goblin, Creature.Goblin])

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