import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faAngleDown, faAngleUp, faFolderTree, faBoxOpen, faCartShopping, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showResponsiveNav, setShowResponsiveNav] = useState(false);

    const toggleSubMenu = () => {

        setShowSubMenu(prevState => !prevState);
    };

    const toggleResponsiveNav = () => {
        setShowResponsiveNav(prevState => !prevState);
    };




    return (
        <>
            {
                user?.is_admin != 0 ?
                    <div className="flex flex-col sm:flex-row h-screen overflow-hidden bg-gray-100 ">
                        {/* Sidebar */}
                        <div className="hidden sm:flex bg-white shadow h-full w-64 flex-col">
                            {/* Logo */}
                            <div className="flex items-center justify-center py-4 border-b border-gray-200">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* Navigation */}
                            <nav className="overflow-y-auto">
                                <ul className="py-4">
                                    <li className='px-4 py-2'>
                                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            <FontAwesomeIcon icon={faBars} />
                                            <p className='px-2 text-lg'>Dashboard</p>
                                        </NavLink>
                                    </li>


                                    {/* Add more sidebar links as needed */}
                                </ul>

                                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                                    <div className="pt-2 pb-3 space-y-1">
                                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            Dashboard
                                        </ResponsiveNavLink>
                                    </div>

                                    <div className="pt-4 pb-1 border-t border-gray-200">
                                        <div className="px-4">
                                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                        </div>

                                        <div className="mt-3 space-y-1">
                                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                Log Out
                                            </ResponsiveNavLink>
                                        </div>
                                    </div>
                                </div>
                            </nav>

                            {/* Profile and Logout */}

                            <div className="border-t border-gray-200 p-4">
                                {/* User Name */}
                                <div className="flex items-center space-x-2" onClick={toggleSubMenu}>
                                    <div className='flex items-center'>
                                        {/* <FontAwesomeIcon icon="fa-solid fa-check-square" /> */}

                                        <p className='px-2 text-lg'>{user.name}</p>
                                        {
                                            showSubMenu
                                                ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />
                                        }

                                    </div>
                                    <svg
                                        className="h-4 w-4 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        {/* Your dropdown icon */}
                                    </svg>
                                </div>

                                {/* Sub Menu */}
                                {showSubMenu && (
                                    <div className="pl-4 mt-2 space-y-2 flex flex-col">
                                        <NavLink href={route('profile.edit')}>
                                            <FontAwesomeIcon icon={faUser} />
                                            <p className='px-2 text-lg'>Profile</p>
                                        </NavLink>
                                        <NavLink href={route('logout')} method="post" as="button">
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                            <p className='px-2 text-lg'>Logout</p>
                                        </NavLink>
                                    </div>
                                )}
                            </div>


                        </div>

                        <div className="sm:hidden bg-white shadow w-full">
                            {/* Navbar toggle button */}
                            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                                <FontAwesomeIcon icon={faBars} onClick={toggleResponsiveNav} className="h-6 w-6 cursor-pointer" />
                            </div>
                            {/* Responsive nav links */}
                            {showResponsiveNav && (
                                <nav className="overflow-y-auto">
                                    <div className="py-4">
                                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            Dashboard
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('userCom')} active={route().current('userCom')}>
                                            UserCom
                                        </ResponsiveNavLink>
                                    </div>
                                    <div className="pt-4 pb-1 border-t border-gray-200">
                                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                            Logout
                                        </ResponsiveNavLink>
                                    </div>
                                </nav>
                            )}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 overflow-y-auto">
                            <nav className="bg-white border-b border-gray-200">
                                {/* ...Your existing top navigation */}
                            </nav>

                            {/* Header */}
                            {header && (
                                <header className="bg-white shadow">
                                    <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">{header}</div>
                                </header>
                            )}

                            {/* Main Content */}
                            <main className="px-4 py-6">{children}</main>
                        </div>
                    </div>
                    :
                    <div className="min-h-screen bg-gray-100">
                        <nav className="bg-white border-b border-gray-100">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16">
                                    <div className="flex">
                                        <div className="shrink-0 flex items-center">
                                            <Link href="/">
                                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                            </Link>
                                        </div>

                                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                                Dashboard
                                            </NavLink>
                                            <NavLink href={route('ticket')} active={route().current('ticket')}>
                                                Ticket Counter
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                                        <div className="ms-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            {user.name}

                                                            <svg
                                                                className="ms-2 -me-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Log Out
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="-me-2 flex items-center sm:hidden">
                                        <button
                                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                        >
                                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                <path
                                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                                <path
                                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                                <div className="pt-2 pb-3 space-y-1">
                                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </ResponsiveNavLink>
                                </div>

                                <div className="pt-4 pb-1 border-t border-gray-200">
                                    <div className="px-4">
                                        <div className="font-medium text-base text-gray-800">{user.name}</div>
                                        <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                            Log Out
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {header && (
                            <header className="bg-white shadow">
                                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                            </header>
                        )}

                        <main>{children}</main>
                    </div>

            }
        </>

    );
}
