# KML Path Importer for Google Earth Studio and After Effects

This script allows you to import a KML route file and create a path in After Effects or Google Earth Studio, which can be animated in 3D space. It processes the KML coordinates, converts them into a 3D path, and generates a vector shape layer to visualize the route.

## Features

- **KML File Support**: Import a KML file containing a `LineString` or `Point` with coordinates (longitude, latitude, altitude).
- **3D Path Creation**: The script converts the KML route into a 3D path that can be used in After Effects or Google Earth Studio.
- **Coordinate Transformation**: Converts geographic coordinates (longitude, latitude) into the After Effects/Google Earth Studio 3D coordinate space.
- **Path Visualization**: Creates a vector shape in After Effects for rendering and animation.

## Installation

1. Open **After Effects**.
2. Go to **File > Scripts > Open Script Editor**.
3. Copy the script content into the editor.
4. Save the script as `KML_Path_Importer.jsx`.
5. From After Effects, go to **File > Scripts > Run Script File** and select your saved script.

## Usage

1. Run the script by selecting **File > Scripts > Run Script File** in After Effects.
2. The script will prompt you to choose a KML file.
3. Once selected, the script will process the coordinates and create a path in 3D space using the KML coordinates.
4. The path will be added as a vector shape layer in the active After Effects composition, ready to be animated.

## Supported Formats

- KML files containing `<LineString>` or `<Point>` with `coordinates` in the format `longitude,latitude,altitude`.
  
Example:
```xml
<coordinates>
  52.52649889999999,29.6368643,0
  52.5271998,29.6362337,0
  52.5274037,29.6360646,0
</coordinates>
```

## Requirements

- **After Effects** or **Google Earth Studio**.
- The script is compatible with **After Effects CC** or later versions.
- The KML file must be correctly formatted with `longitude, latitude, and altitude` values.

## How It Works

1. The script opens the KML file and parses it, extracting coordinates.
2. For each coordinate pair, the script converts the geographic data (longitude and latitude) into After Effects/Google Earth Studio's 3D coordinate space.
3. The generated path is applied to a vector shape layer, which is created in the 3D space of After Effects.
4. You can then animate the path and use it in your project.

## License

This script is provided **free to use**. **Commercial use** is prohibited.

## Notes

- This script does not handle elevation data; all points are assumed to be on the same 3D plane (altitude = 0).
- KML routes are limited to approximately 30 km due to After Effects' constraints.

---

Let me know if you want any specific changes or further sections added to the README!
