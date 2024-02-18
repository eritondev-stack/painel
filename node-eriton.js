var XLSX = require('xlsx')

function readXSLX() {

    const workbookRead = XLSX.readFile("/Users/eriton/Documents/Estudo IA.xlsx")

    console.log("***************** Inicio do comando ******************")
    const sheetName = 'Data' //workbook.SheetNames[0];
    const worksheet = workbookRead.Sheets[sheetName];
    //const range = XLSX.utils.decode_range(worksheet['!ref']);
    //const totalRows = (range.e.r);
    //console.log(totalRows) // Total rows
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);
    //AddValues 
    //Array.from({ length: 500}).forEach(() => {
    //    sheetValues.push({ Time: '2023.02.09 15:05', Open: 108855, Symbol: 'TOTS3F' },)
    //})
    let obj = {}
    for (let index = 0; index < 10; index++) {
        obj = {
            ...obj,
            ['candle_' + index]: index
        }  
    }

    console.log(sheetValues)
    console.log(obj)
    //const newValues = XLSX.utils.json_to_sheet(sheetValues);  
    //workbookRead.Sheets[sheetName] = newValues
    //XLSX.writeFile(workbookRead,"/Users/eriton/Documents/Estudo IA.xlsx")

}
readXSLX()