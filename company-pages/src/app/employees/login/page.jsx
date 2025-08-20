
import styles from '@/app/globals.css';
import EmployeeLogin from '@/components/employee/Login';




export default function EmpolyeesLoginPage() {
    return (
        <div className={styles.page}>
            <h1>Employees</h1>
            <EmployeeLogin />
        </div>
    )
}