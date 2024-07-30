export function formatDate(input) {
    if(input){
        // Split the input string to get year and month
        let [year, month] = input.split('-');
        
        // Convert the month number to the month name
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        let monthName = monthNames[parseInt(month, 10) - 1];
        
        // Construct and return the final output string
        return `${monthName} ${year}`;
    }else{
        return 'No date';
    }
}

function getBrightness(color) {
    let r, g, b;
    if (color.startsWith('#')) {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
    } else if (color.startsWith('rgb')) {
        let rgb = color.match(/\d+/g);
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);
    }

    return (0.299 * r + 0.587 * g + 0.114 * b);
}

function getTextColorBasedOnBgColor(bgColor) {
    // Calculate brightness
    let brightness = getBrightness(bgColor);

    // Return black or white based on brightness
    return brightness > 80 ? 'black' : 'white';
}

export function applyTextColor(bgColor) {

    // Get appropriate text color
    let textColor = getTextColorBasedOnBgColor(bgColor);

    // Apply the text color
    return textColor;
}