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
}

function obliczOplate(czasParkowania) {
    const stawka = 2; // 2 PLN za każdą minutę parkowania
    return czasParkowania * stawka;
}

// Inicjalizacja parkingu
aktualizujParkingInfo();
