import { GiNewBorn } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GiPitchfork } from "react-icons/gi";
import { GiHealthNormal } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
import { GiDrippingSword } from "react-icons/gi";
import Villager from '../Logic/Villager';
import Job from '../Logic/Job';
import ToolTip from './Tooltip';

type VillageDetailProps = {
    selectedVillager: Villager
    onChangeJob: (villager: Villager, job: Job) => void
}


export default function VillagerDetail({ selectedVillager, onChangeJob }: VillageDetailProps) {


    const jobButtonClasses = "px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 disabled:hover:bg-blue-500"

    return <div className="flex h-4/5 flex-col w-full bg-zinc-400 rounded-md p-4">
        <h1 className="text-3xl font-bold font-serif">
            Selected villager
        </h1>
        {/* 1st row : Image and base info */}
        <div className="flex flex-row w-full">
            <div className="w-1/3">
                <img src={selectedVillager.job.image} alt="Farmer" className='h-28 w-28 border-2 border-gray-300 rounded-md' />
            </div>
            <div className="flex flex-col w-2/3">
                <div className='text-2xl font-bold font-serif h-1/2 flex flex-row items-center'>
                    {selectedVillager.name} {selectedVillager.surname}
                </div>
                <div className='flex flex-row justify-between items-center h-1/2'>
                    <div className="flex flex-row items-center gap-2">
                        <GiNewBorn />
                        {selectedVillager.age} years old
                    </div>
                    <div className="flex flex-row-reverse items-center gap-2">
                        <MdWork />
                        {selectedVillager.job.name}
                    </div>
                </div>
            </div>
        </div>


        <div className="grid grid-cols-2 grid-rows-3 gap-4">
            <ToolTip text="The current health of the villager">
                <div className="flex flex-row items-center gap-2">
                    <FaHeart />
                    {selectedVillager.health}
                </div>
            </ToolTip>

            <ToolTip text="The amount of food the villager can produce">
                <div className="flex flex-row-reverse items-center gap-2">
                    <GiPitchfork />
                    {selectedVillager.workForce}
                </div>
            </ToolTip>

            <ToolTip text="The base health of the villager">
                <div className="flex flex-row items-center gap-2"> {/** Base health */}
                    <GiHealthNormal />
                    {selectedVillager.baseHealth}
                </div>
            </ToolTip>

            <ToolTip text="The healing power of the villager">
                <div className="flex flex-row-reverse items-center gap-2">
                    <GiSpellBook />
                    {selectedVillager.magic}
                </div>
            </ToolTip>

            <ToolTip text="The amount of food the villager eats">
                <div className="flex flex-row items-center gap-2">
                    <GiMeat />
                    {selectedVillager.hunger}
                </div>
            </ToolTip>

            <ToolTip text="The strength of the villager">
                <div className="flex flex-row-reverse items-center gap-2">
                    <GiDrippingSword />
                    {selectedVillager.strength}
                </div>
            </ToolTip>
        </div>



        <div className="flex flex-col gap-4">
            Caracteristics :
            <div className="flex flex-row items-center gap-2">

                {selectedVillager.caracteristics.map((caracteristic, index) => {
                    return <span key={index} className="bg-green-700 rounded-full px-3 text-white">
                        {caracteristic}
                    </span>
                })}
            </div>
        </div>


        <div className="flex flex-col gap-4">
            Change job :

            <div className="grid grid-cols-2 gap-2">
                <button
                    className={jobButtonClasses} disabled={selectedVillager.job.name === Job.Farmer().name} onClick={() => onChangeJob(selectedVillager, Job.Farmer())}>
                    {Job.Farmer().name}
                </button>
                <button className={jobButtonClasses} disabled={selectedVillager.job.name === Job.Soldier().name} onClick={() => onChangeJob(selectedVillager, Job.Soldier())}>
                    {Job.Soldier().name}
                </button>
                <button className={jobButtonClasses} disabled={selectedVillager.job.name === Job.Doctor().name} onClick={() => onChangeJob(selectedVillager, Job.Doctor())}>
                    {Job.Doctor().name}
                </button>
                <button className={jobButtonClasses} disabled={selectedVillager.job.name === Job.Unemployed().name} onClick={() => onChangeJob(selectedVillager, Job.Unemployed())}>
                    {Job.Unemployed().name}
                </button>
            </div>
        </div>

    </div>
}