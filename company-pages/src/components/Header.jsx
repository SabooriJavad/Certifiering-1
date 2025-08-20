'use client';
import NavMenu from './NavMenu';
import Link from 'next/link';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn === "true") {
            setIsLoggedIn(true);
        }
    }, []);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            {/* <nav className={styles.nav}>
                <li>
                    <Link href="/">Home</Link>
                </li>


                <li className={styles.dropdown}>

                    <button onClick={toggleDropdown} className={styles.dropdownToggle}>
                        Comapny
                    </button>
                    {isOpen && (
                        <ol className={styles.dropdownMenu}>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link href="/companys">Company</Link>
                                    </li>
                                    <li >
                                        <button onClick={() => {
                                            localStorage.removeItem('isLoggedIn');
                                            setIsLoggedIn(false);
                                            window.location('/login');

                                        }}>
                                            Logout
                                        </button>

                                    </li>
                                </>
                            ) : (

                                <>
                                    <li>
                                        <Link href='/companye'>Register</Link>
                                    </li>
                                    <li>

                                        <Link href='/companys/login'>Login</Link>

                                    </li>
                                </>
                            )}

                        </ol>
                    )}

                </li>




                <section>

                    <li className={styles.dropdown}>
                        <button onClick={toggleDropdown} className={styles.dropdownToggle}>
                            Employee ▾
                        </button>

                        {isOpen && (
                            <ul className={styles.dropdownMenu}>
                                {isLoggedIn ? (
                                    <>
                                        <li><Link href='/employees'>Employees</Link></li>

                                        <li className={styles.dropdown}>
                                            <button onClick={() => {
                                                localStorage.removeItem('isLoggedIn');
                                                setIsLoggedIn(false); // korrekt stavning här!
                                                window.location = '/login';
                                            }}>
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href="/employee">Register</Link></li>
                                        <li><Link href="/login">Login</Link></li>
                                    </>
                                )}
                            </ul>
                        )}

                    </li>
                </section>
            </nav> */}

            <NavMenu />

        </header>
    );
}




