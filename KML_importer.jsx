function doDrawKmlPath(thisObj){
    SelectedFile = File.openDialog("open file","KML:*.kml",false)
    if (SelectedFile){
        kmlFile = new File(SelectedFile);
        kmlFile.open("r");
        var xString = kmlFile.read();
        
        try {
            // Parse XML with namespace handling
            XML.ignoreWhitespace = true;
            var xmlDoc = new XML(xString);
            
            // Find all Placemarks across namespaces
            var placemarks = xmlDoc..*::Placemark;
            
            for (var p = 0; p < placemarks.length(); p++) { 
                var lineString = placemarks[p]..*::LineString[0];
                var pointString = placemarks[p]..*::Point[0];
                
                var xData = "";
                if (lineString) {
                    xData = lineString..*::coordinates[0].toString().replace(/^\s+/, "");
                } else if (pointString) {
                    xData = pointString..*::coordinates[0].toString().replace(/^\s+/, "");
                }
                
                var array = xData.split(" ");
                var rows = array.length;
                
                var earth = 6371010.1; // radius of earth (google earth value)
                var vertices = [];
                
                var sa = array[0].split(",");
                var sx = parseFloat(sa[0]); // starting point x (lon)
                var sy = parseFloat(sa[1]); // starting point y (lat)
                
                if (lineString){
                    var ox, oy, oz, olon, olat;
                    var adj = Math.cos((sy * Math.PI / 180)) * earth;
                    
                    for(var i = 0; i < rows; i++) {
                        var inar = array[i].split(",");
                        if (!isNaN(parseFloat(inar[0]))) {
                            var lon = inar[0];
                            var lat = inar[1];
                            var overlay = Math.PI * (adj * 2);
                            var x = (lon + 180) * (overlay / 360);
                            var latRad = lat * Math.PI / 180;
                            var merc = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
                            var y = (overlay / 2) - (overlay * merc / (2 * Math.PI));

                            if (i === 0) {
                                sx = x;
                                sy = y;
                                olon = lon;
                                olat = lat;
                                var phi = (90 - lat) * (Math.PI / 180);
                                var theta = (lon + 180) * (Math.PI / 180);
                                ox = ((earth) * Math.sin(phi) * Math.cos(theta));
                                oy = ((earth) * Math.sin(phi) * Math.sin(theta));
                                oz = ((earth) * Math.cos(phi));
                            }
                            vertices.push([(x - sx), (y - sy)]);
                        } 
                    }
                    
                    var t1 = []; 
                    var t2 = [];
                    var pathShapeLayer = app.project.activeItem.layers.addShape(); 
                    var pathShapeGroup = pathShapeLayer.property("ADBE Root Vectors Group");
                    pathShapeGroup.addProperty("ADBE Vector Shape - Group");
                    pathShapeGroup.addProperty("ADBE Vector Graphic - Stroke");
                    
                    var pathShape = new Shape();
                    pathShape.vertices = vertices;
                    pathShape.inTangents = t1;
                    pathShape.outTangents = t2;
                    pathShape.closed = false;
                    
                    pathShapeLayer.threeDLayer = true;
                    pathShapeLayer.position.setValue([ox, oy, oz]);
                    pathShapeLayer.orientation.setValue([270,((-90) - olon) , 0]);
                    pathShapeLayer.xRotation.setValue(-1 * olat);
                    
                    pathShapeGroup.property(1).property("ADBE Vector Shape").setValue(pathShape);
                
                } else if (pointString) {
                    var adj = Math.cos((sy * Math.PI / 180)) * earth;
                    var lon = sx;
                    var lat = sy;
                    var phi = (90 - lat) * (Math.PI / 180);
                    var theta = (lon + 180) * (Math.PI / 180);
                    var ox = -((earth) * Math.sin(phi) * Math.cos(theta));
                    var oy = -((earth) * Math.sin(phi) * Math.sin(theta));
                    var oz = ((earth) * Math.cos(phi));

                    var newNull = app.project.activeItem.layers.addNull();
                    newNull.threeDLayer = true;
                    newNull.position.setValue([ox, oy, oz]);
                    newNull.orientation.setValue([270, ((-90) - lon), 0]);
                    newNull.xRotation.setValue(-1 * lat);
                }
            }
        } catch (e) {
            alert("XML Parsing Error: " + e.message);
        }
        
        kmlFile.close();
    }
}
doDrawKmlPath(this);