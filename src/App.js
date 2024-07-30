import React, { useState, useEffect, useRef } from 'react';
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

const App = () => {
  const methods = useForm({ defaultValues: defaultData });
  const [formData, setFormData] = useState(methods.getValues());
  const previewRef = useRef();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleGeneratePDF = async () => {
    const element = previewRef.current;
    const a4Width = 210;
    const a4Height = 297;
    const scale = 2; // Increase if needed

    const canvas = await html2canvas(element, { scale });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = a4Width;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const totalPages = Math.ceil(pdfHeight / a4Height);

    for (let i = 0; i < totalPages; i++) {
      const pageHeight = a4Height * i;
      const srcImg = canvas;
      const sX = 0;
      const sY = pageHeight;
      const sWidth = canvas.width;
      const sHeight = a4Height * scale;
      const dX = 0;
      const dY = 0;
      const dWidth = pdfWidth;
      const dHeight = a4Height;

      const singlePageCanvas = document.createElement('canvas');
      singlePageCanvas.setAttribute('width', `${sWidth}`);
      singlePageCanvas.setAttribute('height', `${sHeight}`);
      const ctx = singlePageCanvas.getContext('2d');
      ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      const singlePageDataURL = singlePageCanvas.toDataURL('image/png');
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(singlePageDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save('resume.pdf');
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
      </FormProvider>

      <div className="w-1/2 p-4 border-l-2 border-gray-200">
        <div ref={previewRef}>
          <Resume2 userData={formData} numberOfPages={2} />
        </div>
        <button
          onClick={handleGeneratePDF}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default App;
