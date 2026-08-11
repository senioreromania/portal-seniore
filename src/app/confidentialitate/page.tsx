import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function ConfidentialitatePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4">
            Politica de Confidențialitate
          </h1>
          <p className="text-sm text-navy-deep/50 mb-10">
            Ultima actualizare: 11 august 2026
          </p>
          <div className="space-y-8 text-navy-deep/70 leading-relaxed">
            <section className="space-y-4">
              <p>
                Prezenta Politică de Confidențialitate descrie modul în care
                <strong> BIOVIVA SRL</strong>, CUI 50826395, sediul în Strada
                Margeanului, Nr. 22, Sector 5, 051047 București, telefon +40 785
                598 779, email office@seniore.ro (în continuare
                &quot;Operator&quot;), colectează, utilizează și protejează
                datele personale ale utilizatorilor portalului
                <strong> www.seniore.ro</strong> (în continuare
                &quot;Portalul&quot;).
              </p>
              <p>
                Prezenta Politică este elaborată conform Regulamentului (UE)
                2016/679 (GDPR) și Legii nr. 190/2018. Prin utilizarea Portalului
                vă exprimați consimțământul privind prelucrarea datelor conform
                prezentei Politici.
              </p>
            </section>
            {/* SECTIONS_PLACEHOLDER */}
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 1. Definiții
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Date personale</strong> — orice informație referitoare la o persoană fizică identificată sau identificabilă (ex: nume, email, telefon, adresă IP).</li>
                <li><strong>Prelucrare</strong> — orice operațiune efectuată asupra datelor personale (colectare, înregistrare, organizare, stocare, utilizare, dezvăluire, ștergere).</li>
                <li><strong>Operator</strong> — BIOVIVA SRL, care determină scopul și mijloacele prelucrării datelor.</li>
                <li><strong>Subiect al datelor</strong> — persoana fizică la care se referă datele personale (Utilizatorul Portalului).</li>
                <li><strong>Consimțământ</strong> — manifestarea de voință liberă, specifică, informată prin care Subiectul datelor acceptă prelucrarea.</li>
                <li><strong>Împuternicit</strong> — terț care prelucrează date în numele Operatorului (ex: Stripe, Supabase).</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 2. Identitatea Operatorului de date
              </h2>
              <div className="bg-navy-deep/5 rounded-lg p-4 space-y-1 text-sm">
                <p><strong>Denumire:</strong> BIOVIVA SRL</p>
                <p><strong>CUI:</strong> 50826395</p>
                <p><strong>Sediu:</strong> Strada Margeanului, Nr. 22, Sector 5, 051047 București, România</p>
                <p><strong>Telefon:</strong> +40 785 598 779</p>
                <p><strong>Email:</strong> office@seniore.ro</p>
              </div>
              <p>
                Pentru exercitarea drepturilor GDPR sau orice solicitare legată
                de protecția datelor, contactați Operatorul la office@seniore.ro.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 3. Categoriile de date personale colectate
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">3.1. Date furnizate voluntar</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Adresa de email</strong> — pentru crearea și gestionarea contului;</li>
                <li><strong>Parola</strong> — stocată criptat (hash), nu în clar;</li>
                <li><strong>Nume și prenume</strong> — furnizate voluntar la editarea profilului;</li>
                <li><strong>Număr de telefon</strong> — pentru afișarea pe pagina Căminului promovat;</li>
                <li><strong>Adresa Căminului</strong> — pentru geocodare și afișare hartă;</li>
                <li><strong>Date de facturare</strong> — denumire firmă, CUI, adresă, cont bancar (la solicitarea Promotorului).</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">3.2. Date colectate automat</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Adresa IP</strong> — pentru securitatea Portalului;</li>
                <li><strong>Tip și versiune browser</strong> — pentru compatibilitate;</li>
                <li><strong>Date de navigare</strong> — pagini vizitate, durata sesiunii (prin cookies);</li>
                <li><strong>Date de tranzacție</strong> — ID tranzacție Stripe, sumă, dată (NU datele cardului).</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">3.3. Date care NU sunt colectate</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Date de sănătate sau date medicale;</li>
                <li>Date despre convingeri religioase, politice sau filozofice;</li>
                <li>Date biometrice;</li>
                <li>Date ale rezidenților căminelor (vârstnici);</li>
                <li>Date ale cardului bancar — procesate exclusiv de Stripe.</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 4. Scopurile și temeiurile legale ale prelucrării
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-navy-deep/20">
                  <thead className="bg-navy-deep/5">
                    <tr>
                      <th className="text-left p-3 border border-navy-deep/20">Scopul</th>
                      <th className="text-left p-3 border border-navy-deep/20">Temeiul legal</th>
                      <th className="text-left p-3 border border-navy-deep/20">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">Crearea și gestionarea contului</td>
                      <td className="p-3 border border-navy-deep/20">Consimțământ (art. 6 alin. 1 lit. a)</td>
                      <td className="p-3 border border-navy-deep/20">Email, parolă</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">Furnizarea Abonamentului Premium</td>
                      <td className="p-3 border border-navy-deep/20">Executarea contractului (art. 6 alin. 1 lit. b)</td>
                      <td className="p-3 border border-navy-deep/20">Email, nume, telefon, adresă</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">Procesarea plăților</td>
                      <td className="p-3 border border-navy-deep/20">Executarea contractului (art. 6 alin. 1 lit. b)</td>
                      <td className="p-3 border border-navy-deep/20">ID tranzacție, sumă</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">Emiterea facturilor</td>
                      <td className="p-3 border border-navy-deep/20">Obligație legală (art. 6 alin. 1 lit. c)</td>
                      <td className="p-3 border border-navy-deep/20">Date facturare</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">Securitatea Portalului</td>
                      <td className="p-3 border border-navy-deep/20">Interes legitim (art. 6 alin. 1 lit. f)</td>
                      <td className="p-3 border border-navy-deep/20">IP, date tehnice</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-navy-deep/20">Analiză și îmbunătățire</td>
                      <td className="p-3 border border-navy-deep/20">Consimțământ (art. 6 alin. 1 lit. a)</td>
                      <td className="p-3 border border-navy-deep/20">Date navigare</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 5. Destinatarii datelor personale
              </h2>
              <p>
                Operatorul NU vinde, NU închiriază și NU comercializează datele
                personale. Datele pot fi dezvăluite următorilor destinatari:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Stripe, Inc.</strong> — procesator plăți. Primește ID utilizator și detaliile comenzii, NU datele cardului. Politica Stripe: https://stripe.com/privacy</li>
                <li><strong>Supabase</strong> — infrastructură bază de date. Data center în Frankfurt, Germania (UE). Politica: https://supabase.com/privacy</li>
                <li><strong>Google Maps API</strong> — pentru geocodarea adreselor. Primește doar textul adresei, nu date de identificare.</li>
                <li><strong>Autorități publice</strong> — doar la solicitare legală (ANSPDCP, instanțe, organe de urmărire penală).</li>
              </ul>
              <p>
                Operatorul nu transferă date către țări terțe (în afara SEE),
                cu excepția cazului în care se aplică garanțiile adecvate conform
                art. 44-49 GDPR.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 6. Perioada de conservare a datelor
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Date cont:</strong> pe durata existenței contului. La ștergere, datele sunt șterse în 30 de zile, cu excepția datelor cu obligație legală.</li>
                <li><strong>Date tranzacții și facturare:</strong> 10 ani (Legea nr. 82/1991, Codul Fiscal).</li>
                <li><strong>Date Cămin promovat:</strong> pe perioada Abonamentului Premium. La expirare, datele editate pot fi șterse sau arhivate.</li>
                <li><strong>Date tehnice (IP, logs):</strong> maximum 90 de zile.</li>
                <li><strong>Date cookies:</strong> conform Politicii de Cookies (maximum 13 luni).</li>
                <li><strong>Comunicări:</strong> 2 ani de la ultima interacțiune.</li>
              </ul>
              <p>
                La expirare, datele sunt șterse sau anonimizate permanent.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 7. Drepturile Utilizatorului conform GDPR
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.1. Dreptul de acces (art. 15)</h3>
              <p>
                Puteți solicita confirmarea că Operatorul prelucrează date despre
                dumneavoastră și acces la acestea, plus informații despre scop,
                destinatari, perioada de conservare și drepturile dumneavoastră.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.2. Dreptul la rectificare (art. 16)</h3>
              <p>
                Puteți solicita corectarea datelor inexacte sau incomplete.
                Puteți modifica direct datele din cont sau solicita corectarea
                la office@seniore.ro.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.3. Dreptul la ștergere (art. 17)</h3>
              <p>
                Puteți solicita ștergerea datelor când: datele nu mai sunt
                necesare, vă retrageți consimțământul, vă opuneți prelucrării
                sau datele au fost prelucrate ilegal. Ștergerea nu se aplică
                datelor cu obligație legală (ex: date fiscale — 10 ani).
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.4. Dreptul la limitarea prelucrării (art. 18)</h3>
              <p>
                Puteți solicita limitarea prelucrării când: contestați
                exactitatea datelor, prelucrarea este ilegală, sau datele vă
                sunt necesare pentru apărarea unor pretenții legale.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.5. Dreptul la portabilitate (art. 20)</h3>
              <p>
                Puteți primi datele personale furnizate într-un format
                structurat, lizibil pe mașină (JSON, CSV) și le puteți transmite
                către un alt operator.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.6. Dreptul de opoziție (art. 21)</h3>
              <p>
                Vă puteți opune prelucrării bazate pe interes legitim. Operatorul
                va înceta prelucrarea, cu excepția cazului în care demonstrează
                motive legitime care prevalează.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.7. Dreptul de retragere a consimțământului</h3>
              <p>
                Puteți retrage consimțământul oricând, fără a afecta legalitatea
                prelucrării anterioare retragerii. Pentru a retrage
                consimțământul, contactați office@seniore.ro.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.8. Modul de exercitare a drepturilor</h3>
              <p>
                Toate solicitările se trimit la office@seniore.ro cu subiectul
                &quot;Exercitare drepturi GDPR&quot;. Operatorul va răspunde în
                termen de 30 de zile conform art. 12 GDPR. În caz de refuz sau
                răspuns nesatisfăcător, puteți depune plângere la ANSPDCP.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 8. Securitatea datelor personale
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.1. Măsuri tehnice</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptarea parolelor prin algoritmi de hash (bcrypt);</li>
                <li>Conexiuni securizate prin protocolul HTTPS/TLS;</li>
                <li>Stocarea datelor în Supabase cu criptare la nivel de bază de date;</li>
                <li>Acces restricționat la date prin chei API secrete (service role key);</li>
                <li>Procesarea plăților exclusiv prin Stripe (certificat PCI-DSS Level 1);</li>
                <li>Backup-uri regulate și plan de recuperare în caz de incident.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.2. Măsuri organizatorice</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acces limitat la datele personale doar pentru personal autorizat;</li>
                <li>Politici interne de securitate și confidențialitate;</li>
                <li>Registrul de activități de prelucrare conform art. 30 GDPR;</li>
                <li>Proceduri de notificare a breșelor de securitate în 72 de ore conform art. 33 GDPR.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.3. Notificarea breșelor de securitate</h3>
              <p>
                În cazul unei breșe de securitate care prezintă risc pentru
                drepturile și libertățile persoanelor fizice, Operatorul va
                notifica ANSPDCP în termen de 72 de ore de la luarea la cunoștință
                a breșei (art. 33 GDPR) și va informa persoanele afectate dacă
                breșa prezintă risc ridicat (art. 34 GDPR).
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 9. Cookie-uri
              </h2>
              <p>
                Portalul utilizează următoarele categorii de cookie-uri:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookie-uri tehnice (necesare):</strong> pentru funcționarea corectă a Portalului (autentificare, sesiune). Nu necesită consimțământ.</li>
                <li><strong>Cookie-uri analitice:</strong> pentru analizarea utilizării Portalului (pagini vizitate, durată sesiune). Necesită consimțământ. Durata maximă: 13 luni.</li>
                <li><strong>Cookie-uri de marketing (dacă sunt utilizate):</strong> pentru personalizarea reclamelor. Necesită consimțământ.</li>
              </ul>
              <p>
                Puteți gestiona sau șterge cookie-urile din setările browserului.
                Detalii complete sunt disponibile în Politica de Cookies.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 10. Dispoziții finale
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.1. Modificarea Politicii</h3>
              <p>
                Operatorul poate modifica prezenta Politică oricând. Modificările
                intră în vigoare de la data publicării pe Portal. Vă recomandăm
                să consultați periodic această pagină.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.2. Plângere la ANSPDCP</h3>
              <p>
                Dacă considerați că drepturile dumneavoastră au fost încălcate,
                puteți depune plângere la:
              </p>
              <div className="bg-navy-deep/5 rounded-lg p-4 space-y-1 text-sm">
                <p><strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong></p>
                <p>B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, 010336 București</p>
                <p>Telefon: +40 318 059 211</p>
                <p>Email: anspdcp@dataprotection.ro</p>
                <p>Website: www.dataprotection.ro</p>
              </div>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.3. Legislație aplicabilă</h3>
              <p>
                Prezenta Politică este guvernată de legislația română și
                europeană aplicabilă protecției datelor personale: Regulamentul
                (UE) 2016/679 (GDPR), Legea nr. 190/2018, și alte acte normative
                conexe.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.4. Contact</h3>
              <div className="bg-navy-deep/5 rounded-lg p-4 space-y-1 text-sm">
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
