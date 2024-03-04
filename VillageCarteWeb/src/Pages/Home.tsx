export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-12">
            <h1 className="text-3xl font-bold">
                Home
            </h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                New game
            </button>
        </div>
    )
}