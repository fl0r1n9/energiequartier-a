import Link from "next/link";
import styles from "../styles/Home.module.css"
import Head from "next/head";
import Nav from "components/Nav"
import DataTable from "@/components/DataTable";

export default function Home() {
    return (
        <div className={styles.homePageTitle}>
            <Head>
                <title>Energiequartier</title>
            </Head>
            <DataTable/>
        </div>
    )
}

