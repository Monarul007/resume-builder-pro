import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PersonalDetails from './components/PersonalDetails';
import ProfessionalSummary from './components/ProfessionalSummary';
import EmploymentHistory from './components/EmploymentHistory';
import Education from './components/Education';
import Expertises from './components/Expertises';
import References from './components/References';
import Languages from './components/Languages';
// Import other components as needed
import defaultData from "./data.json";
import Resume2 from './components/templates/Resume2';
import "./App.css"
import html2pdf from 'html2pdf.js';
import { pdfjs } from "react-pdf";
import { PiCheck, PiSpinner } from 'react-icons/pi';
import { debounce } from 'lodash';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DEBOUNCE_FORM_DELAY_MS = 1000;

const App = () => {
  const methods = useForm({ defaultValues: defaultData });
  const [formData, setFormData] = useState(methods.getValues());

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [pdfString, setPdfString] = useState("");

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setFormData(value);
      debouncedGeneratePDF(value)
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const debouncedGeneratePDF = useCallback(
    debounce((newFormData) => {
      if (window.Worker) {

        setLoading(true);
        // Use the correct path to the Web Worker script
        const worker = new Worker('/js/pdfWorker.js');
        worker.postMessage({ formData: newFormData });
        worker.onmessage = async (event) => {
          const { success, processedData, error } = event.data;
          if (success) {
            // Now we handle the PDF generation in the main thread using processedData
            const content = document.getElementById('pdf-content').innerHTML;

            const opt = {
              margin: 0,
              padding: [0],
              filename: `${processedData?.title}.pdf`,
              image: { type: 'jpeg', quality: 1 },
              html2canvas: {
                dpi: 192, scale: 4, letterRendering: true, useCORS: true, scrollY: -window.scrollY, scrollX: 0, allowTaint: true, logging: true,
              },
              jsPDF: { unit: "mm", format: "a4", orientation: "portrait", putTotalPages: true },
            };

            try {
              var pdfworker = await html2pdf().set(opt).from(content).toPdf().get('pdf');
              const pdfBlob = pdfworker.output('blob');

              const pdfUrl = URL.createObjectURL(pdfBlob);
              console.log('PDF generated successfully:', pdfUrl);
              // Handle the generated PDF URL, e.g., display it in the UI

              const pdfDoc = await pdfjs.getDocument(URL.createObjectURL(pdfBlob)).promise;
              const numPages = pdfDoc.numPages;

              const imagePromises = [];
              for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                imagePromises.push(renderPageToImage(pdfDoc, pageNumber));
              }

              const images = await Promise.all(imagePromises);
              setImages(images);
              setLoading(false);
            } catch (error) {
              console.error('Error generating PDF:', error);
            }
          } else {
            console.error('Error processing data:', error);
          }

          worker.terminate(); // Terminate the worker after processing
        };
      }
    }, DEBOUNCE_FORM_DELAY_MS),
    []
  );


  const renderPageToImage = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    context.save();
    context.font = 'bold 11rem Arial';
    context.fillStyle = 'rgba(150, 150, 150, 0.3)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((-50 * Math.PI) / 180);
    context.fillText('PREVIEW', 100, 0);
    context.restore();

    return canvas.toDataURL('image/jpeg');
  };

  const handleNext = () => {
    if (currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => console.log(data))} className="w-1/2 p-4">
          {formData.sections.filter(section => section.status === 1).map(section => {
            switch (section.type) {
              case 'personal':
                return <PersonalDetails key={section.id} />;
              case 'profile':
                return <ProfessionalSummary key={section.id} />;
              case 'experience':
                return <EmploymentHistory key={section.id} />;
              case 'education':
                return <Education key={section.id} />;
              case 'expertise':
                return <Expertises key={section.id} />;
              case 'reference':
                return <References key={section.id} />;
              case 'language':
                return <Languages key={section.id} />;
              default:
                return null;
            }
          })}
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
        </form>

        <div className="sticky top-0 h-screen max-h-screen w-2/3 p-4 border-l-2 border-gray-200">
          <div id="pdf-content" className="hidden">
            <Resume2 userData={formData} numberOfPages={2} />
          </div>
          <div className="Example relative">
            <div className="grid grid-cols-1 gap-4 mx-auto">
              {images.length > 0 && (
                <img src={images[currentPage]} alt={`PDF page ${currentPage + 1}`} className="max-h-[492px] object-contain mx-auto border" />
              )}
            </div>
            <div className="flex justify-center items-center py-4 max-w-[560px] mx-auto">
              <div>
                <button disabled={true} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                  {loading ? (<div className='flex items-center gap-1'>
                    <PiSpinner className='animate-spin' />
                    Saving...
                  </div>) : (<div className='flex items-center gap-1'>
                    <PiCheck />
                    Saved
                  </div>)}
                </button>
              </div>
              <div>
                <button type="button" className={`text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 ${currentPage === 0 && 'bg-[#050708]/90 dark:bg-[#050708]/30'}`} disabled={currentPage === 0} onClick={handlePrev}>
                  Previous Page
                </button>
                {"  "}
                <button type="button" className={`text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 ${currentPage === images.length - 1 && 'bg-[#050708]/90 dark:bg-[#050708]/30'}`} disabled={currentPage === images.length - 1} onClick={handleNext}>
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default App;
