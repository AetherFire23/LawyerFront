
// maybe this can just show the buttons and navigate to the -useclient-
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import Link from "next/link"
// const inter = Inter({ subsets: ['latin'] })

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="navbar bg-base-300">
                <Link href={"/homePage"}>
                    <button className="btn btn-ghost normal-case text-xl">Home</button>
                </Link>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn m-1">Personal</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={"/homePage/personalInfoPage"}>
                                <button>Item 1</button>
                            </Link>
                        </li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn m-1">Clients</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={"/homePage/clients/findclient"}>
                                <button>Search</button>
                            </Link>
                        </li>
                        <li>
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <Link href={"/homePage/clients/addclient"}>
                                <button> Add Client </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn m-1">Procedure</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={"/homePage/personalInfoPage"}>
                                <button>Find</button>
                            </Link>
                        </li>
                        <li><a>Add</a></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn m-1">Billing</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                        <li>
                            <Link href={"/homePage/personalInfoPage"}>
                                <button>Trouver</button>
                            </Link>
                        </li>
                        <li><a>Ajouter</a></li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    )
}
