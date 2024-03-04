export default function Game() {

    return (
        <div className="flex flex-row items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center w-1/3 gap-12">
                <p>Data</p>
                <p>Food : 100</p>
                <p>Nombre villageois : 10</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-12 w-1/3">
                <p>JOBS</p>
                <p>Farmers : 10</p>
                <p>Woodcutters : 10</p>
                <p>Miners : 10</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-12 w-1/3">
                <p>Creatures</p>
                <p>Wolves : 10</p>
                <p>Bears : 10</p>
                <p>Dragons : 10</p>
            </div>

        </div>
    )

}