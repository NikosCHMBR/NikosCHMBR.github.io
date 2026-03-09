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
const elementsToAnimate = document.querySelectorAll(".card:not(.shy-button), section h2");

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


/* ==============================================
   SCHEUER BUTTON — weicht der Maus aus
   ================================================
   Jedes Element mit class="shy-button" springt an
   eine zufaellige Position, sobald die Maus es
   beruehrt. Wiederverwendbare Klasse: Du kannst
   beliebig viele shy-buttons auf jeder Seite haben.
   
   VERWENDUNG IM HTML (z.B. als Karte):
   
       <div class="card shy-button">
           <div class="icon">🎮</div>
           <h3>Fang mich!</h3>
           <p>Diese Karte weicht dir aus.</p>
       </div>
   
   VERHALTEN:
   Das Element sitzt zunaechst ganz normal im Layout
   (z.B. im Card-Grid). Erst beim ersten Maus-Kontakt
   wird es herausgeloest und schwebt frei davon.
   
   So funktioniert das technisch:
   1. Beim Laden passiert NICHTS — das Element bleibt
      wo es ist (im Grid, im Flow, ueberall).
   2. Beim ersten "mouseover" merkt sich das Script
      die aktuelle Bildschirmposition des Elements
      (mit getBoundingClientRect).
   3. Dann setzt es "position: fixed" und platziert
      das Element exakt an derselben Stelle — visuell
      aendert sich also erstmal nichts.
   4. Sofort danach wird es an eine zufaellige neue
      Position verschoben. Die CSS-Transition sorgt
      fuer das sanfte Gleiten.
   5. Ab jetzt schwebt es bei jedem weiteren Kontakt
      an eine neue zufaellige Position.
   
   HINWEIS: Sobald das Element "position: fixed" hat,
   ist es aus dem normalen Layout herausgeloest.
   Im Grid ruecken die anderen Elemente nach.
   ================================================ */
const shyButtons = document.querySelectorAll(".shy-button");

if (shyButtons.length > 0) {

    // Hilfsfunktion: berechnet eine zufaellige Position
    // innerhalb des sichtbaren Fensters
    function moveButtonAway(button) {
        const maxX = window.innerWidth - button.offsetWidth - 20;
        const maxY = window.innerHeight - button.offsetHeight - 20;

        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));

        button.style.left = randomX + "px";
        button.style.top = randomY + "px";
    }

    // Hilfsfunktion: loest das Element beim ersten Kontakt
    // aus dem Layout heraus und setzt es auf "fixed"
    function detachAndFlee(button) {
        // Nur beim allerersten Mal ausfuehren
        if (button.dataset.detached === "true") {
            // Bereits herausgeloest — einfach wegbewegen
            moveButtonAway(button);
            return;
        }

        // Aktuelle Position auf dem Bildschirm merken
        // (dort wo das Element gerade sichtbar ist)
        const rect = button.getBoundingClientRect();

        // Breite und Hoehe fixieren, damit die Karte
        // ihre Groesse behaelt wenn sie das Grid verlaesst
        button.style.width = rect.width + "px";
        button.style.height = rect.height + "px";

        // Auf "fixed" umschalten und an exakt dieselbe
        // Stelle setzen — visuell aendert sich kurz nichts
        button.style.position = "fixed";
        button.style.top = rect.top + "px";
        button.style.left = rect.left + "px";

        // Markieren, dass dieses Element jetzt frei schwebt
        button.dataset.detached = "true";

        // Kurze Verzoegerung, damit der Browser die neue
        // Position registriert BEVOR die Animation startet.
        // Ohne das wuerde der Uebergang nicht sichtbar sein.
        setTimeout(function () {
            moveButtonAway(button);
        }, 50);
    }

    // Jeden shy-button einrichten
    shyButtons.forEach(function (button) {

        // Maus-Ereignis (Desktop)
        button.addEventListener("mouseover", function () {
            detachAndFlee(button);
        });

        // Touch-Ereignis (Handy/Tablet)
        button.addEventListener("touchstart", function (event) {
            event.preventDefault();
            detachAndFlee(button);
        });
    });
}
