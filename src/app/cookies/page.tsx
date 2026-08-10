import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-8">
            Politica de cookies
          </h1>
          <div className="space-y-6 text-navy-deep/70 leading-relaxed">
            <p>
              Portalul www.seniore.ro folosește cookie-uri pentru a
              asigura funcționarea corectă și pentru a îmbunătăți experiența
              utilizatorilor.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              1. Ce sunt cookie-urile
            </h2>
            <p>
              Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău
              atunci când vizitezi un site web. Ele permit site-ului să
              memoreze acțiunile și preferințele tale.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              2. Cookie-uri tehnice
            </h2>
            <p>
              Aceste cookie-uri sunt necesare pentru funcționarea portalului și
              nu pot fi dezactivate. Asigură navigarea, securitatea și
              afișarea corectă a conținutului.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              3. Cookie-uri analitice
            </h2>
            <p>
              Folosim cookie-uri analitice pentru a înțelege cum utilizezi
              portalul, astfel încât să putem îmbunătăți conținutul și
              funcționalitatea. Aceste date sunt anonime.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              4. Gestionarea cookie-urilor
            </h2>
            <p>
              Poți gestiona sau șterge cookie-urile din setările browserului
              tău. Dezactivarea cookie-urilor tehnice poate afecta
              funcționalitatea portalului.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              5. Contact
            </h2>
            <p>
              Pentru întrebări despre politica de cookies, contactează-ne la
              office@seniore.ro.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
