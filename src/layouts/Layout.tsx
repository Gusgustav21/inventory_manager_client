import { Outlet } from "react-router-dom";


export default function Layout() {
    return (
        <>
            <header className="bg-slate-800 ">
                <div className="mx-auto max-w-6xl py-10">
                    <h1 className="text-white text-4xl font-bold">Inventory Manager</h1>
                </div>
            </header>
            <main className="mx-auto mt-10 max-w-6xl bg-white rounded-sm shadow p-10">
                <Outlet/>
            </main>
        </>
    )
}
