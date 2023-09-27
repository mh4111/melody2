"use client"

import Link from "next/link";
import ClientComponent from "../components/ClientComponent";

const Home = () => {
    return (
        <div>
            <h1>Server Component</h1>
            <ClientComponent />
            <h1> <Link href="/login"> test </Link></h1>
            <h1> <Link href="/album"> album </Link></h1>
            <h1> <Link href="/solo"> solo </Link></h1>
            <h1> <Link href="/group"> group </Link></h1>
            <h1> <Link href="/song"> song </Link></h1>
            <h1> <Link href="/songTest"> songTest </Link></h1>
        </div>
    );
};

export default Home;