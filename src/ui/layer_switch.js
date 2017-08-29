module.exports = function(context) {

    return function(selection) {
        var layers;

        if (!(/a\.tiles\.mapbox.com/).test(L.mapbox.config.HTTP_URL)) {
            layers = [{
                title: 'Mapbox',
                layer: L.mapbox.tileLayer('mapbox.osm-bright')
            }, {
                title: 'Mapbox Outdoors',
                layer: L.mapbox.tileLayer('mapbox.mapbox-outdoors')
            }, {
                title: 'Satellite',
                layer: L.mapbox.tileLayer('mapbox.satellite-full')
            }];

        } else {
            layers = [{
                title: 'CM',
                layer: L.tileLayer('https://api.mapbox.com/styles/v1/cleveland-metroparks/cj6xo8y30a6o02rmzufgj9ln6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA', {  
                   accessToken: 'pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA', 
                   attribution: '&copy; <a href="https://mapbox.com">Mapbox</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="https://clevelandmetroparks.com">Cleveland Metroparks</a>'
                }) 
            }, {
                title: 'CM Trails',
                layer: L.tileLayer('https://api.mapbox.com/styles/v1/cleveland-metroparks/cj5ml8sy43j7t2spgfmrf7xx0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA', {  
                   accessToken: 'pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA', 
                   attribution: '&copy; <a href="https://mapbox.com">Mapbox</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="https://clevelandmetroparks.com">Cleveland Metroparks</a>'
                })
            }, {
                title: 'Mapbox',
                layer: L.mapbox.tileLayer('mapbox.streets')
            }, {
                title: 'Satellite',
                layer: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA', {
                    accessToken: 'pk.eyJ1IjoiY2xldmVsYW5kLW1ldHJvcGFya3MiLCJhIjoiWHRKaDhuRSJ9.FGqNSOHwiCr2dmTH2JTMAA',
                   attribution: '&copy; <a href="https://mapbox.com">Mapbox</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="https://clevelandmetroparks.com">Cleveland Metroparks</a>'
                })
            }, {
                title: 'OSM',
                layer: L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            }];
        }

        var layerSwap = function(d) {
            var clicked = this instanceof d3.selection ? this.node() : this;
            layerButtons.classed('active', function() {
                return clicked === this;
            });
            layers.forEach(swap);
            function swap(l) {
                var datum = d instanceof d3.selection ? d.datum() : d;
                if (l.layer == datum.layer) context.map.addLayer(datum.layer);
                else if (context.map.hasLayer(l.layer)) context.map.removeLayer(l.layer);
            }
        };

        var layerButtons = selection.append('div')
            .attr('class', 'layer-switch')
            .selectAll('button')
            .data(layers)
            .enter()
            .append('button')
            .attr('class', 'pad0x')
            .on('click', layerSwap)
            .text(function(d) { return d.title; });

        layerButtons.filter(function(d, i) { return i === 0; }).call(layerSwap);

    };
};
