import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import PdfBuilder from "./pages/pdfbuilder";

pdfMake.vfs = pdfFonts.vfs;

function App() {
  return <><PdfBuilder/></>
}

export default App;
