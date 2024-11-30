const formatToISO = (date: string | undefined) => {
    if (!date) return '';

    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = inputDate.getDate().toString().padStart(2, '0'); // Add leading zero if day is a single digit

    // Return formatted date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
}

const activityDateFormat = (date: string | undefined) => {
    if (!date) {
        return ''; // Return empty if the date is undefined or falsy
    }

    // Parse the input date
    const inputDate = new Date(date);
    const currentDate = new Date();

    // Calculate time differences
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7); // Date 7 days ago
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1); // Date 1 year ago

    // Check if the date is within the current week
    const isThisWeek = inputDate >= oneWeekAgo && inputDate <= currentDate;
    
    // Check if the date is older than a week but within the same year
    const isOlderThanAWeekButWithinSameYear = inputDate < oneWeekAgo && inputDate.getFullYear() === currentDate.getFullYear();

    // Check if the date is older than a year
    const isOlderThanAYear = inputDate < oneYearAgo;

    if (isThisWeek) {
        // Return the short day (e.g., 'Mon')
        return inputDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (isOlderThanAWeekButWithinSameYear) {
        // Return month and date (e.g., 'Nov 1')
        return inputDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (isOlderThanAYear) {
        // Return year, month, date, and day (e.g., '2023 Nov 1, Wed')
        return inputDate.toLocaleDateString()
    }
    
    // Default case
    return '';
}

export {
    activityDateFormat,
    formatToISO
}