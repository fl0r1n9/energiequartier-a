import Link from "next/link";

export default function Nav() {
    // top navigation bar
    return (<div style={{
            display: "flex",
            height: "68px",
            borderRadius: "20px",
            justifyContent: "center",
            backgroundColor: "white",
            marginTop: "20px",
            marginBottom: "20px"
        }}>
            <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                <div style={{display: "flex", alignItems: "flex-start", width: "100%", marginLeft: "10px"}}>
                    <Link href="/">
                        <button style={{
                            border: "none",
                            borderRadius: "15px",
                            backgroundColor: "rgb(239,246,255)",
                            color: "rgb(59,130,246)",
                            height: "44px",
                            fontWeight: "bold",
                            width: "100px",
                            fontFamily: "Arial Black",
                            cursor:"pointer"
                        }}>Home
                        </button>
                    </Link>
                </div>
                <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
                    <p style={{
                        justifyContent: "center",
                        color: "rgb(20,120,211)",
                        fontSize: "18px",
                        fontWeight: "bold",
                        fontFamily: "Arial Black"
                    }}>energie</p>
                    <p style={{
                        justifyContent: "center",
                        color: "rgb(0)",
                        fontSize: "18px",
                        fontWeight: "bold",
                        fontFamily: "Arial Black"
                    }}>quartier</p>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginRight: "10px"
                }}>
                    <Link href="/editor">
                        <button style={{
                            border: "1px dotted",
                            borderRadius: "15px",
                            backgroundColor: "rgb(59,130,246)",
                            color: "white",
                            height: "44px",
                            width: "100px",
                            fontWeight: "bold",
                            fontFamily: "Arial Black",
                            cursor:"pointer"
                        }}>Editor
                        </button>
                    </Link>
                </div>
            </div>
        </div>)
}