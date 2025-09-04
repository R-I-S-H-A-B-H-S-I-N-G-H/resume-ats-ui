import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import PdfResumeEditor from "./pages/pdfbuilder";

pdfMake.vfs = pdfFonts.vfs;

function App() {
	return <PdfResumeEditor />;
}

export default App;
