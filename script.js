/* ==============================================
   SCRIPT.JS — Das JavaScript deiner Seite
   ================================================
   
   Diese Datei wird am Ende von index.html und
   game.html eingebunden:
   
       <script src="script.js"></script>
   
   JavaScript macht deine Seite interaktiv.
   Hier sind ein paar einfache Beispiele, die du
   erweitern oder ersetzen kannst.
   ================================================ */


/* ==============================================
   BEISPIEL 1: Scroll-Erkennung fuer die Navigation
   ================================================
   Wenn der Nutzer nach unten scrollt, bekommt die
   Navigationsleiste einen sichtbaren Schatten.
   So wirkt sie weniger "schwebend" ueber dem Inhalt.
   
   - document.querySelector("nav")  = findet das <nav>-Element
   - window.addEventListener(...)   = reagiert auf ein Ereignis
   - classList.add / remove         = fuegt CSS-Klassen hinzu/entfernt sie
   ================================================ */
const nav = document.querySelector("nav");

if (nav) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            nav.style.boxShadow = "0 4px 20px rgba(94, 234, 212, 0.15)";
        } else {
            nav.style.boxShadow = "none";
        }
    });
}


/* ==============================================
   BEISPIEL 2: Sanftes Scrollen bei Anker-Links
   ================================================
   Wenn jemand auf "#projekte" in der Navigation
   klickt, scrollt die Seite sanft dorthin, statt
   hart zu springen.
   
   - querySelectorAll('a[href^="#"]')  = findet alle Links, die mit # beginnen
   - preventDefault()                  = verhindert das normale Sprung-Verhalten
   - scrollIntoView({ behavior: "smooth" }) = scrollt sanft zum Ziel
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        // Nur ausfuehren wenn ein Ziel-Element existiert
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* ==============================================
   BEISPIEL 3: Elemente beim Scrollen einblenden
   ================================================
   Karten und Sektionen werden sichtbar, sobald
   der Nutzer zu ihnen scrollt. Das nutzt den
   "Intersection Observer" — eine Browser-API,
   die erkennt, wann ein Element im Sichtfeld ist.
   
   So funktioniert es:
   1. Alle .card und section Elemente starten unsichtbar
      (opacity: 0, leicht nach unten verschoben)
   2. Der Observer beobachtet jedes Element
   3. Sobald es im Sichtfeld auftaucht, wird es
      sichtbar (opacity: 1, zurueck an Originalposition)
   ================================================ */
const elementsToAnimate = document.querySelectorAll(".card, section h2");

// Startzustand: unsichtbar und leicht nach unten verschoben
elementsToAnimate.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// Observer erstellen
const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Element ist im Sichtfeld: einblenden
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Nicht mehr beobachten (Animation soll nur einmal passieren)
                observer.unobserve(entry.target);
            }
        });
    },
    {
        // Element muss zu 10% sichtbar sein, bevor die Animation startet
        threshold: 0.1
    }
);

// Jedes Element dem Observer uebergeben
elementsToAnimate.forEach(function (element) {
    observer.observe(element);
});


/* ==============================================
   BEISPIEL 4: Konsolenausgabe (zum Testen)
   ================================================
   console.log() gibt Text in der Browser-Konsole aus.
   Oeffne die Konsole mit F12 (oder Rechtsklick ->
   "Untersuchen" -> Tab "Konsole"), um diese Nachricht
   zu sehen. Das ist extrem nuetzlich zum Debuggen!
   ================================================ */
console.log("script.js wurde geladen!");
console.log("Oeffne diese Konsole mit F12, um Meldungen zu sehen.");
