import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function ConfidentialitatePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-8">
            Politica de confidențialitate
          </h1>
          <div className="prose prose-navy max-w-none space-y-6 text-navy-deep/70 leading-relaxed">
            <p>
              Seniore.ro respectă confidențialitatea
              utilizatorilor portalului www.seniore.ro. Această politică
              descrie cum colectăm, folosim și protejăm datele personale.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              1. Date colectate
            </h2>
            <p>
              Colectăm date pe care le furnizați voluntar: nume, email, telefon
              — prin formularul de contact sau la adăugarea unui centru. Nu
              colectăm date sensibile despre vârstnici sau beneficiari.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              2. Utilizarea datelor
            </h2>
            <p>
              Datele sunt folosite exclusiv pentru procesarea cererilor tale și
              îmbunătățirea serviciilor portalului. Nu vindem și nu transmitem
              datele către terți în scopuri comerciale.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              3. Cookie-uri
            </h2>
            <p>
              Portalul folosește cookie-uri tehnice necesare funcționării și
              cookie-uri analitice pentru a înțelege modul de utilizare. Poți
              gestiona preferințele din setările browserului.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              4. Drepturile tale
            </h2>
            <p>
              Conform GDPR, ai dreptul de a accesa, rectifica, șterge și
              restricționa prelucrarea datelor personale. Pentru orice cerere,
              contactează-ne la office@seniore.ro.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              5. Securitate
            </h2>
            <p>
              Aplicăm măsuri tehnice și organizatorice pentru protejarea
              datelor împotriva accesului neautorizat, alterării sau distrugerii.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
