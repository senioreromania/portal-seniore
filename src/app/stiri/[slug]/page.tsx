"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Download,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import { newsArticleJsonLd, breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  paragraphs: string[];
  pdfHref?: string;
};

const articles: Record<string, Article> = {
  "noul-nomenclator-servicii-sociale-2026": {
    slug: "noul-nomenclator-servicii-sociale-2026",
    title:
      "Noul Nomenclator al serviciilor sociale 2026 — ce se schimbă pentru căminele de bătrâni",
    excerpt:
      "HG 268/2026 simplifică codurile serviciilor sociale de la 76 la 31 și introduce o nouă clasificare bazată pe CAEN Rev. 3. Ce înseamnă asta pentru căminele de bătrâni licențiate din România.",
    date: "12 August 2026",
    category: "Legislație",
    image: "/stiri/noul-nomenclator-servicii-sociale-2026.jpg",
    paragraphs: [
      "Guvernul României a adoptat la 23 aprilie 2026 Hotărârea nr. 268/2026 pentru aprobarea noului Nomenclator al serviciilor sociale, publicat în Monitorul Oficial nr. 342 din 28 aprilie 2026. Actul normativ a intrat în vigoare la 1 iulie 2026 și abrogă HG 867/2015, care reglementa vechiul nomenclator.",
      "Principala schimbare este simplificarea drastică a codurilor de servicii sociale: de la 76 de coduri, cât prevedea vechiul nomenclator, la doar 31. Noua codificare este bazată pe clasificarea CAEN Rev. 3 și folosește un format structurat: cod CAEN, tip major și acronim pentru categoria de beneficiari.",
      "Pentru căminele de bătrâni, codul relevant este 873.1.1.CR.PV — Centru Rezidențial pentru Persoane Vârstnice. Definiția din nomenclator descrie aceste centre ca servicii sociale care asigură condițiile necesare pentru o viață asistată, destinate persoanelor cu nevoi majore de îngrijire, respectiv persoanelor vârstnice dependente care nu mai pot fi îngrijite la domiciliul propriu sau în familie și aleg să trăiască într-un mediu asistat sau instituționalizat.",
      "Activitățile prevăzute pentru centrele rezidențiale includ: cazare pe perioadă nedeterminată sau determinată, alimentație — hrană zilnică, îngrijiri personale — ajutor pentru activitățile de bază ale vieții zilnice, asistență medicală curentă asigurată de asistenți medicali generaliști, inserție și reinserție socială, terapie ocupațională, consiliere și informare, orientare vocațională, consiliere juridică, pază și menaj.",
      "Nomenclatorul introduce acronime clare pentru categoriile de beneficiari: C pentru copii, D pentru persoane adulte cu dizabilități, PV pentru persoane vârstnice, VD pentru victime ale violenței domestice, PFA pentru persoane fără adăpost și AGV pentru alte grupuri vulnerabile. Pentru centrele multifuncționale care deservesc mai multe categorii, se folosește acronimul MF.",
      "O prevedere importantă pentru furnizorii existenți: licențele de funcționare eliberate cu vechile coduri din HG 867/2015 rămân valabile până la expirarea perioadei de valabilitate. La relicențiere, se vor emite licențe cu noile coduri, fără a fi necesară eliberarea unei noi licențe înainte de expirarea celei actuale.",
      "Ministerul Muncii are obligația de a actualiza, în termen de 60 de zile de la intrarea în vigoare, standardele minime de calitate pentru a fi aliniate cu noul nomenclator. Această actualizare a fost deja parțial realizată prin Ordinul nr. 507/2026, care aprobă standardele specifice minime de calitate pentru serviciile sociale cu cazare, și prin Ordinul nr. 834/2026, care aduce modificări suplimentare începând cu 30 iunie 2026.",
      "Pentru căminele de bătrâni membre Seniore.ro, schimbarea nu aduce modificări imediate în funcționare, dar necesită actualizarea documentelor la momentul relicențierii. Seniore.ro va oferi suport membrilor săi pentru adaptarea la noile cerințe de codificare și va continua advocacy-ul pentru simplificarea procedurilor de licențiere.",
    ],
  },
  "scrisoare-deschisa-ministerul-muncii-iulie-2026": {
    slug: "scrisoare-deschisa-ministerul-muncii-iulie-2026",
    title:
      "Scrisoare deschisă către Ministerul Muncii: controale orientate către om, nu către hârtii",
    excerpt:
      "Seniore.ro a transmis oficial Ministerului Muncii (nr. înreg. 61/23.07.2026) o scrisoare deschisă care cere continuarea simplificării procedurilor de licențiere și reorientarea sistemului de control către protejarea efectivă a beneficiarilor — pe fondul scrisorii Comisarului pentru Drepturile Omului al Consiliului Europei adresate Guvernului României.",
    date: "23 Iulie 2026",
    category: "Advocacy",
    image: "/stiri/scrisoare-ministerul-muncii-2026.jpg",
    pdfHref: "/documents/scrisoare-deschisa-ministerul-muncii-2026-07-23.pdf",
    paragraphs: [
      "Seniore.ro (Seniore.ro) a transmis miercuri, 23 iulie 2026, o scrisoare deschisă domnului Dragoș-Nicolae Pîslaru, ministrul Muncii, Familiei, Tineretului și Solidarității Sociale, prin care solicită continuarea procesului de simplificare a procedurilor de licențiere și orientarea sistemului de control către protejarea efectivă a beneficiarilor.",
      "Demersul vine în contextul scrisorii adresate Guvernului României de Comisarul pentru Drepturile Omului al Consiliului Europei, domnul Michael O'Flaherty — document care readuce în atenția autorităților necesitatea unei reforme profunde a sistemului de asistență socială. Comisarul constată, între altele, un deficit persistent de servicii de îngrijire, exact în contextul îmbătrânirii populației și al creșterii nevoilor: nevoia reală de servicii depășește capacitatea actuală a sistemului public, iar extinderea acestei capacități nu este posibilă fără încurajarea și sprijinirea căminelor de bătrâni licențiați.",
      "Seniore.ro apreciază că aceste concluzii confirmă faptul că problemele sistemului românesc nu sunt generate de existența unor proceduri insuficient de birocratice, ci de incapacitatea autorităților de a identifica și opri, la timp, activitățile desfășurate complet în afara cadrului legal. Experiența ultimilor ani arată că furnizorii licențiați au fost supuși unui număr foarte mare de controale și obligații documentare, în timp ce numeroase centre ilegale au funcționat ani de zile fără a fi oprite.",
      "Excesul de birocrație consumă resurse financiare și umane care ar trebui direcționate către creșterea calității serviciilor, angajarea și pregătirea personalului, investiții în îngrijirea beneficiarilor și dezvoltarea de noi locuri pentru persoanele vulnerabile. Așa cum recomandă și Comisarul, inspecțiile trebuie să urmărească în primul rând respectarea drepturilor și bunăstării beneficiarilor — nu exclusiv îndeplinirea unor standarde formale.",
      "În scrisoare, Seniore.ro solicită Ministerului Muncii: (1) continuarea simplificării procedurilor de licențiere și relicențiere; (2) eliminarea cerințelor administrative care nu contribuie real la calitatea serviciilor; (3) diferențierea clară între furnizorii autorizați și cei care operează ilegal; (4) orientarea controalelor către evaluarea efectivă a calității și a respectării drepturilor beneficiarilor; (5) deschiderea mecanismelor publice de finanțare — subvenții, decontări, fonduri europene — către toți furnizorii licențiați, indiferent de forma juridică de organizare; (6) constituirea unui grup permanent de lucru cu reprezentanții căminelor de bătrâni.",
      "Un punct central al scrisorii este neutralitatea formei juridice: accesul la finanțarea publică trebuie condiționat de deținerea licenței de funcționare și de calitatea serviciilor, nu de forma de organizare a furnizorului. Limitarea acestor mecanisme la asociații și fundații lasă nevalorificată capacitatea investițională a societăților comerciale licențiate — iar un model funcțional există deja în sănătate, unde furnizorii privați, indiferent de forma juridică, contractează servicii cu casele de asigurări.",
      "Documentul integral, înregistrat la minister cu nr. 61/23.07.2026, poate fi descărcat mai jos. Acțiunea continuă demersurile Seniore.ro pentru un cadru de licențiere echitabil — inclusiv petiția privind eliminarea autorizației ISU dintre documentele obligatorii pentru licențiere, deschisă semnăturilor pe camine-de-batrani-romania.ro/petitii.",
    ],
  },
  "casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti": {
    slug: "casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti",
    title: "Casa Alegria — Centru rezidențial pentru vârstnici în Ploiești",
    excerpt:
      "Două centre rezidențiale licențiate în Ploiești, pe strada Tudor Vladimirescu. Cazare, hrană, îngrijiri medicale, recuperare și asistență psihologică — într-o atmosferă caldă, ca acasă.",
    date: "10 Mai 2026",
    category: "Membri",
    image: "/stiri/casa-alegria.jpg",
    paragraphs: [
      "Casa Alegria oferă servicii de cazare pe perioadă nedeterminată persoanelor vârstnice care se află în imposibilitatea de a se gospodări și îngriji singure. Aici, fiecare beneficiar găsește găzduire, hrană, îngrijire și, mai presus de toate, o comunitate caldă în care să se simtă ca acasă.",
      "Două locații în Ploiești, pe strada Tudor Vladimirescu nr. 97 (înființată în 2019) și nr. 80 (înființată în 2022), oferă servicii sociale licențiate pentru persoane vârstnice.",
      "Servicii de îngrijire: găzduire, trei mese principale și două gustări zilnic, preparare de hrană caldă, spălarea îmbrăcămintei și a lenjeriei. Îngrijirea personală include ajutor la activitățile de zi cu zi – îmbrăcat, servirea mesei, igienă și deplasare – cu respect pentru ritmul fiecărei persoane.",
      "Asistență medicală și recuperare: beneficiarii primesc asistență medicală, consultații și tratament prescrise de medic, supraveghere, prim ajutor și administrarea medicației. Serviciile de recuperare și readaptare sunt completate de consiliere psihologică.",
      "Asistență socială și emoțională: echipa elaborează pentru fiecare beneficiar un plan de intervenție și îngrijire, oferind consiliere socială, suport emoțional și religios, terapii de relaxare și de reintegrare socială.",
      "Viață socială și petrecerea timpului liber: activitățile de ergoterapie, evenimentele și sărbătorile petrecute împreună fac parte din viața de zi cu zi a Casei Alegria.",
      "Contact: Str. Tudor Vladimirescu nr. 97 și nr. 80, Ploiești · 0736 465 640 · alegriaresidence.ro",
    ],
  },
  "casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges": {
    slug: "casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges",
    title:
      "Casa Orizont — Cămin pentru vârstnici în natură, Beleți-Negrești, Argeș",
    excerpt:
      "Cămin pentru vârstnici la poalele Carpaților, în Beleți-Negrești, Argeș. Clădire de epocă restaurată, mobilier de anticariat, grădină de 12.000 mp și îngrijire medicală — pentru o bătrânețe demnă și liniștită.",
    date: "8 Mai 2026",
    category: "Membri",
    image: "/stiri/casa-orizont.jpg",
    paragraphs: [
      "Casa Orizont înseamnă mai mult decât un simplu centru de îngrijire medicală. Înseamnă o mare familie din care facem toți parte – rezidenți, personalul de îngrijire și echipa managerială deopotrivă.",
      "Înseamnă reîntoarcerea la viața rurală și la natură, unde mulți seniori, rămași singuri sau cu probleme de sănătate, aleg să trăiască o bătrânețe liniștită – bucurându-se de o viață socială activă, de noi prieteni, de activități comune ori de relaxare în bibliotecă, la o plimbare în grădină sau în fața televizorului.",
      "Clădirea Casa Orizont este rezultatul restaurării radicale a unei structuri de mari dimensiuni, construită în 1963. Restaurarea atentă și pasionată s-a întins pe o durată de 5 ani, sub îndrumarea permanentă a arhitecților români și italieni, păstrând nealterate volumele și structura originală.",
      "Amenajarea interioară a fost realizată de profesioniști italieni. Mobilierul este reprezentat de piese de anticariat din Italia și Franța anilor 1860–1920, iar pereții sunt acoperiți cu picturi și lucrări grafice europene.",
      "La exterior, Casa Orizont pune la dispoziția rezidenților două terase acoperite de câte 400 mp fiecare și o grădină de 12.000 mp, cu alei, spații de relaxare cu bănci și mese, flori, arbuști ornamentali și livadă.",
      "Cazare în regim hotelier de 3 stele, în 26 de camere spațioase. Alimentația constă în 3 mese principale, cu meniu diversificat și personalizat în funcție de afecțiunea fiecărui rezident.",
      "Centrul dispune de cabinet medical dotat și de o echipă care include medic generalist, psihiatru și neurolog, asistente medicale, kinetoterapeut, terapeut ocupațional și infirmiere.",
      "Contact: Sat Beleți, comuna Beleți-Negrești, jud. Argeș (lângă Topoloveni, D.N.7) · 0724 621 322 · casaorizont.com",
    ],
  },
  "luxor-clinic-centru-de-ingrijire-medicala-pentru-varstnici-in-pitesti-arges": {
    slug: "luxor-clinic-centru-de-ingrijire-medicala-pentru-varstnici-in-pitesti-arges",
    title:
      "Luxor Clinic — Centru de îngrijire medicală pentru vârstnici, Pitești – Argeș",
    excerpt:
      "Centru de îngrijire medicală pentru vârstnici și pacienți care au nevoie de tratamente zilnice și supraveghere permanentă, în Pitești, Argeș. Medicină aplicată zi de zi, într-un mediu modern, sigur și uman.",
    date: "5 Mai 2026",
    category: "Membri",
    image: "/stiri/luxor-clinic.jpg",
    paragraphs: [
      "Luxor Clinic este un centru de îngrijire medicală continuă, dedicat vârstnicilor și pacienților care necesită tratamente zilnice, supraveghere permanentă și sprijin în recuperare – într-un mediu sigur, discret și elegant.",
      "Am construit acest centru din convingerea că îngrijirea nu trebuie să însemne compromis, ci normalitate medicală: curățenie impecabilă, tratamente aplicate corect, comunicare clară și atmosferă umană.",
      "Aici, medicina este practicată zi de zi. Oferim servicii medicale de calitate superioară: tratăm, monitorizăm și intervenim permanent. Ca un cămin de bătrâni modern din Pitești, oferim și susținere umană, rutine stabile și respect pentru ritmul fiecărui pacient.",
      "Prevenția, parte din tratament. Profilaxia este una dintre provocările noastre cele mai mari. Ne asumăm prevenția ca parte din tratamentul zilnic – nu doar ca un principiu teoretic. Fiecare escară evitată, fiecare complicație prevenită, fiecare pacient care rămâne stabil este rezultatul unei griji reale, continue și bine coordonate.",
      "Ne pasă de fiecare detaliu: de la perfuzii și pansamente moderne, până la iluminarea din cameră sau atmosfera din grădină, totul este gândit pentru binele pacientului.",
      "Respectăm demnitatea fiecărui pacient: fiecare persoană are o poveste medicală emoțională. Ne adaptăm, ascultăm și acționăm cu grijă – pentru o îngrijire completă, nu generalizată.",
      "Contact: Str. Mitropolit Antim Ivireanu nr. 39, Pitești, Argeș · 0744 880 033 · luxorclinic.ro",
    ],
  },
  "longevita-centru-rezidential-si-medical-pentru-seniori-in-bucuresti-ilfov": {
    slug: "longevita-centru-rezidential-si-medical-pentru-seniori-in-bucuresti-ilfov",
    title:
      "LONGEVITA — Centru rezidențial și medical pentru seniori în București–Ilfov",
    excerpt:
      "Centru rezidențial și medical pentru seniori în Otopeni, Ilfov. Cu peste 14 ani de experiență, LONGEVITA oferă îngrijire permanentă, recuperare și sprijin emoțional, într-un spațiu construit pe demnitate și grijă.",
    date: "3 Mai 2026",
    category: "Membri",
    image: "/stiri/longevita.jpg",
    paragraphs: [
      "Există un moment în viața fiecărei familii în care grija pentru părinți devine mai mult decât o responsabilitate emoțională. Devine o provocare reală, de zi cu zi.",
      "Peste 3,7 milioane de români au peste 65 de ani, iar aproximativ 20% din populație este deja considerată îmbătrânită. Mai mult decât atât, peste 1,3 milioane de seniori trăiesc singuri sau în izolare.",
      "Povestea centrului LONGEVITA începe simplu, dar profund uman. Nu dintr-un plan de business, ci dintr-o nevoie concretă de a oferi seniorilor un spațiu în care să fie văzuți, ascultați și îngrijiți 24 de ore din 24.",
      "LONGEVITA nu este doar un cămin privat de bătrâni din București–Ilfov, ci un centru rezidențial și medical construit în jurul ideii de echilibru între sănătate, autonomie și conexiune umană.",
      "Îngrijirea medicală este permanentă, susținută de o echipă dedicată care monitorizează constant starea fiecărui rezident și adaptează intervențiile în funcție de nevoile reale. Recuperarea nu este tratată ca un serviciu secundar, ci ca o componentă esențială a calității vieții.",
      "Consilierea psihologică și stimularea cognitivă sunt integrate natural în viața de zi cu zi, pentru că îmbătrânirea nu înseamnă doar provocări fizice, ci și nevoia de sens, de dialog și de apartenență.",
      "Spațiul în sine este gândit ca un loc în care seniorii să se simtă în siguranță, dar și confortabil. Camerele, zonele comune și facilitățile medicale sunt completate de ceva mai greu de cuantificat: atmosfera.",
      "Contact: Calea Bucureștilor nr. 16, Otopeni, Ilfov · fundatialongevita.ro",
    ],
  },
  "comunicat-de-presa-camine-de-batrani-romania-mogosoaia": {
    slug: "comunicat-de-presa-camine-de-batrani-romania-mogosoaia",
    title:
      "COMUNICAT DE PRESĂ Seniore.ro — Privind materialele apărute în mediul online referitoare la un posibil centru rezidențial din zona Mogoșoaia, Ilfov",
    excerpt:
      "Seniore.ro (Seniore.ro) a luat atitudine față de materialele apărute în mediul online referitoare la un posibil centru rezidențial pentru persoane vârstnice din zona Mogoșoaia, județul Ilfov.",
    date: "2025",
    category: "Comunicat",
    image: "/stiri/comunicat-presa-13-08-2024.png",
    paragraphs: [
      "Seniore.ro a luat atitudine față de materialele apărute în mediul online referitoare la un posibil centru rezidențial pentru persoane vârstnice din zona Mogoșoaia, județul Ilfov.",
      "Patronatul condamnă cu fermitate orice formă de abuz, neglijență sau lipsă de respect în îngrijirea persoanelor vârstnice și consideră că identificarea și sancționarea centrelor ilegale sau care nu respectă standardele minimale de funcționare este o obligație a autorităților.",
      "În același timp, Seniore.ro atrage atenția asupra riscului de a generaliza și eticheta întreaga comunitate a furnizorilor privați de servicii sociale pe baza unor cazuri izolate. Majoritatea căminelor de bătrâni private din România funcționează cu licență, cu personal calificat și cu respect pentru demnitatea beneficiarilor.",
      "Seniore.ro reiterează apelul către autorități: diferențierea clară între furnizorii licențiați și cei care operează ilegal, orientarea controalelor către protecția efectivă a beneficiarilor și eliminarea birocrației care consumă resurse ce ar trebui direcționate către calitatea serviciilor.",
    ],
  },
  "katia-cicala-presedintele-camine-de-batrani-romania-congresul-national-de-imbatranire-activa-2025": {
    slug: "katia-cicala-presedintele-camine-de-batrani-romania-congresul-national-de-imbatranire-activa-2025",
    title:
      "Katia CICALĂ, Președintele Seniore.ro: vocea cămine de bătrâni din România la Congresul Național de Îmbătrânire Activă 2025",
    excerpt:
      "În calitate de Președinte al Seniore.ro și avocat cu experiență, Katia Cicală a participat ca speaker la Congresul Național de Îmbătrânire Activă 2025, în panelul dedicat modelului ideal de îngrijire.",
    date: "2025",
    category: "Eveniment",
    image: "/stiri/katia-cicala-congres-2025.png",
    paragraphs: [
      "În România, îmbătrânirea populației, creșterea numărului de persoane dependente și migrația forței de muncă au dus la presiune crescută pe familii, presiune crescută pe sistemul public și o nevoie reală de implicare profesionistă a furnizorilor privați de servicii sociale.",
      "Katia Cicală, din poziția de Președinte Seniore.ro, a adus în discuție perspectiva furnizorilor privați: centre rezidențiale pentru vârstnici, servicii de îngrijire la domiciliu, servicii pentru persoane cu dizabilități, servicii complementare de tip social-medical.",
      "Mesajul de fond este că sectorul privat nu este un „adversar” al statului, ci un partener necesar, mai ales atunci când nevoile depășesc capacitatea sistemului public.",
      "Una dintre temele recurente este nevoia de echilibru între protecția beneficiarilor și sustenabilitatea furnizorilor. Katia Cicală a abordat aspecte precum: claritatea și stabilitatea legislației, birocrația asociată acreditării, licențierii și raportărilor, diferențierea între situațiile în care se utilizează fonduri publice și cele finanțate integral din resurse private, impactul asupra familiilor.",
      "Faptul că Președintele Seniore.ro a fost invitat să vorbească într-un panel dedicat îngrijirii pe termen lung arată că sectorul privat de servicii sociale este recunoscut ca actor relevant în sistem, vocea furnizorilor privați este inclusă în dezbaterile strategice despre îmbătrânire, și se creează punți între decidenți, specialiști, ONG-uri, mediul universitar și mediul privat.",
      "Participarea Katia Cicală la Congresul Național de Îmbătrânire Activă 2025 marchează un pas important în recunoașterea rolului furnizorilor privați de servicii sociale în sistemul de îngrijire pe termen lung din România.",
    ],
  },
  "conferinta-nationala-camine-de-batrani-romania-2025": {
    slug: "conferinta-nationala-camine-de-batrani-romania-2025",
    title:
      "Conferința Națională Seniore.ro 2025 – Un pas decisiv pentru redefinirea îngrijirii vârstnicilor în România",
    excerpt:
      "Conferința Națională Seniore.ro 2025 de la Poiana Brașov a reunit experți, autorități și furnizori de servicii sociale pentru a dezbate viitorul îngrijirii vârstnicilor și a propune soluții legislative.",
    date: "2025",
    category: "Eveniment",
    image: "/stiri/conferinta-nationala-camine-de-batrani-romania-2025.jpg",
    paragraphs: [
      "Într-un context social marcat de îmbătrânirea accelerată a populației și de provocările persistente din domeniul serviciilor sociale, Seniore.ro a organizat, între 18–20 iunie 2025, la Poiana Brașov, prima Conferință Națională, cu tema centrală: „Îngrijirea vârstnicilor între asistență socială și opțiunea privată”.",
      "Evenimentul a marcat un an de la înființarea oficială a patronatului și a reunit lideri din domeniul social și medical, experți juridici, reprezentanți ai autorităților naționale și locale, precum și furnizori acreditați de servicii sociale din întreaga țară.",
      "Conferința a adus în prim-plan o problemă legislativă actuală: în România, persoanele în vârstă care aleg din proprie inițiativă să locuiască într-un centru privat de îngrijire sunt încadrate automat în regimul de asistență socială – deși nu beneficiază de niciun sprijin public. Această confuzie juridică afectează libertatea de alegere, aduce atingere demnității persoanei și descurajează inițiativa privată sustenabilă.",
      "Seniore.ro solicită o clarificare legislativă urgentă, astfel încât doar cei care beneficiază efectiv de sprijin financiar de la stat să fie incluși în regimul de asistență socială. Vârstnicii care își asumă plata unor servicii private moderne trebuie recunoscuți legal ca beneficiari independenți.",
      "Katia Cicală, președinta Seniore.ro, a deschis lucrările conferinței subliniind importanța cooperării dintre toți actorii implicați: „Dorim să contribuim activ la dezvoltarea unui cadru legal corect și sustenabil pentru serviciile private de îngrijire, într-o societate în care populația îmbătrânește rapid și are nevoie de soluții adaptate, demne și moderne.”",
      "Concluzia generală a fost unanimă: este nevoie de o reformă profundă a sistemului de servicii sociale, în care furnizorii privați să nu mai fie asimilați automat în regimul de asistență socială și în care libertatea de alegere a seniorilor să fie respectată.",
    ],
  },
  "camine-de-batrani-romania-congres-international-ingrijire-termen-lung-polonia": {
    slug: "camine-de-batrani-romania-congres-international-ingrijire-termen-lung-polonia",
    title:
      "Seniore.ro a Participat la Congresul Internațional de Îngrijire pe Termen Lung din Polonia",
    excerpt:
      "Seniore.ro (Seniore.ro) a avut onoarea de a participa la cea de-a 26-a ediție a Congresului Internațional de Îngrijire pe Termen Lung, desfășurat în perioada 17-19 septembrie 2024, la Toruń, Polonia.",
    date: "19 Septembrie 2024",
    category: "Eveniment",
    image: "/stiri/camine-de-batrani-romania-congres-polonia.jpeg",
    paragraphs: [
      "Seniore.ro a avut onoarea de a participa la cea de-a 26-a ediție a Congresului Internațional de Îngrijire pe Termen Lung, desfășurat în perioada 17-19 septembrie 2024, la Toruń, Polonia. Acest eveniment de prestigiu a reunit experți și practicieni din domeniul îngrijirii pe termen lung din peste 30 de țări, oferind o platformă valoroasă pentru schimbul de cunoștințe și experiențe.",
      "Congresul Internațional de Îngrijire pe Termen Lung a inclus sesiuni tematice variate, axate pe modele de organizare și coordonare a îngrijirii pe termen lung, nevoile pacienților și ale angajaților, precum și aspectele medicale ale îngrijirii persoanelor care necesită suport.",
      "Prin prezența sa la acest congres, Seniore.ro își reafirmă angajamentul de a contribui la dezvoltarea și îmbunătățirea serviciilor sociale în România. Reprezentanții au avut ocazia să se inspire din bunele practici internaționale și să colaboreze cu parteneri din întreaga lume.",
      "Congresul Internațional de Îngrijire pe Termen Lung este un eveniment anual de referință în domeniu, reunind profesioniști din întreaga lume pentru a discuta și a împărtăși cele mai recente cercetări, inovații și bune practici.",
      "Participarea Seniore.ro la acest eveniment internațional reprezintă un pas important în direcția dezvoltării și îmbunătățirii serviciilor sociale din România, demonstrând angajamentul de a aduce schimbări pozitive și de a promova excelența în domeniul îngrijirii pe termen lung.",
    ],
  },
  "comunicat-de-presa-13-08-2024": {
    slug: "comunicat-de-presa-13-08-2024",
    title: "Comunicat de Presă 13-08-2024",
    excerpt:
      "Privind situația închiderii unor cămine de bătrâni. Seniore.ro își exprimă poziția fermă pentru condamnarea oricăror acte de neglijență și lipsă de respect în îngrijirea bătrânilor.",
    date: "13 August 2024",
    category: "Comunicat",
    image: "/stiri/comunicat-presa-13-08-2024.png",
    paragraphs: [
      "Seniore.ro își exprimă poziția fermă pentru condamnarea oricăror acte de neglijență și lipsă de respect în îngrijirea bătrânilor.",
      "În contextul în care bătrânii constituie o categorie vulnerabilă și nevoiașă, instituțiile abilitate au obligația de a se asigura că aceștia primesc o îngrijire adecvată și respectuoasă. Regretabil, în ultima perioadă ne-am confruntat cu numeroase cazuri în care persoanele sau instituțiile responsabile cu îngrijirea bătrânilor nu își îndeplinesc atribuțiile în mod corespunzător.",
      "Condămnam cu fermitate această neglijență și susținem derularea procedurilor legale împotriva celor care nu își respectă obligațiile față de bătrânii pe care îi au în grijă. Îndemnăm autoritățile să ia măsuri concrete în acest sens pentru ca practicile de această natură să fie desființate.",
      "Dorim să comunicăm opiniei publice faptul că niciunul dintre căminele închise în ultima perioadă (azi, 13.08.2024, Căminul de Bătrâni din loc. Siliștea Snagovului, jud. Ilfov) NU este membru al Seniore.ro. Membrii patronatului se supun unor reguli clare și orice entitate dorește să se afilieze nouă, trebuie să acționeze cu grijă și respect față de persoanele vârstnice.",
      "În concluzie, solicităm autorităților să ia măsuri concrete pentru protejarea bătrânilor și pedepsirea celor care nu își îndeplinesc atribuțiile, iar comunităților – să manifeste respect și grijă față de aceștia, încurajând astfel o societate demnă și respectuoasă pentru toți membrii săi.",
    ],
  },
  "situatia-azilelor-private-de-batrani-din-romania-o-criza-legislationala": {
    slug: "situatia-azilelor-private-de-batrani-din-romania-o-criza-legislationala",
    title: "Situația Azilelor Private de Bătrâni din România: O Criză Legislațională",
    excerpt:
      "Adaptarea Codului CAEN pentru un cadru legal clar. În urma modificărilor legislative recente, considerate nepredictibile și lipsite de norme clare, multe azile private de bătrâni au optat pentru schimbarea codului CAEN.",
    date: "2024",
    category: "Analiză",
    image: "/stiri/situatia-azilelor-criza.png",
    paragraphs: [
      "În urma modificărilor legislative recente, considerate nepredictibile și lipsite de norme clare, multe azile private de bătrâni au optat pentru schimbarea codului CAEN, nu a destinației. Această schimbare nu a avut scopul de a masca activitatea, ci de a se încadra într-un cadru legal clar.",
      "Katia Cicală a explicat că azilele private de bătrâni se află într-o situație imposibilă din cauza legislației recente emise de Ministerul Muncii. Rezidenții azilelor private sunt tratați ca asistați sociali, deși acești rezidenți sunt plătiți de familiile lor și nu beneficiază de ajutor social de la stat.",
      "Cicală a subliniat că există un conflict între Ministerul Muncii și Ministerul Sănătății. În timp ce Ministerul Sănătății licențiază aceste centre pentru îngrijiri medicale, Ministerul Muncii le consideră centre de asistență socială. Această situație complică procesul de obținere a licențelor.",
      "O altă problemă majoră este legată de obținerea autorizațiilor ISU pentru siguranța la incendiu. În aprilie, a fost publicată o lege care impune noi norme, dar acestea nu au fost încă detaliate, lăsând azilele într-un suspans și blocând procesul de licențiere.",
      "Discuția a evidențiat necesitatea unei reglementări clare și coerente care să diferențieze între azilele private de bătrâni și centrele de asistență socială. De asemenea, a fost subliniată importanța monitorizării constante a acestor centre de către familiile rezidenților.",
    ],
  },
  "raspuns-ministerul-muncii-si-solidaritatii-sociale": {
    slug: "raspuns-ministerul-muncii-si-solidaritatii-sociale",
    title: "Răspuns Ministerul Muncii și Solidarității Sociale",
    excerpt:
      "Ministerul Muncii și Solidarității Sociale a trimis un răspuns oficial către Seniore.ro, referitor la problemele actuale cu care se confruntă căminele de bătrâni din România.",
    date: "2024",
    category: "Advocacy",
    image: "/stiri/raspuns-ministerul-muncii.png",
    paragraphs: [
      "Ministerul Muncii și Solidarității Sociale a trimis un răspuns oficial către Seniore.ro, referitor la problemele actuale cu care se confruntă căminele de bătrâni din România. Această scrisoare abordează dificultățile generate de noile reglementări legislative care impun standarde stricte pentru funcționarea acestor instituții.",
      "Ministerul recunoaște provocările financiare și logistice pe care le întâmpină căminele de bătrâni în încercarea de a se conforma noilor cerințe și subliniază că obiectivul acestor reglementări este de a asigura un nivel ridicat de siguranță și bunăstare pentru rezidenți.",
      "În același timp, Ministerul își exprimă deschiderea pentru dialog și colaborare cu Seniore.ro, în vederea identificării celor mai bune soluții pentru aceste probleme.",
    ],
  },
  "reprezentantii-ajpis-arges-au-vizitat-un-camin-de-batrani": {
    slug: "reprezentantii-ajpis-arges-au-vizitat-un-camin-de-batrani",
    title:
      "Reprezentanții AJPIS Argeș au vizitat un cămin de bătrâni și au emis un ultimatum de 30 de zile pentru închiderea centrului",
    excerpt:
      "Criza căminelor de bătrâni: Ordinul Comun și impactul asupra vârstnicilor. Florin Murgescu, administratorul unui centru pentru vârstnici din județul Argeș, se confruntă cu o situație critică.",
    date: "2024",
    category: "Advocacy",
    image: "/stiri/ajpis-arges-ultimatum.png",
    paragraphs: [
      "Florin Murgescu, administratorul unui centru pentru vârstnici din județul Argeș, se confruntă cu o situație critică. În urmă cu mai bine de o lună, centrului său i-a fost ridicată licența de funcționare din cauza neîndeplinirii condițiilor impuse de ordinul comun semnat anul trecut de Ministerele de Interne și Muncă.",
      "Reprezentanții AJPIS Argeș au vizitat centrul și au emis un ultimatum de 30 de zile pentru închiderea căminului. Din cele 39 de persoane aflate în centru, doar două au fost preluate de familie și alte șapte au fost relocate. Restul de 30 de vârstnici nu au unde să meargă, fiind lipsiți de sprijin familial sau resurse proprii.",
      "Unul dintre acești vârstnici este domnul Constantin Ion, în vârstă de 74 de ani, care și-a găsit un adăpost în acest centru în urmă cu cinci ani. În 2018, a suferit o operație de amputare a unui picior. „Ne servește cu mâncare, cu tratament, cu medic permanent. Dacă ne dau afară, n-avem unde să ne ducem, ajungem pe stradă”, declară domnul Ion.",
      "Noua legislație impune centrelor private de bătrâni condiții stricte, printre care și autorizația ISU, care trebuie obținută în maximum trei luni. Înlocuirea ferestrelor pentru normele de siguranță la incendiu costă aproximativ 6.000 de euro pe unitate.",
      "Din 300 de cămine din București și Ilfov, doar 5 au autorizație ISU. Patronatele solicită un termen cuprins între 3 și 5 ani pentru implementarea noilor măsuri.",
    ],
  },
  "actualizare-importanta-minuta-dezbaterii-publice": {
    slug: "actualizare-importanta-minuta-dezbaterii-publice",
    title:
      "Actualizare Importantă: Minuta Dezbaterii Publice Disponibilă pe Site-ul Ministerului Muncii",
    excerpt:
      "Ministerul Muncii și Solidarității Sociale a publicat recent minuta unei dezbateri publice esențiale, evidențiind angajamentul său continuu pentru transparență și colaborare civică.",
    date: "2024",
    category: "Advocacy",
    image: "/stiri/minuta-dezbaterii-publice.png",
    paragraphs: [
      "Ministerul Muncii și Solidarității Sociale a publicat recent minuta unei dezbateri publice esențiale, evidențiind angajamentul său continuu pentru transparență și colaborare civică. Această dezbatere a abordat propunerea de modificare a anexei la Hotărârea Guvernului nr. 118/2014.",
      "În cadrul dezbaterii, au fost discutate diverse propuneri și observații care vizează optimizarea și eficientizarea serviciilor sociale, prezentate de reprezentanți ai diferitelor agenții guvernamentale și organizații non-guvernamentale, inclusiv feedback direct de la beneficiarii serviciilor.",
      "Puncte cheie abordate: importanța asigurării unei calități superioare în serviciile sociale, propunerile de modificare ale legii actuale pentru a răspunde mai bine nevoilor beneficiarilor, implicarea activă a organizațiilor neguvernamentale în procesul de consultare.",
    ],
  },
  "legile-lasa-batranii-din-azile-fara-adapost": {
    slug: "legile-lasa-batranii-din-azile-fara-adapost",
    title: "Legile lasă bătrânii din azile fără adăpost",
    excerpt:
      "Un recent reportaj de la Observatorul Antenei 1 scoate în evidență o problemă majoră care afectează mii de bătrâni din România: legile actuale riscă să lase vârstnicii din azile fără un acoperiș deasupra capului.",
    date: "2024",
    category: "Media",
    image: "/stiri/legile-lasa-batranii-fara-adapost.png",
    paragraphs: [
      "Un recent reportaj de la Observatorul Antenei 1 scoate în evidență o problemă majoră care afectează mii de bătrâni din România: legile actuale riscă să lase vârstnicii din azile fără un acoperiș deasupra capului.",
      "În ultima perioadă, modificările legislative au impus noi reguli stricte pentru funcționarea azilelor de bătrâni. Aceste reguli, deși bine intenționate, sunt greu de implementat de majoritatea azilelor din cauza resurselor limitate.",
      "Impactul acestor legi este devastator pentru vârstnicii care depind de aceste azile pentru îngrijire și adăpost. Fără azile, mii de bătrâni ar putea rămâne pe străzi, fără acces la îngrijire medicală adecvată, alimentație sau un mediu sigur.",
      "Comunitatea și organizațiile de sprijin pentru vârstnici au început să tragă semnale de alarmă. Există o nevoie urgentă de revizuire a legislației pentru a găsi un echilibru între standardele de îngrijire și posibilitățile reale ale azilelor.",
    ],
  },
  "impactul-ordinului-comun-asupra-caminelor-de-batrani": {
    slug: "impactul-ordinului-comun-asupra-caminelor-de-batrani",
    title: "Impactul Ordinului Comun asupra Căminelor de Bătrâni din România",
    excerpt:
      "Focus Știri Prima TV: Un nou ordin comun semnat de trei ministere pune în pericol funcționarea a peste 80% din căminele de bătrâni din România.",
    date: "2024",
    category: "Media",
    image: "/stiri/impactul-ordinului-comun.png",
    paragraphs: [
      "Un nou ordin comun semnat de trei ministere pune în pericol funcționarea a peste 80% din căminele de bătrâni din România. Această decizie drastică ar putea duce la închiderea majorității acestor instituții, lăsând în derivă peste 30.000 de vârstnici.",
      "Noul ordin comun, semnat de Ministerul Sănătății, Ministerul Muncii și Ministerul Finanțelor, impune standarde și reglementări stricte pe care majoritatea căminelor de bătrâni nu le pot îndeplini din cauza resurselor financiare și infrastructurii limitate.",
      "Dacă peste 80% din căminele de bătrâni se vor închide, aproximativ 30.000 de vârstnici vor fi afectați în mod direct. Acești oameni riscă să ajungă pe străzi, fără un loc unde să primească sprijinul necesar.",
      "Este necesară o reevaluare a ordinului comun și găsirea unor soluții care să asigure continuitatea serviciilor oferite de căminele de bătrâni, fără a compromite siguranța și standardele de îngrijire.",
    ],
  },
  "problema-caminelelor-de-batrani-private-lipsa-comunicare": {
    slug: "problema-caminelelor-de-batrani-private-lipsa-comunicare",
    title:
      "Problema Căminelelor de Bătrâni Private în România: O Lipsă de Comunicare și Înțelegere",
    excerpt:
      "În contextul actual din România, căminele de bătrâni private se confruntă cu provocări majore. Un interviu recent realizat de Andrei Gușă cu avocata Katia Cicala, președintele Seniore.ro.",
    date: "2024",
    category: "Analiză",
    image: "/stiri/problema-caminelelor-lipsa-comunicare.png",
    paragraphs: [
      "În contextul actual din România, căminele de bătrâni private se confruntă cu provocări majore. Un interviu recent realizat de Andrei Gușă cu Avocata Katia Cicala, președintele Seniore.ro, a scos la iveală o serie de aspecte problematice, subliniind o lipsă de comunicare și înțelegere din partea autorităților.",
      "Avocata Katia Cicala a evidențiat faptul că există o lipsă de comunicare și înțelegere între autorități și operatorii de cămine de bătrâni private. „Nu știu. Eu înclin să cred că există o lipsă de comunicare și o lipsă de înțelegere”, a declarat ea.",
      "O altă problemă majoră este legată de autorizațiile ISU. Există numeroase instituții, inclusiv spitale, școli, grădinițe, gări și ministere, care funcționează fără autorizație ISU sau cu derogare. În contrast, căminele de bătrâni trebuie să îndeplinească criterii stricte, ceea ce creează o situație inechitabilă.",
      "Katia Cicala a subliniat importanța căminelor de bătrâni private pentru familiile de condiție medie din România. „Aceste cămine private au apărut în România din necesitate pentru familiile de condiție medie, ca să poată să-și întrețină părinții”, a spus ea.",
      "Problemele cu care se confruntă căminele de bătrâni private în România sunt complexe și multiple, de la lipsa de comunicare din partea autorităților, până la reglementările inechitabile legate de autorizațiile ISU. Este esențial ca aceste probleme să fie abordate și rezolvate.",
    ],
  },
  "infiintarea-camine-de-batrani-romania": {
    slug: "infiintarea-camine-de-batrani-romania",
    title: "Înființarea Seniore.ro",
    excerpt:
      "Înființarea unui Seniore.ro: o necesitate pentru România. În contextul dinamic și plin de provocări al asistenței sociale din România.",
    date: "2023",
    category: "Despre",
    image: "/stiri/infiintarea-camine-de-batrani-romania.jpg",
    paragraphs: [
      "În contextul dinamic și plin de provocări al asistenței sociale din România, inițiativa de a înființa Seniore.ro reprezintă nu doar un pas înainte, ci o necesitate absolută. Acest demers vine în întâmpinarea unei nevoi critice de organizare, reprezentare și susținere a furnizorilor privați din acest sector.",
      "Una dintre cele mai mari provocări cu care se confruntă furnizorii privați este fragmentarea și lipsa unei voci unificate în dialogul cu instituțiile statului. Seniore.ro funcționează ca un canal de comunicare eficient, asigurând că interesele și preocupările acestor furnizori sunt auzite și luate în considerare în procesul de elaborare a politicilor publice.",
      "Seniore.ro are rolul crucial de a promova și a susține standarde înalte de calitate pentru serviciile oferite. Prin stabilirea unor criterii clare de performanță și prin oferirea de programe de formare și dezvoltare profesională, contribuiie semnificativ la îmbunătățirea calității asistenței sociale private din România.",
      "Un patronat bine structurat desfășoară activități de advocacy eficiente, reprezentând interesele membrilor săi în fața autorităților și luptând pentru un cadru legislativ și regulamentar favorabil dezvoltării sectorului privat de asistență socială.",
      "Înființarea Seniore.ro nu este doar o oportunitate, ci o necesitate stringentă în contextul actual. Un astfel de organism aduce beneficii imense nu doar pentru furnizorii privați, ci și pentru beneficiarii serviciilor sociale, îmbunătățind calitatea și accesibilitatea acestor servicii esențiale.",
    ],
  },
};

