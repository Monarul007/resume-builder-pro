import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './Sample.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};
const maxWidth = 800;

const App = () => {
  const methods = useForm({ defaultValues: defaultData });
  const [formData, setFormData] = useState(methods.getValues());
  const previewRef = useRef();

  const [file, setFile] = useState('./sample.pdf');
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  // const handleGeneratePDF = async () => {
  //   const element = previewRef.current;
  //   if (element) {

  //     const opt = {
  //       margin: 0,
  //       padding: [0],
  //       filename: `${userData?.title}.pdf`,
  //       image: { type: 'jpeg', quality: 1 },
  //       html2canvas: { dpi: 192, scale:4, letterRendering: true, useCORS: true, scrollY: -window.scrollY, scrollX: 0, allowTaint: true, logging: true},
  //       jsPDF: { unit: "mm", format: "a4", orientation: "portrait", putTotalPages: true },
  //     };

  //     try {
  //       const pdf = await html2pdf().set(opt).from(element).toPdf().get('pdf');

  //       const pdfBlob = pdf.output('blob');

  //       const pdfDoc = await pdfjs.getDocument(URL.createObjectURL(pdfBlob)).promise;
  //       const numPages = pdfDoc.numPages;
  //       await setNumberOfPages(numPages);

  //       const imagePromises = [];
  //       for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
  //         imagePromises.push(renderPageToImage(pdfDoc, pageNumber));
  //       }

  //       const images = await Promise.all(imagePromises);
  //       setImages(images);
  //     } catch (error) {
  //       console.error('Error generating PDF:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

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
      </FormProvider>

      <div className="w-2/3 p-4 border-l-2 border-gray-200">
        <div ref={previewRef}>
          {/* <Resume2 userData={formData} numberOfPages={2} /> */}
          <div className="Example">
            <header>
              <h1>react-pdf sample page</h1>
            </header>
            <div className="Example__container">
              <div className="Example__container__load">
                <label htmlFor="file">Load from file:</label>{' '}
                <input onChange={onFileChange} type="file" />
              </div>
              <div className="Example__container__document" ref={setContainerRef}>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                    />
                  ))}
                </Document>
              </div>
            </div>
          </div>
        </div>
        {/* <button
          onClick={handleGeneratePDF}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Download as PDF
        </button> */}
      </div>
    </div>
  );
};

export default App;
