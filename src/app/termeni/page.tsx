import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function TermeniPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4">
            Termeni și Condiții
          </h1>
          <p className="text-sm text-navy-deep/50 mb-10">
            Ultima actualizare: 11 august 2026
          </p>
          <div className="space-y-8 text-navy-deep/70 leading-relaxed">
            <section className="space-y-4">
              <p>
                Prezentul document constituie Termenii și Condițiile de utilizare
                a portalului <strong>www.seniore.ro</strong> (în continuare
                &quot;Portalul&quot; sau &quot;Platforma&quot;), operat de
                societatea comercială <strong>BIOVIVA SRL</strong>, cu sediul în
                Strada Margeanului, Nr. 22, Sector 5, cod poștal 051047,
                București, România, CUI 50826395, telefon: +40 785 598 779 (în
                continuare &quot;Operator&quot; sau &quot;Compania&quot;).
              </p>
              <p>
                Prin crearea unui cont de utilizator, navigarea, utilizarea sau
                accesarea oricărei funcționalități a Portalului, confirmați că
                ați citit, ați înțeles și acceptați în integralitate prezentele
                Termeni și Condiții, precum și Politica de Confidențialitate și
                Politica de Cookies, care fac parte integrantă din acest document.
              </p>
              <p>
                În cazul în care nu sunteți de acord cu oricare dintre
                dispozițiile prezente, vă rugăm să nu utilizați Portalul.
                Utilizarea continuă a Portalului după publicarea unor modificări
                constituie acceptarea tacită a acestora.
              </p>
            </section>
            {/* SECTIONS_PLACEHOLDER */}
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 1. Definiții
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Portalul / Platforma</strong> — site-ul web www.seniore.ro, prin intermediul căruia Operatorul pune la dispoziția publicului informații despre căminele de bătrâni și centrele de îngrijire pentru vârstnici din România.</li>
                <li><strong>Utilizator</strong> — orice persoană fizică sau juridică care accesează, navighează sau utilizează Portalul, indiferent dacă deține sau nu un cont înregistrat.</li>
                <li><strong>Cont de utilizator</strong> — contul creat prin procesul de înregistrare pe Portal, care permite Utilizatorului să acceseze funcționalități suplimentare, inclusiv promovarea și editarea căminelor.</li>
                <li><strong>Cămin</strong> — orice cămin de bătrâni, centru rezidențial, centru de îngrijire și asistență socială pentru vârstnici, fundație sau asociație care oferă servicii de cazare și îngrijire pentru persoane vârstnice, listat sau nelistat pe Portal.</li>
                <li><strong>Promotor</strong> — Utilizatorul care deține un cont activ și care inițiază procesul de promovare Premium pentru un anumit Cămin, asumându-și dreptul de administrare a datelor acelui Cămin pe Portal.</li>
                <li><strong>Abonament Premium</strong> — serviciul plătit oferit de Operator prin care un Cămin primește vizibilitate extinsă pe Portal, inclusiv afișare prioritară, posibilitate de editare a detaliilor, încărcare de imagini și descriere personalizată.</li>
                <li><strong>Perioadă de promovare</strong> — intervalul de timp (6 sau 12 luni) pentru care Promotorul achiziționează Abonamentul Premium, începând de la data confirmării plății.</li>
                <li><strong>Date personale</strong> — orice informație referitoare la o persoană fizică identificată sau identificabilă, conform Regulamentului General privind Protecția Datelor (GDPR).</li>
                <li><strong>Conținut utilizator</strong> — orice text, imagine, fotografie, video, link sau alt material încărcat de Promotor pe Portal în cadrul editării unui Cămin.</li>
                <li><strong>Stripe</strong> — procesatorul de plăți online utilizat de Portal pentru tranzacțiile Abonamentului Premium, operat de Stripe, Inc.</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 2. Identitatea Operatorului
              </h2>
              <div className="bg-navy-deep/5 rounded-lg p-4 space-y-1 text-sm">
                <p><strong>Denumire:</strong> BIOVIVA SRL</p>
                <p><strong>CUI (cod fiscal):</strong> 50826395</p>
                <p><strong>Sediu social:</strong> Strada Margeanului, Nr. 22, Sector 5, 051047 București, România</p>
                <p><strong>Telefon:</strong> +40 785 598 779</p>
                <p><strong>Email:</strong> office@seniore.ro</p>
                <p><strong>Website:</strong> www.seniore.ro</p>
              </div>
              <p>
                BIOVIVA SRL este o societate comercială înregistrată în România,
                supusă legislației române și europene aplicabile. Pentru orice
                comunicare oficială, notificare legală sau solicitare, vă rugăm
                să utilizați datele de contact de mai sus.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 3. Scopul și natura Portalului
              </h2>
              <p>
                Portalul www.seniore.ro este o platformă informativă care are ca
                scop conectarea familiilor și persoanelor interesate cu căminele
                de bătrâni și centrele de îngrijire pentru vârstnici din România.
                Portalul facilitează căutarea, compararea și contactarea directă
                a acestor instituții.
              </p>
              <p><strong>Portalul NU este:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Furnizor de servicii sociale sau medicale;</li>
                <li>Intermediar sau broker între familii și cămine;</li>
                <li>Recomandator sau garant al calității serviciilor oferite de căminele listate;</li>
                <li>Autoritate de licențiere sau reglementare;</li>
                <li>Parte în relațiile contractuale dintre familii și cămine.</li>
              </ul>
              <p>
                Informațiile afișate pe Portal provin din surse publice (lista
                oficială a Ministerului Muncii și Solidarității Sociale, site-uri
                oficiale, registre publice) și din date furnizate voluntar de
                reprezentanții căminelor sau de Promotori.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 4. Contul de utilizator
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">4.1. Înregistrare</h3>
              <p>
                Crearea unui cont de utilizator pe Portal este gratuită.
                Înregistrarea se realizează prin furnizarea unei adrese de email
                valide și a unei parole. Utilizatorul este responsabil pentru
                exactitatea datelor furnizate la înregistrare.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">4.2. Securitatea contului</h3>
              <p>
                Utilizatorul este singurul responsabil pentru păstrarea
                confidențialității parolei și pentru toate activitățile
                desfășurate prin intermediul contului său. Operatorul nu va
                solicita niciodată parola Utilizatorului. În caz de suspiciune
                de acces neautorizat, Utilizatorul trebuie să notifice imediat
                Operatorul la office@seniore.ro.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">4.3. Eligibilitate</h3>
              <p>
                Contul de utilizator poate fi creat doar de persoane fizice care
                au împlinit vârsta de 18 ani sau de reprezentanți legali ai
                persoanelor juridice (cămine, fundații, asociații). Prin
                înregistrare, Utilizatorul declară că îndeplinește această
                condiție.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">4.4. Suspendarea și ștergerea contului</h3>
              <p>
                Operatorul își rezervă dreptul de a suspenda sau șterge orice
                cont de utilizator în următoarele situații:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Furnizarea de date false sau misleading la înregistrare;</li>
                <li>Încălcarea prezentei Termeni și Condiții;</li>
                <li>Activitate frauduloasă sau abuzivă;</li>
                <li>Încărcarea de conținut ilegal, ofensator sau care încalcă drepturile de proprietate intelectuală ale terților;</li>
                <li>Promovarea unui Cămin fără drept legitim de a o face;</li>
                <li>Neutilizarea contului pentru o perioadă mai mare de 24 de luni.</li>
              </ul>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 5. Promovarea Căminelor — Abonamentul Premium
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">5.1. Descrierea serviciului Premium</h3>
              <p>
                Operatorul oferă posibilitatea ca orice Cămin listat pe Portal să
                fie promovat prin achiziționarea unui Abonament Premium. Acest
                abonament conferă următoarele beneficii pe perioada de promovare:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Afișarea Căminului în secțiunea &quot;Cămine Premium&quot; de pe pagina principală a Portalului;</li>
                <li>Afișarea cu prioritate în rezultatele căutării și în paginile de județ;</li>
                <li>Possibilitatea de a edita detaliile Căminului (nume, adresă, telefon, website, descriere);</li>
                <li>Încărcarea și gestionarea de imagini (fotografii ale clădirii, camerelor, facilităților);</li>
                <li>Afișarea unei descrieri personalizate și a unui highlight promotional;</li>
                <li>Generarea automată a coordonatelor GPS pe baza adresei, pentru afișarea hărții;</li>
                <li>Badge vizual &quot;Premium&quot; pe pagina de detalii și în listări.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">5.2. Pachete și prețuri</h3>
              <div className="bg-navy-deep/5 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>Pachet 6 luni:</strong> 299 RON (TVA inclus) — promovare pentru o perioadă de 6 luni calendaristice</p>
                <p><strong>Pachet 12 luni:</strong> 499 RON (TVA inclus) — promovare pentru o perioadă de 12 luni calendaristice</p>
              </div>
              <p>
                Prețurile sunt exprimate în Lei românești (RON) și includ TVA
                aplicabil conform legislației în vigoare. Operatorul își rezervă
                dreptul de a modifica prețurile oricând, modificările intrând în
                vigoare de la data publicării pe Portal. Pentru abonamentele
                deja achiziționate, prețul plătit la momentul achiziției rămâne
                valabil pe toată perioada de promovare.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">5.3. Procesul de promovare</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Navigarea la pagina Căminului:</strong> Utilizatorul accesează pagina de detalii a Căminului pe care dorește să-l promoveze.</li>
                <li><strong>Inițierea promovării:</strong> Utilizatorul apasă butonul &quot;Vreau să promovez acest cămin&quot; și este redirecționat către Stripe Checkout pentru plata Abonamentului Premium.</li>
                <li><strong>Verificarea dreptului de promovare:</strong> Înainte de plată, sistemul verifică dacă Căminul este deja promovat de alt Utilizator. Dacă Căminul este deja asociat unui alt cont, procesul este oprit și Utilizatorul primește un mesaj de eroare cu instrucțiuni de contactare a Operatorului.</li>
                <li><strong>Plata:</strong> Plata se realizează securizat prin intermediul procesatorului Stripe. Operatorul nu stochează datele cardului bancar — acestea sunt procesate exclusiv de Stripe conform standardului PCI-DSS.</li>
                <li><strong>Confirmarea plății:</strong> După confirmarea plății de către Stripe, Căminul este asociat contului Utilizatorului (Promotor), primește statusul Premium, iar Promotorul este redirecționat către o pagină de editare.</li>
                <li><strong>Editarea detaliilor:</strong> Promotorul poate edita detaliile Căminului (descriere, imagini, adresă, telefon, website) prin intermediul paginii de editare dedicate din secțiunea &quot;Contul meu&quot;.</li>
                <li><strong>Publicarea:</strong> Modificările sunt vizibile pe Portal după salvare. Pagina de detalii a Căminului va afișa datele actualizate din baza de date a Portalului.</li>
              </ol>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">5.4. Alocarea și dreptul de administrare</h3>
              <p>
                La confirmarea plății, Căminul promovat este <strong>alocat
                contului Utilizatorului</strong> care a efectuat plata, prin
                setarea identificatorului de utilizator (user_id) în baza de date
                a Portalului. Această alocare conferă Promotorului dreptul
                exclusiv de a edita detaliile Căminului pe perioada de promovare.
              </p>
              <p>
                <strong>Un Cămin poate fi asociat unui singur cont de
                utilizator.</strong> Dacă un Cămin este deja asociat unui alt
                Utilizator, niciun alt Utilizator nu îl poate promova. În caz de
                dispută privind dreptul de administrare a unui Cămin, Operatorul
                va analiza situația și poate solicita documente justificative
                (acte de proprietate, împuternicire notarială, statut de
                administrator etc.).
              </p>
              <p>
                Promotorul declară prin acceptarea prezentei Termeni și Condiții
                că are drept legitim de a promova și edita datele Căminului
                respectiv. Falsificarea declarării atrage răspunderea civilă și
                penală a Promotorului, conform legislației române în vigoare.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">5.5. Durata și expirarea</h3>
              <p>
                Abonamentul Premium este valabil pentru perioada achiziționată
                (6 sau 12 luni) începând de la data confirmării plății de către
                Stripe. La expirarea perioadei, Căminul pierde statusul Premium
                și beneficiile asociate, dar rămâne listat pe Portal cu datele
                de bază din surse publice.
              </p>
              <p>
                Promotorul poate reînnoi Abonamentul Premium oricând înainte de
                expirare, achiziționând un nou pachet. Reînnoirea nu este
                automată — Promotorul trebuie să inițieze manual o nouă plată.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">5.6. Politica de rambursare</h3>
              <p>
                Abonamentul Premium este un serviciu digital care se activează
                imediat după confirmarea plății. Prin natura sa, serviciul nu
                poate fi returnat după activare. Prin urmare, <strong>plățile
                pentru Abonamentul Premium nu sunt rambursabile</strong>, cu
                următoarele excepții:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dacă plata a fost efectuată din eroare tehnică (dublă încărcare a tranzacției), Operatorul va rambursa suma în excess în termen de 14 zile lucrătoare;</li>
                <li>Dacă Operatorul nu a putut livra serviciul Premium din motive tehnice imputabile Portalului, suma va fi rambursată integral;</li>
                <li>Dacă Promotorul demonstrează că nu a putut utiliza serviciul din motive de indisponibilitate a Portalului pe o perioadă semnificativă (mai mult de 7 zile consecutive), se va calcula o rambursare proporțională pentru perioada de indisponibilitate.</li>
              </ul>
              <p>
                Solicitările de rambursare trebuie trimise la office@seniore.ro
                în termen de 30 de zile de la data plății, însoțite de dovada
                tranzacției și descrierea motivului.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 6. Conținutul utilizatorului
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">6.1. Responsabilitate pentru conținut</h3>
              <p>
                Promotorul este singurul responsabil pentru Conținutul utilizator
                încărcat pe Portal (texte, imagini, fotografii, descrieri).
                Operatorul nu verifică conținutul înainte de publicare și nu
                garantează exactitatea, legalitatea sau adecvarea acestuia.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">6.2. Conținut interzis</h3>
              <p>Promotorul nu are voie să încarce pe Portal:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Imagini sau texte care încalcă drepturile de proprietate intelectuală ale terților (copyright, mărci înregistrate);</li>
                <li>Fotografii cu persoane fizice fără consimțământul acestora (conform GDPR și Legii nr. 190/2018);</li>
                <li>Conținut defăimător, discriminatoriu, ofensator sau care încalcă demnitatea umană;</li>
                <li>Conținut care promovează servicii ilegale sau nelicențiate;</li>
                <li>Informații false sau misleading despre serviciile oferite de Cămin;</li>
                <li>Conținut care conține date personale sensibile (date medicale, date financiare) ale rezidenților sau angajaților;</li>
                <li>Material publicitar pentru terțe părți sau link-uri către site-uri externe cu scop comercial nedeclarat.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">6.3. Licența asupra conținutului</h3>
              <p>
                Prin încărcarea Conținutului utilizator pe Portal, Promotorul
                acordă Operatorului o licență neexclusivă, gratuită, globală și
                neretractabilă pe perioada de promovare, de a afișa, reproduce,
                adapta și distribui Conținutul în scopul operării Portalului.
                Operatorul nu va folosi Conținutul în alte scopuri decât afișarea
                pe Portalul www.seniore.ro.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">6.4. Moderare și eliminare</h3>
              <p>
                Operatorul își rezervă dreptul de a elimina orice Conținut
                utilizator care încalcă prezentele Termeni și Condiții, fără
                notificare prealabilă. În caz de încălcare repetată, Operatorul
                poate suspenda contul Promotorului și anula Abonamentul Premium
                fără rambursare.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 7. Plăți și procesare
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.1. Procesatorul de plăți</h3>
              <p>
                Toate plățile pentru Abonamentul Premium sunt procesate prin
                intermediul Stripe, Inc., un procesator de plăți certificat
                PCI-DSS Level 1. Operatorul nu colectează, nu stochează și nu
                procesează datele cardului bancar al Utilizatorului. Aceste date
                sunt introduse direct pe platforma Stripe și sunt supuse
                politicilor de confidențialitate și securitate ale Stripe.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.2. Securitatea tranzacțiilor</h3>
              <p>
                Tranzacțiile sunt criptate conform standardului TLS (Transport
                Layer Security) și protejate conform regulamentului PSD2
                (Directiva Europeană privind Serviciile de Plată), inclusiv
                autentificarea puternică a clientului (SCA — Strong Customer
                Authentication).
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.3. Facturare</h3>
              <p>
                Operatorul va emite factură fiscală pentru fiecare tranzacție,
                conform legislației fiscale române. Factura va fi trimisă la
                adresa de email a Promotorului. Pentru emiterea facturii în
                numele unei persoane juridice, Promotorul trebuie să furnizeze
                datele de facturare complete (denumire, CUI, adresă, cont bancar)
                la office@seniore.ro în termen de 5 zile de la plată.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">7.4. Moneda și taxe</h3>
              <p>
                Toate prețurile sunt exprimate în Lei românești (RON) și includ
                TVA aplicabil conform legislației în vigoare. Nu se aplică taxe
                suplimentare ascunse. Prețul afișat la momentul achiziției este
                prețul final plătit de Promotor.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 8. Protecția datelor personale (GDPR)
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.1. Operator de date personale</h3>
              <p>
                BIOVIVA SRL, în calitate de operator de date personale conform
                Regulamentului (UE) 2016/679 (GDPR) și Legii nr. 190/2018,
                colectează și procesează datele personale ale Utilizatorilor în
                scopul operării Portalului și al furnizării serviciilor
                descrise în prezentele Termeni și Condiții.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.2. Date colectate</h3>
              <p>
                Operatorul colectează următoarele categorii de date personale:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Date de identificare:</strong> adresa de email (pentru contul de utilizator);</li>
                <li><strong>Date de contact:</strong> nume, telefon, adresă (furnizate voluntar la editarea Căminului);</li>
                <li><strong>Date de tranzacție:</strong> ID-ul tranzacției Stripe, suma, data plății (nu datele cardului);</li>
                <li><strong>Date tehnice:</strong> adresa IP, tip browser, date de navigare (prin cookies, conform Politicii de Cookies).</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.3. Scopul procesării</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Crearea și gestionarea contului de utilizator;</li>
                <li>Furnizarea și gestionarea Abonamentului Premium;</li>
                <li>Procesarea plăților și emiterea facturilor;</li>
                <li>Comunicarea cu Utilizatorii (notificări, suport, informații);</li>
                <li>Îmbunătățirea și securitatea Portalului;</li>
                <li>Conformitatea cu obligațiile legale.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.4. Temeiul legal</h3>
              <p>
                Procesarea datelor personale se bazează pe: (i) consimțământul
                Utilizatorului (art. 6 alin. 1 lit. a GDPR); (ii) executarea
                unui contract (Abonamentul Premium) (art. 6 alin. 1 lit. b GDPR);
                (iii) interesul legitim al Operatorului de a opera și securiza
                Portalul (art. 6 alin. 1 lit. f GDPR); (iv) obligații legale
                (art. 6 alin. 1 lit. c GDPR).
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.5. Drepturile Utilizatorului</h3>
              <p>Conform GDPR, Utilizatorul are următoarele drepturi:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dreptul de acces:</strong> solicitarea unei copii a datelor personale procesate;</li>
                <li><strong>Dreptul la rectificare:</strong> corectarea datelor inexacte sau incomplete;</li>
                <li><strong>Dreptul la ștergere (&quot;dreptul de a fi uitat&quot;):</strong> solicitarea ștergerii datelor personale;</li>
                <li><strong>Dreptul la limitarea procesării:</strong> restricționarea procesării în anumite condiții;</li>
                <li><strong>Dreptul la portabilitate:</strong> primirea datelor într-un format structurat, utilizabil;</li>
                <li><strong>Dreptul de opoziție:</strong> opunerea procesării bazate pe interes legitim;</li>
                <li><strong>Dreptul de a retrage consimțământul:</strong> oricând, fără a afecta legalitatea procesării anterioare.</li>
              </ul>
              <p>
                Pentru exercitarea acestor drepturi, Utilizatorul poate contacta
                Operatorul la office@seniore.ro. Răspunsul va fi furnizat în
                termen de 30 de zile conform art. 12 GDPR.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.6. Perioada de conservare</h3>
              <p>
                Datele personale sunt conservate pe perioada utilizării Portalului
                de către Utilizator și ulterior pentru perioada necesară
                conformității cu obligațiile legale (fiscale, contabile — 10 ani
                conform legislației fiscale române). Datele de navigare (cookies)
                sunt conservate conform Politicii de Cookies.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">8.7. Autoritatea națională</h3>
              <p>
                În caz de încălcare a drepturilor de protecție a datelor,
                Utilizatorul poate depune o plângere la Autoritatea Națională de
                Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP),
                cu sediul în B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1,
                cod poștal 010336, București, România, telefon: +40 318 059 211,
                email: anspdcp@dataprotection.ro, website: www.dataprotection.ro.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 9. Licențierea căminelor
              </h2>
              <p>
                Statusul de licențiere afișat pe Portal pentru fiecare Cămin este
                verificat conform listei oficiale publicate de Ministerul Muncii
                și Solidarității Sociale (MMJS). Această informație are caracter
                informativ și poate suferi modificări între actualizările
                Portalului.
              </p>
              <p>
                Pentru confirmarea actuală a statusului de licențiere,
                Utilizatorul este îndrumat să consulte sursa oficială
                (site-ul MMJS) sau să contacteze direct Căminul. Operatorul nu
                răspunde pentru deciziile luate pe baza informațiilor de
                licențiere afișate pe Portal.
              </p>
              <p>
                Promotorii care editează datele unui Cămin nu pot modifica
                statusul de licențiere — acest câmp este gestionat exclusiv de
                Operator pe baza surselor oficiale.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 10. Răspunderea Operatorului
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.1. Limitarea răspunderii</h3>
              <p>
                Operatorul nu este furnizor de servicii sociale sau medicale și
                nu răspunde pentru calitatea, legalitatea sau adecvarea
                serviciilor oferite de căminele listate pe Portal. Decizia de
                alegere a unui Cămin aparține exclusiv familiei sau persoanei
                interesate.
              </p>
              <p>
                Operatorul depune eforturi rezonabile pentru a menține datele
                actualizate și exacte, dar nu garantează exactitatea completă a
                informațiilor afișate. Informațiile pot deveni învechite între
                actualizările Portalului.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.2. Excluderea răspunderii</h3>
              <p>
                În cea mai mare măsură permisă de legislația aplicabilă,
                Operatorul nu răspunde pentru:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Daune directe sau indirecte rezultate din utilizarea sau imposibilitatea de a utiliza Portalul;</li>
                <li>Daune rezultate din informații inexacte sau incomplete afișate pe Portal;</li>
                <li>Daune rezultate din Conținutul utilizator încărcat de Promotori;</li>
                <li>Daune rezultate din relațiile contractuale dintre familii și cămine;</li>
                <li>Întreruperi de serviciu din motive tehnice, atacuri cibernetice sau mentenanță;</li>
                <li>Pierderea de date din cauza unor evenimente în afara controlului Operatorului.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">10.3. Răspunderea Promotorului</h3>
              <p>
                Promotorul răspunde integral pentru:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Exactitatea informațiilor furnizate la editarea Căminului;</li>
                <li>Legalitatea Conținutului utilizator încărcat;</li>
                <li>Deținerea drepturilor de proprietate intelectuală asupra imaginilor încărcate;</li>
                <li>Obținerea consimțământului persoanelor fotografiate;</li>
                <li>Dreptul legitim de a promova Căminul respectiv;</li>
                <li>Orice daune suferite de Operator sau terți din cauza Conținutului încărcat.</li>
              </ul>
              <p>
                Promotorul obligă Operatorul la indemnitate pentru orice
                pretenții, daune, cheltuieli de judecată sau amenzi rezultate
                din încălcarea obligațiilor sale.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 11. Proprietatea intelectuală
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">11.1. Drepturile Operatorului</h3>
              <p>
                Portalul www.seniore.ro, incluzând designul, codul sursă,
                structura, elementele grafice, logo-ul, textele originale,
                baza de date și toate elementele de proprietate intelectuală,
                aparțin în exclusivitate Operatorului BIOVIVA SRL și sunt
                protejate conform Legii nr. 8/1996 privind dreptul de autor și
                drepturile conexe și legislației aplicabile privind proprietatea
                intelectuală.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">11.2. Utilizarea Portalului</h3>
              <p>
                Utilizatorul nu are voie să:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reproducă, copieze, distribuie sau comercializeze conținutul Portalului fără acordul scris al Operatorului;</li>
                <li>Extragă automat date de pe Portal prin metode de scraping, crawling sau alte metode tehnice;</li>
                <li>Folosească Portalul în scopuri comerciale fără acordul Operatorului;</li>
                <li>Modifice, adapteze sau creeze opere derivate din conținutul Portalului;</li>
                <li>Folosească logo-ul sau marca Portalului fără acordul scris al Operatorului.</li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">11.3. Conținutul utilizator</h3>
              <p>
                Drepturile de proprietate intelectuală asupra Conținutului
                utilizator rămân la Promotor. Operatorul primește doar licența
                de afișare conform Articolului 6.3.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 12. Forța majoră
              </h2>
              <p>
                Operatorul nu răspunde pentru neexecutarea sau executarea
                defectuoasă a obligațiilor sale în caz de forță majoră, conform
                art. 1351 din Codul Civil român. Forța majoră include evenimente
                imprevizibile și incontrolabile, cum ar fi: catastrofe naturale,
                epidemii, acte de terrorism, război, tulburări civile, atacuri
                cibernetice de amploare, defecțiuni ale infrastructurii internet,
                decizii guvernamentale sau ale autorităților competente.
              </p>
              <p>
                În caz de forță majoră, Operatorul va notifica Utilizatorii în
                termen rezonabil și va lua măsuri pentru restabilirea serviciilor
                în cel mai scurt timp posibil. Perioada de promovare a
                Abonamentului Premium va fi prelungită corespunzător cu durata
                evenimentului de forță majoră.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 13. Rezolvarea litigiilor
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">13.1. Soluționarea amiabilă</h3>
              <p>
                În caz de litigiu între Operator și Utilizator/Promotor, părțile
                vor încerca soluționarea amiabilă prin negociere directă.
                Solicitările trebuie trimise la office@seniore.ro cu o descriere
                detaliată a problemei.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">13.2. Mediere</h3>
              <p>
                Dacă soluționarea amiabilă nu este posibilă în termen de 30 de
                zile, părțile pot apela la mediere conform Legii nr. 192/2006
                privind medierea și organizarea profesiei de mediator. Medierea
                are caracter facultativ și nu privează părțile de dreptul de a
                apela la instanța judecătorească.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">13.3. Competența jurisdicțională</h3>
              <p>
                În cazul în care litigiul nu poate fi soluționat pe cale amiabilă
                sau prin mediere, acesta va fi soluționat de instanțele
                judecătorești competente din municipiul București, România,
                conform legislației române aplicabile.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">13.4. Legislație aplicabilă</h3>
              <p>
                Prezentele Termeni și Condiții sunt guvernate de legislația
                română, inclusiv dar fără a se limita la: Codul Civil român
                (Legea nr. 287/2009), Codul de Procedură Civilă, Legea nr.
                365/2002 privind comerțul electronic, Legea nr. 190/2018 privind
                protecția datelor personale, Regulamentul (UE) 2016/679 (GDPR),
                Legea nr. 8/1996 privind dreptul de autor, OG nr. 21/1992 privind
                protecția consumatorilor și OUG nr. 34/2014 privind drepturile
                consumatorilor în contractele încheiate la distanță.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">13.5. Alternative de soluționare (SAL)</h3>
              <p>
                Conform OUG nr. 34/2014, Utilizatorul are dreptul de a sesiza
                organismul alternativ de soluționare a litigiilor (SAL) competent.
                Pentru România, organismul competent este Autoritatea Națională
                pentru Protecția Consumatorilor (ANPC), care poate fi contactată
                la: telefon 0800 080 999 (TelVerde gratuit), email:
                anpc@anpc.ro, website: www.anpc.ro. Platforma europeană de
                soluționare online a litigiilor este disponibilă la:
                https://ec.europa.eu/consumers/odr.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-navy-deep">
                Articol 14. Dispoziții finale
              </h2>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">14.1. Modificarea Termenilor și Condițiilor</h3>
              <p>
                Operatorul își rezervă dreptul de a modifica prezentele Termeni
                și Condiții oricând. Modificările intră în vigoare de la data
                publicării pe Portal. Utilizatorul este îndrumat să consulte
                periodic această pagină pentru a fi la curent cu eventualele
                modificări.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">14.2. Severabilitatea</h3>
              <p>
                Dacă o dispoziție a prezentei Termeni și Condiții este declarată
                nulă sau inaplicabilă de o instanță competentă, celelalte
                dispoziții rămân în vigoare. Dispoziția nulă va fi înlocuită cu
                o dispoziție cu efect echivalent, conform intenției inițiale a
                părților.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">14.3. Renunțarea la drepturi</h3>
              <p>
                Nerenunțarea Operatorului la exercitarea unui drept sau la
                aplicarea unei dispoziții a prezentei Termeni și Condiții în
                anumite circumstanțe nu constituie renunțare generală la acel
                drept sau dispoziție.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">14.4. Cesionarea</h3>
              <p>
                Utilizatorul nu poate cesiona drepturile și obligațiile sale
                rezultate din prezentele Termeni și Condiții fără acordul scris
                al Operatorului. Operatorul poate cesiona drepturile sale către
                o societate afiliată sau unui succesor în urma unei reorganizări
                juridice.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">14.5. Documente conexe</h3>
              <p>
                Prezentele Termeni și Condiții se completează cu:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Politica de Confidențialitate</strong> — detalii privind colectarea și procesarea datelor personale;</li>
                <li><strong>Politica de Cookies</strong> — informații despre utilizarea cookie-urilor pe Portal;</li>
                <li><strong>Termenii și Condițiile Stripe</strong> — regulile procesatorului de plăți, disponibile la https://stripe.com/legal.</li>
              </ul>
              <p>
                În caz de conflict între prezentele Termeni și Condiții și
                documentele conexe, prevalează prezentele Termeni și Condiții.
              </p>
              <h3 className="font-heading text-lg font-semibold text-navy-deep">14.6. Contact</h3>
              <p>
                Pentru orice întrebare, clarificare sau solicitare legată de
                prezentele Termeni și Condiții, vă rugăm să contactați:
              </p>
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
