// app.js
const maxMiejsc = 10; // Ustal liczbę maksymalnych miejsc parkingowych
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

    // Dodaj samochód do listy
    samochody.push(numerRejestracyjny);
    zajeteMiejsca++;
    aktualizujParkingInfo();
    aktualizujListeSamochodow();

    // Wyczyść pole tekstowe
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
        li.textContent = samochod;

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
    samochody.splice(index, 1);
    zajeteMiejsca--;
    aktualizujParkingInfo();
    aktualizujListeSamochodow();
}

// Inicjalizacja parkingu
aktualizujParkingInfo();
