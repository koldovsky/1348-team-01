async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  const locations = [
    { id: 'chernobyl', lat: 51.390, lng: 30.105, title: "Chornobyl", description: "Саме звідси ми доставляємо вам такі улюблені радіоактивні Beats by Dre." },
    { id: 'zhytomur', lat: 50.151, lng: 28.392, title: "Zhytomyr", description: "Оооо Житомир, то не місто не село, о Житомир куди нас ..." },
    { id: 'lviv', lat: 49.839, lng: 24.027, title: "Lviv", description: "Фортеця, завжди була і буде." },
    { id: 'kyrsk', lat: 51.730, lng: 36.199, title: "Kursk", description: "Курск спишь???" },
    { id: 'primul', lat: 48.528, lng: 35.908, title: "Pavlograd", description: "Хоумі Ельдар" },
    { id: 'ward', lat: 49.644, lng: 30.788, title: "Karapishi", description: "Головний постачальник rtx 3050 на ринку." }
  ];

  const maps = locations.map(location => {
    const mapElement = document.getElementById(location.id);
    if (!mapElement) {
      console.error(`Не знайдено елемент #${location.id}`);
      return null;
    }
    return new Map(mapElement, {
      zoom: 10,
      center: { lat: location.lat, lng: location.lng },
      mapId: '8874b0fca49da982',
      disableDefaultUI: true,
    });
  }).filter(map => map !== null);

  const infoWindow = new InfoWindow();

  const markers = locations.map((location, index) => {
    const pin = new PinElement({
      background: "black",
      glyphColor: "white",
      borderColor: "black",
    });
  
    return new AdvancedMarkerElement({
      map: maps[index],
      position: { lat: location.lat, lng: location.lng },
      content: pin.element,
      gmpClickable: true,
      title: location.title,
    });
  });

  if (markers.length > 0) {
    markers.forEach((marker, index) => {
      const location = locations[index];
  
      // Створюємо новий InfoWindow для кожного маркера
      const infoWindow = new InfoWindow();
  
      const contentString = `
        <div class="info-window-content">
          <h2 class="info-window-title">${location.title}</h2>
          <p class="info-window-description">${location.description}</p>
        </div>
      `;
      infoWindow.setHeaderDisabled(true);
      infoWindow.setContent(contentString);
      infoWindow.open(maps[index], marker);
    });
  }
  
}

initMap();
