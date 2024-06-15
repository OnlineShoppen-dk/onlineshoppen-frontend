function dateConverter(date: string, type: string){
    const dateObj = new Date(date);
    switch(type){
        case 'date':
            return dateObj.toLocaleDateString('da-DK');
        case 'time':
            return dateObj.toISOString();
        default:
            return dateObj.toISOString();
    }
}

export default dateConverter;