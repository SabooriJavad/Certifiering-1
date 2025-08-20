'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from './Header.module.css';

export default function NavMenu() {
    const [isCompanyOpen, setCompanyOpen] = useState(false);
    const [isEmployeeOpen, setEmployeeOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();
    const companyRef = useRef(null);
    const employeeRef = useRef(null);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

        const handleClickOutside = (e) => {
            if (
                companyRef.current && !companyRef.current.contains(e.target) &&
                employeeRef.current && !employeeRef.current.contains(e.target)
            ) {
                setCompanyOpen(false);
                setEmployeeOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>

                    {/* Company dropdown */}
                    <li ref={companyRef} className={styles.dropdown}>
                        <button
                            onClick={() => {
                                setCompanyOpen(prev => !prev);
                                setEmployeeOpen(false);
                            }}
                            className={styles.dropdownToggle}
                        >
                            Company ▾
                        </button>

                        {isCompanyOpen && (
                            <ul className={styles.dropdownMenu}>
                                {isLoggedIn ? (
                                    <>
                                        <li><Link href='/companys'>Company</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href='/companys/register'>Register</Link></li>
                                        <li><Link href='/companys/login'>Login</Link></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </li>

                    {/* Employee dropdown */}
                    <li ref={employeeRef} className={styles.dropdown}>
                        <button
                            onClick={() => {
                                setEmployeeOpen(prev => !prev);
                                setCompanyOpen(false);
                            }}
                            className={styles.dropdownToggle}
                        >
                            Employee ▾
                        </button>

                        {isEmployeeOpen && (
                            <ul className={styles.dropdownMenu}>
                                {isLoggedIn ? (
                                    <>
                                        <li><Link href='/employees'>Employee</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href='/employee'>Register</Link></li>
                                        <li><Link href='/employees/login'>Login</Link></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
