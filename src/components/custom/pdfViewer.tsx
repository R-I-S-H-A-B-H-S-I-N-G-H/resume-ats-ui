export default function PdfViewer({ pdfUrl }: { pdfUrl?: string }) {
    return (
        <>
            {pdfUrl ? (
                <iframe src={pdfUrl + "#toolbar=0&navpanes=0"} className="w-full h-full border-none" />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">Generating PDF…</div>
            )}
        </>
    );
}
