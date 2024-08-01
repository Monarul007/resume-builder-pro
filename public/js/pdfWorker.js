importScripts('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');

self.addEventListener('message', async (event) => {
    const { formData, content } = event.data;

    const opt = {
        margin: 0,
        padding: [0],
        filename: `${formData?.title}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            dpi: 192, scale: 4, letterRendering: true, useCORS: true, scrollY: 0, scrollX: 0, allowTaint: true, logging: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait", putTotalPages: true },
    };

    try {
        const pdf = await html2pdf().set(opt).from(content).toPdf().get('pdf');
        const pdfBlob = pdf.output('blob');

        const pdfUrl = URL.createObjectURL(pdfBlob);
        self.postMessage({ success: true, pdfUrl });
    } catch (error) {
        console.error('Error generating PDF:', error);
        self.postMessage({ success: false, error: error.message });
    }
});