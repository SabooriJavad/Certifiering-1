import Image from "next/image";
import styles from "./page.module.css"
import EmployeeForm from "@/components/employee/EmployeeForm";

export default function Home() {
  return (
    <nav className={styles.page}>
      <main className={styles.main}>
      <h1> Welcom to our Company pages</h1>
      </main>
    
    </nav>
  );
}
