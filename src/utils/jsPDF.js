
import { jsPDF } from 'jspdf';


 const generatePDF = async (props) =>
{


  //create a jsPDF isntance

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();



  //join recipe instructions back into a string so easier to work with in jsPDF

  // let recipeIngredients = props.ingredients.join(',');


  let recipeIngredients = props.ingredients;

  //remove line breaks

  recipeIngredients = recipeIngredients.split('\n').join('');

  //remove spaces

  recipeIngredients = recipeIngredients.split(', ').join(',');
  
  //add an extra space after comma

  recipeIngredients = recipeIngredients.split(',').join(', ');


  
  const text = [props.name, '\n', "ingredients: " + recipeIngredients, '\n', "instructions: " + props.instructions, '\n'];

  // const text = recipeIngredients.split(',');

  // const text = "i am text".repeat(900);

  console.log(text);

  const fontSize = 18;

  pdf.setFontSize(fontSize);

  pdf.setFont("helvetica", "regular"); // 'normal', 'bold', 'italic', 'bolditalic'

  const margin = 40;

  const pdfMarginAdjust = pdfWidth - margin;

  const lines = pdf.splitTextToSize(text, pdfMarginAdjust);

  const lineHeight = fontSize + 2;

  let currentY = lineHeight;

  for (let line of lines)
  {

    if (currentY + lineHeight > pdfHeight)
    {
      pdf.addPage(); //add a new page

      currentY = lineHeight; //reset Y to top of page

    }

    pdf.text(line, lineHeight, currentY,
      {
        maxWidth: pdfMarginAdjust,
      }
    ); //add the text at 10, currentY
    currentY += lineHeight;
  }

  //display page numbers 

  let totalPages = pdf.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++)
  {
    pdf.setPage(i);
    pdf.text(`Page ${i} of ${totalPages}`, pdfWidth * 0.5, pdfHeight - 10, { align: "center" }); //display page number

  }

  //save the pdf

  pdf.save((props.name + '.pdf'))

}

export default generatePDF;