const relatedArticles = [
  {
    slug: "casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti",
    title: "Casa Alegria — Centru rezidențial pentru vârstnici în Ploiești",
    date: "10 Mai 2026",
  },
  {
    slug: "casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges",
    title: "Casa Orizont — Cămin pentru vârstnici în natură, Beleți-Negrești, Argeș",
    date: "8 Mai 2026",
  },
];

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = articles[slug];

  if (!article) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Articolul nu a fost găsit
            </h1>
            <Link
              href="/stiri"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Înapoi la știri
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <JsonLd
        data={newsArticleJsonLd({
          title: article.title,
          description: article.excerpt,
          slug: article.slug,
          image: article.image,
          date: article.date,
          author: SITE_NAME,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", url: "/" },
          { name: "Știri", url: "/stiri" },
          { name: article.title, url: `/stiri/${article.slug}` },
        ])}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-navy-deep/50 mb-8"
            >
              <Link href="/" className="hover:text-navy-deep transition-colors">
                Acasă
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href="/stiri"
                className="hover:text-navy-deep transition-colors"
              >
                Știri
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70 truncate">
                {article.category}
              </span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
            >
              <Sparkles className="size-3.5 text-navy-deep" />
              <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                {article.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-navy-deep leading-[1.15] text-balance mb-6"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 text-sm text-navy-deep/60"
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {article.date}
              </span>
            </motion.div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-16 bg-paper">
          <div className="max-w-4xl mx-auto px-6">
            {/* Featured image */}
            {article.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10 mb-10"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6">
              {article.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  className="text-base md:text-lg text-navy-deep/75 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* PDF download */}
            {article.pdfHref && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={0}
                className="mt-10 p-6 rounded-xl bg-white border border-navy-deep/10 flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                    <FileText className="size-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-navy-deep">
                      Descarcă scrisoarea integrală (PDF)
                    </h3>
                    <p className="text-sm text-navy-deep/50">
                      Nr. înreg. 61/23.07.2026
                    </p>
                  </div>
                </div>
                <a
                  href={article.pdfHref}
                  className="group inline-flex items-center gap-2 bg-navy-deep text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                >
                  <Download className="size-4" />
                  Descarcă PDF
                </a>
              </motion.div>
            )}

            {/* Petiție link */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={0}
              className="mt-6 p-6 rounded-xl bg-gold/5 border border-gold/20"
            >
              <p className="text-sm text-navy-deep/70 leading-relaxed mb-3">
                Acțiunea continuă demersurile Seniore.ro pentru un cadru de licențiere
                echitabil — inclusiv petiția privind eliminarea autorizației ISU
                dintre documentele obligatorii pentru licențiere.
              </p>
              <Link
                href="/petitii"
                className="group inline-flex items-center gap-2 text-gold font-semibold text-sm hover:underline"
              >
                Semnează petiția ISU
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-navy-deep/10">
              <Link
                href="/stiri"
                className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Înapoi la știri
              </Link>
            </div>
          </div>
        </section>

        {/* Articole conexe */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep">
                Articole conexe
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={`/stiri/${rel.slug}`}
                    className="group block p-6 rounded-xl bg-paper border border-navy-deep/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <span className="text-xs text-navy-deep/40 inline-flex items-center gap-1.5 mb-3">
                      <Calendar className="size-3.5" />
                      {rel.date}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors">
                      {rel.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
