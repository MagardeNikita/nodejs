var fs=require("fs");
const readline = require('readline');
//require("colors");

/*---------------------------creating frst json file------------------------------*/
var output=fs.createWriteStream('result.json');
output.readable=true;
output.writable=true;

/*---------------------------creating frst json file------------------------------*/
var output1=fs.createWriteStream('result1.json');
output1.readable=true;
output1.writable=true;


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
	  var arr=[];


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
  var obj1={};
  //console.log(line1[2]);
  for(var k=0;k<Asian_C.length;k++)
  {
    if(line1[countryIndex]===Asian_C[k])
    {
      if((line1[yearIndex]>=1960)&&(line1[yearIndex]<=2015))
      {

/*---------------------------for male and female expectancy------------------------------*/
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
         
          }
        }



    }
  }

}




 for(var k=0;k<Asian_C.length;k++)
  {
    if(line1[countryIndex]===Asian_C[k])
    {
      if((line1[yearIndex]>=1960)&&(line1[yearIndex]<=2015))
      {


        if((line1[IndicatorNameIndex]==="Life expectancy at birth, total (years)"))
         {

           for(var j=0;j<coloumnamearray.length;j++)
            {
              obj1[coloumnamearray[j]]=line1[j];
            }
            arr.push(obj1);
           


      }
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
  
  
  
   var arr1=[];
for (var i = 0; i < Asian_C.length; i++) {

  var cname=Asian_C[i];
  var count2=0;
  var count3=0;
  //console.log(arr.length);
  for (var k = 0; k < arr.length; k++) {

    //console.log("nik");
    if(cname===(arr[k].CountryName))
    {
      console.log("hello");
      count2 += parseFloat(arr[k].Value);
      count3++;
      console.log(count2);
    //  count3=count3+1;
  }

    
  }
  
  arr1.push({"countryName":cname,"total":parseFloat(count2)/count3});
  //console.log(arr[0].CountryName);

  //console.log(count3);

} 
//var arr2=JSON.stringify(arr1);
//var arr3=[];
arr1.sort(function(obj1, obj2) {
	// Ascending: first age less than the previous
	return obj2.total - obj1.total;
});
var arr2=[];
for(var i=0;i<5;i++)
{
	arr2[i]=arr1[i];
}
 // output1.write(JSON.stringify(arr1));
 output1.write(JSON.stringify(arr2));




});

  
  
  
  
  
  
  
  //console.log(finalarray);
//  output.write("]");
//  output1.write("]");
  //process.exit(0);


/*---------------------------this will print frst on the console bcos rl.online is a asyn funcion..so we
cant hold the data which we retrieved inside the rl.on fn..thatswhy performing evry operation der only
retreiving and symultaneously writing to json file------------------------------*/
