import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  dataPromise : any;
  options : any;
  onSelect : any;
  dataMap : any;
  constructor() {
  	this.dataMap = {};
  	let loadData = function(_data){
  		return new Promise(function(resolve,reject){
  			resolve(_data);
  		});
  	}
  	
  	let LINE_DATA = [
		["Year", "Sales", "Expenses"],
		["2004",  1000,      400],
		["2005",  1170,      460],
		["2006",  660,       1120],
		["2007",  1030,      540]
	];
	let LINE_OPTION = {
		title: 'Company Performance',
		curveType: 'function',
		legend: { position: 'bottom' },
		pointsVisible : true,
		animation:{
			duration: 1000,
			easing: 'out'
		}
	};

	let SCATTER_DATA = [
      ['Age', 'Weight'],
      [ 8,      12],
      [ 4,      5.5],
      [ 11,     14],
      [ 4,      5],
      [ 3,      3.5],
      [ 6.5,    7]
    ];

    let SCATTER_OPTIONS = {
      title: 'Age vs. Weight comparison',
      hAxis: {title: 'Age', minValue: 0, maxValue: 15},
      vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
      legend: 'none'
    };

    let AREA_DATA = [
          ['Year', 'Sales', 'Expenses'],
          ['2013',  1000,      400],
          ['2014',  1170,      460],
          ['2015',  660,       1120],
          ['2016',  1030,      540]
        ];
  let AREA_OPTIONS = {
          title: 'Company Performance',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };
  //AreaChart

  let BAR_DATA =[
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ];
  let BAR_OPTIONS = {
        title: 'Population of Largest U.S. Cities',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Total Population',
          minValue: 0,
          textStyle: {
            bold: true,
            fontSize: 12,
            color: '#4d4d4d'
          },
          titleTextStyle: {
            bold: true,
            fontSize: 18,
            color: '#4d4d4d'
          }
        },
        vAxis: {
          title: 'City',
          textStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
          },
          titleTextStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
          }
        }
      };

    //BarChart

  let BUBBLE_DATA = [
        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
        ['CAN',    80.66,              1.67,      'North America',  33739900],
        ['DEU',    79.84,              1.36,      'Europe',         81902307],
        ['DNK',    78.6,               1.84,      'Europe',         5523095],
        ['EGY',    72.73,              2.78,      'Middle East',    79716203],
        ['GBR',    80.05,              2,         'Europe',         61801570],
        ['IRN',    72.49,              1.7,       'Middle East',    73137148],
        ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
        ['ISR',    81.55,              2.96,      'Middle East',    7485600],
        ['RUS',    68.6,               1.54,      'Europe',         141850000],
        ['USA',    78.09,              2.05,      'North America',  307007000]
      ];


  let BUBBLE_OPTIONS = {
        title: 'Correlation between life expectancy, fertility rate ' +
               'and population of some world countries (2010)',
        hAxis: {title: 'Life Expectancy'},
        vAxis: {title: 'Fertility Rate'},
        bubble: {textStyle: {fontSize: 11}}
      };

  //BubbleChart

  let CALENDAR_DATA = [
          ["Date","Won/Loss"],
          [ new Date(2012, 3, 13), 37032 ],
          [ new Date(2012, 3, 14), 38024 ],
          [ new Date(2012, 3, 15), 38024 ],
          [ new Date(2012, 3, 16), 38108 ],
          [ new Date(2012, 3, 17), 38229 ],
          // Many rows omitted for brevity.
          [ new Date(2013, 9, 4), 38177 ],
          [ new Date(2013, 9, 5), 38705 ],
          [ new Date(2013, 9, 12), 38210 ],
          [ new Date(2013, 9, 13), 38029 ],
          [ new Date(2013, 9, 19), 38823 ],
          [ new Date(2013, 9, 23), 38345 ],
          [ new Date(2013, 9, 24), 38436 ],
          [ new Date(2013, 9, 30), 38447 ]
        ];

  let CALENDAR_OPTIONS =  {
         title: "Red Sox Attendance"
       };

  let CANDLE_DATA = [
      ['Mon', 20, 28, 38, 45],
      ['Tue', 31, 38, 55, 66],
      ['Wed', 50, 55, 77, 80],
      ['Thu', 77, 77, 66, 50],
      ['Fri', 68, 66, 22, 15]
      // Treat first row as data as well.
    ];

  let CANDLE_OPTIONS = {
      legend:'none'
    };

  let CANDLE_CONFIG = {
    firstRowAsData : true
  }
  
 let COLUMN_DATA = [
        ["Element", "Density", { role: "style" } ],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.30, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"]
      ];

  let COLUMN_OPTIONS = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
  let COMBO_DATA = [
         ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
         ['2004/05',  165,      938,         522,             998,           450,      614.6],
         ['2005/06',  135,      1120,        599,             1268,          288,      682],
         ['2006/07',  157,      1167,        587,             807,           397,      623],
         ['2007/08',  139,      1110,        615,             968,           215,      609.4],
         ['2008/09',  136,      691,         629,             1026,          366,      569.6]
      ];

  let COMBO_OPTIONS = {
      title : 'Monthly Coffee Production by Country',
      vAxis: {title: 'Cups'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    };


  let PIE_DATA = [
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ];
  let PIE_OPTIONS = {
          title: 'My Daily Activities',
          pieHole : 0.5 //Dognut Chart
        };

  function daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
    }

  let GANTT_DATA = [
        ["1","2","3","4","5","6","7"],
        ['Research', 'Find sources',
         new Date(2015, 0, 1), new Date(2015, 0, 5), null,  100,  null],
        ['Write', 'Write paper',
         null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
        ['Cite', 'Create bibliography',
         null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
        ['Complete', 'Hand in paper',
         null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
        ['Outline', 'Outline paper',
         null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
      ];
  

   let GAUGE_DATA = [
          ['Label', 'Value'],
          ['Memory', 80],
          ['CPU', 55],
          ['Network', 68]
        ];

    let GAUGE_OPTIONS = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

  let GEO_DATA = [
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700]
        ];

  let HISTOGRAM_DATA = [
          ['Dinosaur', 'Length'],
          ['Acrocanthosaurus (top-spined lizard)', 12.2],
          ['Albertosaurus (Alberta lizard)', 9.1],
          ['Allosaurus (other lizard)', 12.2],
          ['Apatosaurus (deceptive lizard)', 22.9],
          ['Archaeopteryx (ancient wing)', 0.9],
          ['Argentinosaurus (Argentina lizard)', 36.6],
          ['Baryonyx (heavy claws)', 9.1],
          ['Brachiosaurus (arm lizard)', 30.5],
          ['Ceratosaurus (horned lizard)', 6.1],
          ['Coelophysis (hollow form)', 2.7],
          ['Compsognathus (elegant jaw)', 0.9],
          ['Deinonychus (terrible claw)', 2.7],
          ['Diplodocus (double beam)', 27.1],
          ['Dromicelomimus (emu mimic)', 3.4],
          ['Gallimimus (fowl mimic)', 5.5],
          ['Mamenchisaurus (Mamenchi lizard)', 21.0],
          ['Megalosaurus (big lizard)', 7.9],
          ['Microvenator (small hunter)', 1.2],
          ['Ornithomimus (bird mimic)', 4.6],
          ['Oviraptor (egg robber)', 1.5],
          ['Plateosaurus (flat lizard)', 7.9],
          ['Sauronithoides (narrow-clawed lizard)', 2.0],
          ['Seismosaurus (tremor lizard)', 45.7],
          ['Spinosaurus (spiny lizard)', 12.2],
          ['Supersaurus (super lizard)', 30.5],
          ['Tyrannosaurus (tyrant lizard)', 15.2],
          ['Ultrasaurus (ultra lizard)', 30.5],
          ['Velociraptor (swift robber)', 1.8]];
  let HISTOGRAM_OPTIONS = {
          title: 'Lengths of dinosaurs, in meters',
          legend: { position: 'none' },
        };
  
  let MAP_DATA = [
          ['Lat', 'Long', 'Name'],
          [37.4232, -122.0853, 'Work'],
          [37.4289, -122.1697, 'University'],
          [37.6153, -122.3900, 'Airport'],
          [37.4422, -122.1731, 'Shopping']
        ];
      var url = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';
  let MAP_OPTIONS ={
          showTooltip: true,
          showInfoWindow: true
        };

   let ORG_DATA = [
          ["Name","Manager","ToolTip"],
          [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'},
           '', 'The President'],
          [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'},
           'Mike', 'VP'],
          ['Alice', 'Mike', ''],
          ['Bob', 'Jim', 'Bob Sponge'],
          ['Carol', 'Bob', '']
        ];

    let ORG_CONFIG = {
      allowHtml:true
    }


    let SANKEY_DATA = [
          ["FROM","TO","Weight"],
          [ 'A', 'X', 5 ],
          [ 'A', 'Y', 7 ],
          [ 'A', 'Z', 6 ],
          [ 'B', 'X', 2 ],
          [ 'B', 'Y', 9 ],
          [ 'B', 'Z', 4 ]
        ];

   let STEPPEDAREA_DATA = [
          ['Director (Year)',  'Rotten Tomatoes', 'IMDB'],
          ['Alfred Hitchcock (1935)', 8.4,         7.9],
          ['Ralph Thomas (1959)',     6.9,         6.5],
          ['Don Sharp (1978)',        6.5,         6.4],
          ['James Hawes (2008)',      4.4,         6.2]
        ];


   let STEPPEDAREA_OPTIONS =  {
          title: 'The decline of \'The 39 Steps\'',
          vAxis: {title: 'Accumulated Rating'},
          isStacked: true
        };

  let TABLE_DATA = [
          ["Name","Salary","Fulltime"],
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ];

  let TABLE_OPTIONS = {showRowNumber: true, width: '100%', height: '100%'};

  let TIMELINE_DATA  = [
          ["President","Start","End"],
          [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
          [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
          [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]];

  let TREEMAP_DATA = [
          ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
          ['Global',    null,                 0,                               0],
          ['America',   'Global',             0,                               0],
          ['Europe',    'Global',             0,                               0],
          ['Asia',      'Global',             0,                               0],
          ['Australia', 'Global',             0,                               0],
          ['Africa',    'Global',             0,                               0],
          ['Brazil',    'America',            11,                              10],
          ['USA',       'America',            52,                              31],
          ['Mexico',    'America',            24,                              12],
          ['Canada',    'America',            16,                              -23],
          ['France',    'Europe',             42,                              -11],
          ['Germany',   'Europe',             31,                              -2],
          ['Sweden',    'Europe',             22,                              -13],
          ['Italy',     'Europe',             17,                              4],
          ['UK',        'Europe',             21,                              -5],
          ['China',     'Asia',               36,                              4],
          ['Japan',     'Asia',               20,                              -12],
          ['India',     'Asia',               40,                              63],
          ['Laos',      'Asia',               4,                               34],
          ['Mongolia',  'Asia',               1,                               -5],
          ['Israel',    'Asia',               12,                              24],
          ['Iran',      'Asia',               18,                              13],
          ['Pakistan',  'Asia',               11,                              -52],
          ['Egypt',     'Africa',             21,                              0],
          ['S. Africa', 'Africa',             30,                              43],
          ['Sudan',     'Africa',             12,                              2],
          ['Congo',     'Africa',             10,                              12],
          ['Zaire',     'Africa',             8,                               10]
        ];

  let TREEMAP_OPTIONS = {
          minColor: '#f00',
          midColor: '#ddd',
          maxColor: '#0d0',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true
        };


   let WORDTREE_DATA =  [ ['Phrases'],
            ['cats are better than dogs'],
            ['cats eat kibble'],
            ['cats are better than hamsters'],
            ['cats are awesome'],
            ['cats are people too'],
            ['cats eat mice'],
            ['cats meowing'],
            ['cats in the cradle'],
            ['cats eat mice'],
            ['cats in the cradle lyrics'],
            ['cats eat kibble'],
            ['cats for adoption'],
            ['cats are family'],
            ['cats eat mice'],
            ['cats are better than kittens'],
            ['cats are evil'],
            ['cats are weird'],
            ['cats eat mice'],
          ];

    let WORDTREE_OPTIONS = {
          wordtree: {
            format: 'implicit',
            word: 'cats'
          }
        };

	this.dataMap['LINE_DATA'] =	loadData(LINE_DATA);			
	this.dataMap['LINE_OPTIONS'] = LINE_OPTION;
	this.dataMap['SCATTER_DATA'] =	loadData(SCATTER_DATA);			
	this.dataMap['SCATTER_OPTIONS'] = SCATTER_OPTIONS;

  this.dataMap['AREA_DATA'] =  loadData(AREA_DATA);      
  this.dataMap['AREA_OPTIONS'] = AREA_OPTIONS;

  this.dataMap['BAR_DATA'] =  loadData(BAR_DATA);      
  this.dataMap['BAR_OPTIONS'] = BAR_OPTIONS;

  this.dataMap['BUBBLE_DATA'] =  loadData(BUBBLE_DATA);      
  this.dataMap['BUBBLE_OPTIONS'] = BUBBLE_OPTIONS;

  this.dataMap['CALENDAR_DATA'] =  loadData(CALENDAR_DATA);      
  this.dataMap['CALENDAR_OPTIONS'] = CALENDAR_OPTIONS;

  this.dataMap['CANDLE_DATA'] =  loadData(CANDLE_DATA);      
  this.dataMap['CANDLE_OPTIONS'] = CANDLE_OPTIONS;
  this.dataMap['CANDLE_CONFIG'] = CANDLE_CONFIG;

  this.dataMap['COLUMN_DATA'] =  loadData(COLUMN_DATA);      
  this.dataMap['COLUMN_OPTIONS'] = COLUMN_OPTIONS;

  this.dataMap['COMBO_DATA'] =  loadData(COMBO_DATA);      
  this.dataMap['COMBO_OPTIONS'] = COMBO_OPTIONS;

  this.dataMap['PIE_DATA'] =  loadData(PIE_DATA);
  this.dataMap['PIE_OPTIONS'] = PIE_OPTIONS;

  this.dataMap['GANTT_DATA'] =  loadData(GANTT_DATA);

  this.dataMap['GAUGE_DATA'] =  loadData(GAUGE_DATA);
  this.dataMap['GAUGE_OPTIONS'] = GAUGE_OPTIONS;

  this.dataMap['GEO_DATA'] =  loadData(GEO_DATA);

  this.dataMap['HISTOGRAM_DATA'] =  loadData(HISTOGRAM_DATA);
  this.dataMap['HISTOGRAM_OPTIONS'] = HISTOGRAM_OPTIONS;

  this.dataMap['MAP_DATA'] =  loadData(MAP_DATA);
  this.dataMap['MAP_OPTIONS'] = MAP_OPTIONS;

  this.dataMap['ORG_DATA'] =  loadData(ORG_DATA);
  this.dataMap['ORG_OPTIONS'] =  ORG_CONFIG;

  this.dataMap['SANKEY_DATA'] =  loadData(SANKEY_DATA);

  this.dataMap['STEPPEDAREA_DATA'] =  loadData(STEPPEDAREA_DATA);
  this.dataMap['STEPPEDAREA_OPTIONS'] =  STEPPEDAREA_OPTIONS;

  this.dataMap['TABLE_DATA'] =  loadData(TABLE_DATA);
  this.dataMap['TABLE_OPTIONS'] =  TABLE_OPTIONS;

  this.dataMap['TIMELINE_DATA'] =  loadData(TIMELINE_DATA);

  this.dataMap['TREEMAP_DATA'] =  loadData(TREEMAP_DATA);
  this.dataMap['TREEMAP_OPTIONS'] =  TREEMAP_OPTIONS;

  this.dataMap['WORDTREE_DATA'] =  loadData(WORDTREE_DATA);
  this.dataMap['WORDTREE_OPTIONS'] =  WORDTREE_OPTIONS;

  }

  ngOnInit() {
  }

}
