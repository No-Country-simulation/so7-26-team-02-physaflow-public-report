"use client"

export default function DownloadChartButton(){
    const handleDownload = () => {
        console.log("Descargado")
    }

    return(
        <button onClick={handleDownload}>
            Download
        </button>
    )
} 