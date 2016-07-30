var fs=require("fs");
const readline = require('readline');
//require("colors");

/*---------------------------creating frst json file------------------------------*/
var output=fs.createWriteStream('result.json');
output.readable=true;
output.writable=true;

/*---------------------------creating frst json file------------------------------*/



console.log("magarde");
  const rl = readline.createInterface({
    input: fs.createReadStream('Indicators.csv')


  });


var Asian_C = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];

//var topFive_C=["China","India","Indonesia","Pakistan","Bangladesh"];
var countryIndex,IndicatorNameIndex,yearIndex;
var coloumnamearray=[];
var finalarray=[];
    var i=0;
   
   
      var brr=[];


    /*---------------------------function foe reading line by line------------------------------*/
  rl.on('line', function (line) {

  /*---------------------------for frst line----------------------------------------------------*/
  if(i===0)
  {

    coloumnamearray=line.split(",");
     countryIndex=coloumnamearray.indexOf("CountryName");
     IndicatorNameIndex=coloumnamearray.indexOf("IndicatorName");
     yearIndex=coloumnamearray.indexOf("Year");
    console.log(countryIndex);
    console.log(IndicatorNameIndex);
    console.log(yearIndex);


    i=i+1;
/*---------------------------writing into files------------------------------*/
  
  }
  /*---------------------------for rest of the lines in the file------------------------------*/
  else {
    var line1=[];

    var lineInfo=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

  /*--for Each loop for traversing array which is replacing / with space and storing in new array--*/
    lineInfo.forEach(function(string)
     {
     //console.log(("string --- > "+ string).blue);
     line1.push(string.replace(/['"]+/g, ''));
     //console.log(("line ---> "+ line).red);
    });

/*---------------------------main logic for conditions------------------------------*/
 var obj={};
  //  var obj1={};
  //console.log(line1[2]);
  for(var k=0;k<Asian_C.length;k++)
  {
    if(line1[countryIndex]===Asian_C[k])
    {
      if((line1[yearIndex]>=1960)&&(line1[yearIndex]<=2015))
      {

/*---------------------------for total expectancy------------------------------*/
        if((line1[IndicatorNameIndex]==="Life expectancy at birth, male (years)")||(line1[IndicatorNameIndex]==="Life expectancy at birth, female (years)"))
        {
          if((line1[yearIndex]>=1960)&&(lineInfo[yearIndex]<=2015))
          {
            for(var j=0;j<coloumnamearray.length;j++)
            {
              if(j<4)
              {
              j=4;
              }

            obj[coloumnamearray[j]]=line1[j];

            }
            brr.push(obj);
          //  var data=JSON.stringify(obj);

           // console.log(obj);
          }
        }

/*---------------------------for male and femal expectancy------------------------------*/

    }
  }

}

  }
}

).on('close', () => {
  var brr1=[];
  //console.log(brr);
  for(var p=1960;p<2014;p++)
  {
	  var female=0;var male=0;var f=0; 
		 var m=0;
	for (var i = 0; i < brr.length; i++) {
		
	  if(parseFloat(brr[i].Year)===p)
	  {
		  console.log("matching");
		 
		  if(i%2==0)
    {  
         //console.log(brr[i].Value);
      female+=parseFloat(brr[i].Value);
	  //console.log(parseFloat(brr[i].Value)+"-----------");
	  //console.log(female);
	  f++;
	  

    }
    else {
		
      male+=parseFloat(brr[i].Value);
	  m++;
	  
    }
	  }
   
    
  }  
  //console.log(female);
   brr1.push({"year":p,"female":parseFloat(female)/f,"male":parseFloat(male)/m});
  }
  
 
  output.write(JSON.stringify(brr1));
  //console.log(finalarray);
//  output.write("]");
//  output1.write("]");
  //process.exit(0);
});

/*---------------------------this will print frst on the console bcos rl.online is a asyn funcion..so we
cant hold the data which we retrieved inside the rl.on fn..thatswhy performing evry operation der only
retreiving and symultaneously writing to json file------------------------------*/
