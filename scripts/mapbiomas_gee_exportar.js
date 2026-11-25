// ============================================================================
// MapBiomas Coleção 11 – exporta uso e cobertura da terra da RMC (1990 e 2025)
// Cole este código no Google Earth Engine Code Editor (https://code.earthengine.google.com)
// e clique em "Run". Depois, na aba "Tasks", clique em "RUN" nas duas exportações.
// Os arquivos vão para o seu Google Drive, pasta "geoportal_rmc".
// Baixe-os e coloque em:  Geoportal\RMC\dados_brutos\mapbiomas\
// ============================================================================
var colecao = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection11/mapbiomas_brazil_collection11_coverage_v3');

// Retângulo envolvente da RMC; o recorte exato pelos 20 municípios é feito
// depois, no scripts/preparar_mapbiomas.py.
var regiao = ee.Geometry.Rectangle([-47.56, -23.26, -46.64, -22.40]);

[1990, 2025].forEach(function (ano) {
  var img = colecao.select('classification_' + ano).clip(regiao).toUint8();
  Map.addLayer(img, {min: 0, max: 75, palette: ['ffffff', '1f8d49', 'edde8e', 'd4271e']}, 'MapBiomas ' + ano, false);
  Export.image.toDrive({
    image: img,
    description: 'mapbiomas_rmc_' + ano,
    folder: 'geoportal_rmc',
    fileNamePrefix: 'mapbiomas_rmc_' + ano,
    region: regiao,
    scale: 30,
    crs: 'EPSG:4326',
    maxPixels: 1e10
  });
});
Map.centerObject(regiao, 9);
