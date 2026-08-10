import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function TermeniPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-8">
            Termeni și condiții
          </h1>
          <div className="space-y-6 text-navy-deep/70 leading-relaxed">
            <p>
              Prin utilizarea portalului www.seniore.ro accepți următorii
              termeni și condiții.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              1. Scopul portalului
            </h2>
            <p>
              Portalul are rol informativ — conectează familiile cu căminele de
              bătrâni din România. Informațiile afișate provin din surse publice
              și date furnizate de cămine.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              2. Exactitatea datelor
            </h2>
            <p>
              Depunem eforturi pentru a menține datele actualizate, dar nu
              garantăm exactitatea completă a informațiilor. Verifică direct cu
              căminul înainte de a lua o decizie.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              3. Licențierea
            </h2>
            <p>
              Statusul de licențiere este verificat conform listei oficiale a
              Ministerului Muncii și Solidarității Sociale. Pentru confirmare
              actuală, consultă sursa oficială.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              4. Răspundere
            </h2>
            <p>
              Portalul nu este furnizor de servicii sociale și nu răspunde pentru
              calitatea serviciilor oferite de căminele listate. Decizia de
              alegere a unui cămin aparține exclusiv familiei.
            </p>
            <h2 className="font-heading text-xl font-bold text-navy-deep">
              5. Adăugare și eliminare
            </h2>
            <p>
              Oricare cămin poate solicita adăugarea gratuită în portal. De
              asemenea, poate solicita eliminarea sau modificarea datelor
              oricând, contactându-ne la office@seniore.ro.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
