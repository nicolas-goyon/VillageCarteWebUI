import { useState } from 'react'
import './App.css'
import { BackendConnexion } from './Logic/BackendConnexion'
import Game from './Pages/Game'
import Home from './Pages/Home'
import Villager, { VillagerBuilder } from './Logic/Villager'
import Job from './Logic/Job'

function App() {
  const instance = BackendConnexion.getInstance()


  instance.addObserver(() => {
    const event = instance.getStoredFirstEvent()
    if (event !== null) {
      const parsedData = JSON.parse(event.data)
      const baseGuy = parsedData.baseGuy
      const villager = new VillagerBuilder()
        .withName(baseGuy.name)
        .withSurname(baseGuy.surname)
        .withAge(baseGuy.age)
        .withHealth(baseGuy.health)
        .withHunger(baseGuy.stomachSize)
        .withBaseHealth(baseGuy.baseHealth)
        .withWorkForce(baseGuy.workingForce)
        .withJob(Job.getJob(baseGuy.job))
        .withMagic(baseGuy.magic)
        .withStrength(baseGuy.damage)
        .withCaracteristics(baseGuy.characteristic)
        .build()

      setBaseData({ villager, baseFood: parsedData.baseFood })
    }
  })


  const [baseData, setBaseData] = useState<{ villager: Villager, baseFood: number } | null>(null)

  if (baseData !== null) {
    return <div className="h-full w-full">
      <Game baseVillager={baseData.villager} baseFood={baseData.baseFood} />
    </div>
  }

  return (
    <div className="h-full w-full">
      <Home />
      {/* <Game/> */}
      {/* <Card/> */}
    </div>
  )
}

export default App
