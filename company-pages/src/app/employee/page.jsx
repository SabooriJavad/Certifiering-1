import EmployeeForm from "@/components/employee/EmployeeForm";
import styles from "@/app/globals.css"



export default function EmployeeFormPage() {
    return (
        <div className={styles.page}>
            <h1> Register </h1>
            <EmployeeForm />


        </div>
    )
}