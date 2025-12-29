function runAnalysis() {
    const days = parseFloat(document.getElementById('inputDays').value);
    const cat = document.getElementById('inputCategory').value;
    
    if (isNaN(days)) {
        alert("Lütfen geçerli bir gün sayısı giriniz.");
        return;
    }

    // Risk hesaplama mantığı (Model simülasyonu)
    let score = 0;
    let label = "";
    let color = "";
    let message = "";

    if (days <= 7 || cat == "2") {
        score = Math.floor(Math.random() * (98 - 80) + 80);
        label = "YÜKSEK RİSK";
        color = "#ef4444";
        message = "Siparişin iade edilme olasılığı çok kritik!";
    } else if (days <= 18 || cat == "1") {
        score = Math.floor(Math.random() * (79 - 40) + 40);
        label = "ORTA RİSK";
        color = "#f59e0b";
        message = "İade riski mevcut, sevkiyatı kontrol edin.";
    } else {
        score = Math.floor(Math.random() * (39 - 5) + 5);
        label = "DÜŞÜK RİSK";
        color = "#10b981";
        message = "Güvenli bölge, iade beklenmiyor.";
    }

    // Arayüzü Güncelle
    updateUI(score, label, color, message);
}

function updateUI(score, label, color, message) {
    const scoreEl = document.getElementById('riskScore');
    const classEl = document.getElementById('riskClass');
    const msgEl = document.getElementById('resultMessage');
    const circle = document.getElementById('riskCircle');

    // Skor ve Renk
    scoreEl.innerText = "%" + score;
    scoreEl.style.color = color;
    classEl.innerText = label;
    msgEl.innerText = message;
    msgEl.style.color = "white";
    msgEl.style.backgroundColor = color;

    // Daire Animasyonu (440 = Çevre uzunluğu)
    const offset = 440 - (score / 100 * 440);
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = color;

    // Faktör Çubukları (Notebook Feature Importance)
    const impacts = [
        { name: "İadeye Kalan Gün", val: 84 },
        { name: "Risk Kategorisi", val: 15 },
        { name: "Finansal Faktörler", val: 1 }
    ];

    const barsContainer = document.getElementById('impactBars');
    barsContainer.innerHTML = impacts.map(imp => `
        <div class="impact-item">
            <div class="label-row">
                <span>${imp.name}</span>
                <span>%${imp.val} Etki</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill" style="width: ${imp.val}%; background-color: ${color}"></div>
            </div>
        </div>
    `).join('');
}