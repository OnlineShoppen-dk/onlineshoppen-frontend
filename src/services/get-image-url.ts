function getImageUrl(fileName: string){
    const baseUrl = 'http://localhost:8081/Image/';
    return `${baseUrl}${fileName}`;
}

export default getImageUrl;