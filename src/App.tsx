import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import PdfBuilder from "./pages/pdfbuilder";
import TextPdfEdior from "./pages/textPdfEditor";

pdfMake.vfs = pdfFonts.vfs;

function App() {
	// return (
	// 	<>
	// 		<PdfBuilder />
	// 	</>
	// );
	return <TextPdfEdior />;
}

export default App;
