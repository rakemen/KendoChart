var data = [{
  series: "CashandEquivalents",
  category: "CashandEquivalents",
  value: 4985.8799999999999,
  color: "#DDCBA4"
}, {
  series: "Equity",
  category: "Equity",
  value: 326816.6199999999981,
  color: "#0C2074"

}, {
  series: "RealEstate",
  category: "RealEstate",
  value: 33878.3199999999998,
  color: "#FDB924"
}];

var data1 = [{
	series: "000|Cash and Equivalents",
	category: "01|2/29/2016",
	value: 0.217726,
	color: "#DDCBA4"
},
{
	series: "000|Cash and Equivalents",
	category: "02|3/31/2016",
	value: 0.129705,
	color: "#DDCBA4"
},
{
	series: "000|Cash and Equivalents",
	category: "03|4/30/2016",
	value: 0.409477,
	color: "#DDCBA4"
},
{
	series: "000|Cash and Equivalents",
	category: "04|5/31/2016",
	value: 0.296252,
	color: "#DDCBA4"
},
{
	series: "000|Cash and Equivalents",
	category: "05|6/30/2016",
	value: 0.005624,
	color: "#DDCBA4"
},
{
	series: "000|Cash and Equivalents",
	category: "06|7/31/2016",
	value: 0.060611,
	color: "#DDCBA4"
},
{
	series: "000|Cash and Equivalents",
	category: "07|8/12/2016",
	value: 0.013634,
	color: "#DDCBA4"
},
{
	series: "001|Equity",
	category: "01|2/29/2016",
	value: 0.581608,
	color: "#0C2074"
},
{
	series: "001|Equity",
	category: "02|3/31/2016",
	value: 0.642284,
	color: "#0C2074"
},
{
	series: "001|Equity",
	category: "03|4/30/2016",
	value: 0.535322,
	color: "#0C2074"
},
{
	series: "001|Equity",
	category: "04|5/31/2016",
	value: 0.623480,
	color: "#0C2074"
},
{
	series: "001|Equity",
	category: "05|6/30/2016",
	value: 0.877457,
	color: "#0C2074"
},
{
	series: "001|Equity",
	category: "06|7/31/2016",
	value: 0.833500,
	color: "#0C2074"
},
{
	series: "001|Equity",
	category: "07|8/12/2016",
	value: 0.893720,
	color: "#0C2074"
},
{
	series: "004|Real Estate",
	category: "01|2/29/2016",
	value: 0.200664,
	color: "#FDB924"
},
{
	series: "004|Real Estate",
	category: "02|3/31/2016",
	value: 0.228009,
	color: "#FDB924"
},
{
	series: "004|Real Estate",
	category: "03|4/30/2016",
	value: 0.055200,
	color: "#FDB924"
},
{
	series: "004|Real Estate",
	category: "04|5/31/2016",
	value: 0.080266,
	color: "#FDB924"
},
{
	series: "004|Real Estate",
	category: "05|6/30/2016",
	value: 0.116917,
	color: "#FDB924"
},
{
	series: "004|Real Estate",
	category: "06|7/31/2016",
	value: 0.105887,
	color: "#FDB924"
},
{
	series: "004|Real Estate",
	category: "07|8/12/2016",
	value: 0.092644,
	color: "#FDB924"
}];

var dataSource = new kendo.data.DataSource({
  data: data
});

var dataSource1 = new kendo.data.DataSource({
    data: data1,
    schema: {
    model: {
        fields: {
          series: { type: "string" },
          category: { type: "string" },
          value: { type: "number" },
          color: { type: "string" },
        }
    }
    },
    group: {
        field: "series",
        dir: "asc"
    },
    sort: {
        field: "category",
        dir: "asc"
    }
    });

$(function() {
  $("#chart").kendoChart({
    
    dataSource: dataSource,
    
    seriesDefaults: {
      type: "donut"
    },
    
    series: [{
      field: "value",
      categoryField: "category",
      color: "color",
    }],
    
    tooltip: {
      visible: true,
      template: "<strong>#= dataItem.series #</strong></br>" + "#= kendo.toString(dataItem.value, 'C2') #"
    },
    
    legend: {
      position: "bottom"
    },

    title: {
      text: 'Donut UI Chart'
    }
  });
});

$(function(){
  $("#area").kendoChart({
    
    plotArea: {
      margin: {
        left: 10,
        right: 10
      }
    },
    
    tooltip: {
      visible: true
    },
        
    dataSource: dataSource1,
    
    seriesDefaults: {
      type: "area",
      stack: {
          type: "100%"
      }
    },
    
    series: [{
      field: "value"
    }],
    
    tooltip: {
      visible: true,
      template: "<strong>Date: #= kendo.toString(trimSortFromName(dataItem.category), 'MM/dd/yyyy') #</strong></br>" + "#= trimSortFromName(series.name) #" + ": " + "#= kendo.toString(dataItem.value, 'P2') #"
    },
    
    legend: {
      position: "bottom",
      labels: {
            template: "#= trimSortFromName(text) #"
        },
        align: "center",
        margin: {
            top: 20,
        }
    },

    title: {
      text: 'Area UI Chart'
    },
    
    valueAxis: {
      min: 0,
      max: 1
    },
    
    categoryAxis: {
      labels: {
          template: "#= trimSortFromName(value) #",
          rotation: 45,
      }
    },
    
    dataBound: function (e) {
      var series = e.sender.options.series;
      if (series.length) {
        for (var i = 0; i < series.length; i++) {
            if (series[i].data[0]) {
                series[i].color = series[i].data[0].color;
            }
        }
      }
    },

    chartArea: {
      margin: {
        bottom: 0
      }
    }
  });
});

function trimSortFromName(series) {
    var i = series.indexOf("|");
    return series.substring(i + 1, series.length);
}

