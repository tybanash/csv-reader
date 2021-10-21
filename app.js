/**
 * @author Nadege Awah
 * 
 * /
/**
 * @constant csv 
 * @type {string}
 * variable used to load the csv-parser module
 */
 const csv = require('csv-parser');
 /**
  *  @constant fs 
  * @type {string}
  * variable used to create a file stream
  */
 const fs = require('fs');
 
 /**
  * @type {string[]} data results
  * array used to store the objects from the csv file
  */
 var dataResults = [];
 
 /**
  * This function  uses the fs and csv-parser modules to read data in a csv file.
  * The data is stored in an array
  * the first 100 rows are printed on the console
  * This try and catch is used to handle exceptions if the file path is not found, it catches the exception
  * and displays an error message on the screen 
  */
 function readCSV(){
    try{
        //opens up a readable stream to read the csv file
        fs.createReadStream('vaccination-coverage-byVaccineType.csv') 
        //pipes data into the ReadStream passing column headers as strings
        .pipe(csv('pruid', 'prename', 'prfname', 'week_end', 'product_name', 'numtotal_atleast1dose', 'numtotal_partially', 'numtotal_fully', 'prop_atleast1dose', 'prop_partially, prop_fully', 'numweekdelta_atleast1dose', 'numweekdelta_fully', 'propweekdelta_partially', 'propweekdelta_fully'))
        //returns each row in the file and the call back function is used to add the data to the end of the dataResults array 
        .on('data', (data) => dataResults.push(data))
        //listens for the end of the csv file
        .on('end', () => {
        //loops over the array and prints the data on screen
        var first100 = dataResults.slice(0, 100);
        for(var i =0; i<first100.length; i++){
         console.log("Program by Nadege Awah")
         console.log(first100);
        }
     
    });
    }
    catch(error) {
 
       console.log('File not found!');
    }
 
}
 
/**
 * 
 * @class VaccineCoverage represents the model of our application. 
 * This class has a constructor whose arguements are the the column names in the csv file.
 * the getters and setter methods will be used when creating new objects. 
 */
class VaccineCoverage { 
    //stores the column names as parameters in an overloaded constructor
    /**
     * 
     * @param {*} pruid 
     * @param {*} prename 
     * @param {*} prfname 
     * @param {*} week_end 
     * @param {*} product_name 
     * @param {*} numtotal_atleast1dose 
     * @param {*} numtotal_partially 
     * @param {*} prop_atleast1dose 
     * @param {*} prop_partially 
     * @param {*} prop_fully 
     */
    constructor (pruid, prename, prfname, week_end, product_name, numtotal_atleast1dose, numtotal_partially, numtotal_fully, prop_atleast1dose, prop_partially, prop_fully, numweekdelta_atleast1dose, numweekdelta_fully,propweekdelta_partially, propweekdelta_fully) {
   /** @type {string} */
        this.pruid = pruid;
        this.prename = prename;
        this.prfname = prfname;
        this.week_end = week_end;
        this.product_name = product_name;
        this.numtotal_atleast1dose = numtotal_atleast1dose;
        this.numtotal_partially = numtotal_partially;
        this.numtotal_fully = numtotal_fully;
        this.prop_atleast1dose = prop_atleast1dose;
        this.prop_partially = prop_partially;
        this.prop_fully = prop_fully;
        this.numweekdelta_atleast1dose = numweekdelta_atleast1dose;
        this.numweekdelta_fully = numweekdelta_fully;
        this.propweekdelta_partially = propweekdelta_partially;
        this.propweekdelta_fully = propweekdelta_fully;
    }
}

readCSV();
