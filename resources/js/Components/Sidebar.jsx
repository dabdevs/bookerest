import React from 'react'

export default function Sidebar() {
    return (
        <aside className="flex">
            <div className="flex flex-col items-start w-52 h-screen px-2 py-8 space-y-8 bg-white shadow-md">
                <a href="#" className={`${route().current('dashboard') ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100 text-gray-500'} flex gap-2 p-2 w-full focus:outline-nones transition-colors duration-200 rounded-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home
                </a>

                <a href="#" className={`${route().current('users.index') ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100 text-gray-500'} flex gap-2 p-2 w-full focus:outline-nones transition-colors duration-200 rounded-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    Users
                </a>

                <a href={route('roles.index')} className={`${route().current('roles.index') ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100 text-gray-500'} flex gap-2 p-2 w-full focus:outline-nones transition-colors duration-200 rounded-lg`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Roles
                </a>

                <a href="#" className={`${route().current('books.index') ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100 text-gray-500'} flex gap-2 p-2 w-full focus:outline-nones transition-colors duration-200 rounded-lg`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Books
                </a>

                <a href="#" className={`${route().current('trades.index') ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100 text-gray-500'} flex gap-2 p-2 w-full focus:outline-nones transition-colors duration-200 rounded-lg`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="M6 19L3 16M3 16L6 13M3 16H11C12.6569 16 14 14.6569 14 13V12M10 12V11C10 9.34315 11.3431 8 13 8H21M21 8L18 11M21 8L18 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Trades
                </a>
            </div>

            {/* <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60">
                <h2 className="px-5 text-lg font-medium text-gray-800">Accounts</h2>

                <div className="mt-8 space-y-4">
                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none">
                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div className="text-left rtl:text-right">
                                <h1 className="text-sm font-medium text-gray-700 capitalize">Mia John</h1>

                                <p className="text-xs text-gray-500">11.2 Followers</p>
                            </div>
                    </button>

                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none">
                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80" alt="" />

                            <div className="text-left rtl:text-right">
                                <h1 className="text-sm font-medium text-gray-700 capitalize">arthur melo</h1>

                                <p className="text-xs text-gray-500">1.2 Followers</p>
                            </div>
                    </button>

                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 gap-x-2 focus:outline-none">
                        <div className="relative">
                            <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                                <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        </div>

                        <div className="text-left rtl:text-right">
                            <h1 className="text-sm font-medium text-gray-700 capitalize">Jane Doe</h1>

                            <p className="text-xs text-gray-500">15.6 Followers</p>
                        </div>
                    </button>

                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none">
                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=80" alt="" />

                            <div className="text-left rtl:text-right">
                                <h1 className="text-sm font-medium text-gray-700 capitalize">Amelia. Anderson</h1>

                                <p className="text-xs text-gray-500">32.9 Followers</p>
                            </div>
                    </button>

                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none">
                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80" alt="" />

                            <div className="text-left rtl:text-right">
                                <h1 className="text-sm font-medium text-gray-700 capitalize">Joseph Gonzalez</h1>

                                <p className="text-xs text-gray-500">100.2 Followers</p>
                            </div>
                    </button>

                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 gap-x-2 focus:outline-none">
                        <div className="relative">
                            <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&h=1470&q=80" alt="" />
                                <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        </div>

                        <div className="text-left rtl:text-right">
                            <h1 className="text-sm font-medium text-gray-700 capitalize">Olivia Wathan</h1>

                            <p className="text-xs text-gray-500">8.6 Followers</p>
                        </div>
                    </button>

                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 gap-x-2 focus:outline-none">
                        <div className="relative">
                            <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1608174386344-80898cec6beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80" alt="" />
                                <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        </div>

                        <div className="text-left rtl:text-right">
                            <h1 className="text-sm font-medium text-gray-700 capitalize">Junior REIS</h1>

                            <p className="text-xs text-gray-500">56.6 Followers</p>
                        </div>
                    </button>
                </div>
            </div> */
            }
        </aside>
    )
}
