
const TELEGRAM_COLORS = [
    '#FFAD46', '#FF6F61', '#9C27B0', '#673AB7', 
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', 
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
    '#FFC107', '#FF9800', '#FF5722', '#795548', 
    '#607D8B'
];
function getColorForName(name:string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % TELEGRAM_COLORS.length;
    return TELEGRAM_COLORS[index];
}

export function generateAvatar(canvas:HTMLCanvasElement,name:string) {
    const context = canvas.getContext('2d');
    if(!context) return
    const color = getColorForName(name)
    // Set background color
    context.fillStyle = color; // Example color
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw text
    context.fillStyle = "#FFFF";
    context.font = 'bold 20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Get initials from the name
    const initials = name.split(' ').filter((_,index)=> index < 2).map(word => word[0]).join('').toUpperCase();
    context.fillText(initials, canvas.width / 2, canvas.height / 2);
}
