const maxMiejsc = 10; 
let zajeteMiejsca = 0;
const samochody = [];

document.getElementById('dodaj-samochod').addEventListener('click', () => {
    const numerRejestracyjny = document.getElementById('numer-rejestracyjny').value.trim();

    if (numerRejestracyjny === '') {
        alert('Wprowadź numer rejestracyjny!');
        return;
    }

    if (zajeteMiejsca >= maxMiejsc) {
        alert('Parking jest pełny!');
        return;
    }

    const czasPrzyjazdu = new Date();
    samochody.push({ numer: numerRejestracyjny, czasPrzyjazdu: czasPrzyjazdu });
    zajeteMiejsca++;
    aktualizujParkingInfo();
    aktualizujListeSamochodow();
    aktualizujMiejscaParkingowe();  // Nowa funkcja do wizualizacji miejsc

    document.getElementById('numer-rejestracyjny').value = '';
});

function aktualizujParkingInfo() {
    document.getElementById('wolne-miejsca').textContent = maxMiejsc - zajeteMiejsca;
    document.getElementById('zajete-miejsca').textContent = zajeteMiejsca;
}

function aktualizujListeSamochodow() {
    const listaSamochodow = document.getElementById('lista-samochodow');
    listaSamochodow.innerHTML = '';

    samochody.forEach((samochod, index) => {
        const li = document.createElement('li');
        li.textContent = samochod.numer;

        const btnUsun = document.createElement('button');
        btnUsun.textContent = 'Usuń';
        btnUsun.addEventListener('click', () => {
            usunSamochod(index);
        });

        li.appendChild(btnUsun);
        listaSamochodow.appendChild(li);
    });
}

function usunSamochod(index) {
    const samochod = samochody[index];
    const czasWyjazdu = new Date();
    const czasParkowania = Math.floor((czasWyjazdu - samochod.czasPrzyjazdu) / (1000 * 60)); // czas w minutach

    const oplata = obliczOplate(czasParkowania);
    alert(`Samochód ${samochod.numer} był zaparkowany przez ${czasParkowania} minut. Opłata: ${oplata} PLN.`);

    samochody.splice(index, 1);
    zajeteMiejsca--;
    aktualizujParkingInfo();
    aktualizujListeSamochodow();
    aktualizujMiejscaParkingowe();  // Aktualizacja wizualizacji miejsc
}

function obliczOplate(czasParkowania) {
    const stawka = 2; // 2 PLN za każdą minutę parkowania
    return czasParkowania * stawka;
}

function aktualizujMiejscaParkingowe() {
    const miejscaContainer = document.getElementById('miejsca-parkingowe');
    miejscaContainer.innerHTML = '';

    for (let i = 1; i <= maxMiejsc; i++) {
        const miejsce = document.createElement('div');
        miejsce.classList.add('miejsce');

        if (i <= zajeteMiejsca) {
            miejsce.classList.add('zajete');
            miejsce.textContent = 'Zajęte';
        } else {
            miejsce.textContent = 'Wolne';
        }

        miejscaContainer.appendChild(miejsce);
    }
}

// Wyszukiwanie samochodu
document.getElementById('wyszukaj-samochod').addEventListener('click', () => {
    const numerSzukany = document.getElementById('wyszukaj-numer').value.trim();
    const znalezionySamochod = samochody.find(samochod => samochod.numer === numerSzukany);

    if (znalezionySamochod) {
        const czasParkowania = Math.floor((new Date() - znalezionySamochod.czasPrzyjazdu) / (1000 * 60));
        document.getElementById('wynik-wyszukiwania').textContent = `Samochód ${numerSzukany} jest zaparkowany przez ${czasParkowania} minut.`;
    } else {
        document.getElementById('wynik-wyszukiwania').textContent = 'Samochód nie znaleziony.';
    }
});

// Inicjalizacja parkingu
aktualizujParkingInfo();
aktualizujMiejscaParkingowe();  // Dodanie wizualizacji przy starcie
