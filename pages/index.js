import React from "react";
import styles from "../styles/Home.module.css"
import Head from "next/head";
import DataTable from "@/components/DataTable";


export default function Home() {

    return (
        <div className="homeStyle">
            <Head>
                <title>Energiequartier</title>
            </Head>
            <DataTable/>
        </div>
    )
}

