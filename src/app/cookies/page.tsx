import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4">
            Politica de Cookies
          </h1>
          <p className="text-sm text-navy-deep/50 mb-10">
            Ultima actualizare: 11 august 2026
          </p>
          <div className="space-y-8 text-navy-deep/70 leading-relaxed">
            <section className="space-y-4">
              <p>
                Prezenta Politică de Cookies descrie modul în care
                <strong> BIOVIVA SRL</strong>, CUI 50826395, sediul în Strada
                Margeanului, Nr. 22, Sector 5, 051047 București, telefon +40 785
                598 779, email office@seniore.ro (în continuare
                &quot;Operator&quot;), utilizează cookie-uri pe portalul
                <strong> www.seniore.ro</strong> (în continuare
                &quot;Portalul&quot;).
              </p>
              <p>
                Prezenta Politică este elaborată în conformitate cu Regulamentul
                (UE) 2016/679 (GDPR), Legea nr. 190/2018, Legea nr. 365/2002
                privind comerțul electronic și Directiva Europeană ePrivacy
                (Directiva 2002/58/CE, modificată).
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 1. Ce sunt cookie-urile
              </h2>
              <p>
                Cookie-urile sunt fișiere text de mici dimensiuni stocate pe
                dispozitivul dumneavoastră (computer, tabletă, telefon) atunci
                când vizitați un site web. Ele permit site-ului să memoreze
                acțiunile și preferințele dumneavoastră pe o anumită perioadă,
                oferind o experiență de navigare mai eficientă și personalizată.
              </p>
              <p>
                Cookie-urile nu conțin viruși și nu pot accesa datele de pe
                dispozitivul dumneavoastră în afara informațiilor pe care le-ați
                furnizat voluntar prin interacțiunea cu Portalul.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 2. Categoriile de cookie-uri utilizate
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">2.1. Cookie-uri tehnice (necesare)</h3>
              <p>
                Aceste cookie-uri sunt esențiale pentru funcționarea corectă a
                Portalului. Ele permit: autentificarea utilizatorilor, menținerea
                sesiunii, securitatea contului și afișarea corectă a
                conținutului. <strong>Nu pot fi dezactivate</strong>, deoarece
                fără ele Portalul nu poate funcționa corespunzător.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookie de sesiune:</strong> menține sesiunea activă pe durata navigării;</li>
                <li><strong>Cookie de autentificare:</strong> recunoaște utilizatorul autentificat;</li>
                <li><strong>Cookie de securitate:</strong> protejează împotriva atacurilor CSRF și XSS.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">2.2. Cookie-uri analitice</h3>
              <p>
                Aceste cookie-uri colectează informații anonime despre modul în
                care Utilizatorii folosesc Portalul: paginile vizitate, durata
                sesiunii, pagina de referință. Datele sunt agregate și
                anonimize, nepermițând identificarea individuală a
                Utilizatorului.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics (G-6LQ7HMECW2):</strong> analizează traficul și comportamentul Utilizatorilor. Datele sunt stocate de Google conform politicilor sale de confidențialitate. Durata: maximum 13 luni.</li>
              </ul>
              <p>
                <strong>Aceste cookie-uri necesită consimțământul
                dumneavoastră.</strong> Puteți refuza cookie-urile analitice
                prin banner-ul de consent afișat la prima vizită.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">2.3. Cookie-uri de marketing (dacă sunt utilizate)</h3>
              <p>
                Aceste cookie-uri ar putea fi utilizate pentru a personaliza
                reclamele și a măsura eficiența campaniilor. <strong>Nu
                utilizăm cookie-uri de marketing în prezent.</strong> Dacă vom
                adăuga în viitor, vom actualiza prezenta Politică și vom solicita
                consimțământul separat.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 3. Tabelul cookie-urilor
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-navy-deep/20">
                  <thead className="bg-navy-deep/5">
                    <tr>
                      <th className="text-left p-3 border border-navy-deep/20">Nume</th>
                      <th className="text-left p-3 border border-navy-deep/20">Tip</th>
                      <th className="text-left p-3 border border-navy-deep/20">Scop</th>
                      <th className="text-left p-3 border border-navy-deep/20">Durată</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">sb-*-auth</td>
                      <td className="p-3 border border-navy-deep/20">Tehnic</td>
                      <td className="p-3 border border-navy-deep/20">Autentificare Supabase</td>
                      <td className="p-3 border border-navy-deep/20">Sesiune</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">cookie-consent</td>
                      <td className="p-3 border border-navy-deep/20">Tehnic</td>
                      <td className="p-3 border border-navy-deep/20">Memorează preferința cookie</td>
                      <td className="p-3 border border-navy-deep/20">12 luni</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">_ga</td>
                      <td className="p-3 border border-navy-deep/20">Analitic</td>
                      <td className="p-3 border border-navy-deep/20">Google Analytics — ID utilizator</td>
                      <td className="p-3 border border-navy-deep/20">13 luni</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">_gid</td>
                      <td className="p-3 border border-navy-deep/20">Analitic</td>
                      <td className="p-3 border border-navy-deep/20">Google Analytics — sesiune</td>
                      <td className="p-3 border border-navy-deep/20">24 ore</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 4. Consimțământul
              </h2>
              <p>
                La prima vizită pe Portal, vi se va afișa un banner de
                consimțământ care vă permite să:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acceptați toate cookie-urile</strong> — inclusiv cele analitice;</li>
                <li><strong>Acceptați doar cookie-urile necesare</strong> — doar cookie-urile tehnice vor fi utilizate.</li>
              </ul>
              <p>
                Preferința dumneavoastră este stocată în cookie-ul
                &quot;cookie-consent&quot; pe o perioadă de 12 luni. După
                expirare, banner-ul va fi afișat din nou.
              </p>
              <p>
                Puteți retracta consimțământul oricând prin ștergerea
                cookie-urilor din browser și revenirea pe Portal.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 5. Gestionarea cookie-urilor din browser
              </h2>
              <p>
                Puteți gestiona, bloca sau șterge cookie-urile direct din
                setările browserului dumneavoastră. Mai jos sunt link-urile
                către ghidurile oficiale pentru browserele cele mai populare:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/ro/kb/cookies-informatii-stocate-de-websites" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/ro-ro/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Microsoft Edge</a></li>
              </ul>
              <p>
                <strong>Atenție:</strong> dezactivarea cookie-urilor tehnice
                poate afecta funcționalitatea Portalului (autentificare,
                navigare).
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 6. Transferul de date către terțe țări
              </h2>
              <p>
                Google Analytics (Google LLC, SUA) poate transfera date către
                servere situate în Statele Unite. Google aplică garanții
                adecvate conform clauzelor contractuale standard aprobate de
                Comisia Europeană. Pentru detalii, consultați politica de
                confidențialitate Google: https://policies.google.com/privacy
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 7. Drepturile dumneavoastră
              </h2>
              <p>
                Conform GDPR, aveți dreptul de a accesa, rectifica, șterge și
                restricționa prelucrarea datelor personale colectate prin
                cookie-uri. Pentru exercitarea acestor drepturi, contactați
                Operatorul la office@seniore.ro.
              </p>
              <p>
                Puteți depune plângere la Autoritatea Națională de Supraveghere
                a Prelucrării Datelor cu Caracter Personal (ANSPDCP),
                B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București,
                telefon +40 318 059 211, email anspdcp@dataprotection.ro,
                website www.dataprotection.ro.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 8. Modificarea Politicii de Cookies
              </h2>
              <p>
                Operatorul poate modifica prezenta Politică oricând. Modificările
                intră în vigoare de la data publicării pe Portal. Vă recomandăm
                să consultați periodic această pagină.
              </p>
              <div className="bg-navy-deep/5 rounded-lg p-4 space-y-1 text-sm mt-6">
                <p><strong>BIOVIVA SRL</strong></p>
                <p>CUI: 50826395</p>
                <p>Strada Margeanului, Nr. 22, Sector 5, 051047 București, România</p>
                <p>Telefon: +40 785 598 779</p>
                <p>Email: office@seniore.ro</p>
              </div>
              <p className="text-center text-navy-deep/40 text-sm pt-8">
                © 2026 BIOVIVA SRL. Toate drepturile rezervate.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
