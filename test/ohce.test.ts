import * as os from "os";
import { Expressions } from "../src/expressions";
import { LangueFrançaise } from "../src/langueFrançaise";
import { LangueInterface } from "../src/langue.interface";
import { langueAnglaise } from "../src/langueAnglaise";
import { LangueFake } from "./utilities/langueFake";
import { MomentDeLaJournee } from "../src/momentDeLaJournee";
import { VerificateurPalindromeBuilder } from "./utilities/verificationPalindormeBuilder";

const palindrome = "radar";
const nonPalindromes = ["test", "ynov"];

const momentsDeLaJournee = [
  MomentDeLaJournee.INCONNUE,
  MomentDeLaJournee.MATIN,
  MomentDeLaJournee.APRES_MIDI,
  MomentDeLaJournee.SOIREE,
  MomentDeLaJournee.NUIT,
];

describe("test works", () => {
  test.each([...nonPalindromes])(
    "QUAND on saisit un non-palindrome %s " +
      "ALORS elle est renvoyée en miroir",
    (chaine: string) => {
      let resultat = VerificateurPalindromeBuilder.Default().Verifier(chaine);

      let attendu = chaine.split("").reverse().join("");
      expect(resultat).toContain(attendu);
    }
  );

  test.each([
    [new LangueFrançaise(), Expressions.BIEN_DIT],
    [new langueAnglaise(), Expressions.WELL_SAID],
  ])(
    "ETANT DONNE un utilisateur parlant la %s " +
      "QUAND on saisit un palindrome " +
      "ALORS celui-ci est renvoyé " +
      "ET '%s' est envoyé ensuite",
    (langue: LangueInterface, attendu: string) => {
      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let resultat = verificateur.Verifier(palindrome);

      expect(resultat).toContain(palindrome + os.EOL + attendu);
    }
  );

  function casesSalutations() {
    let chaines = [...nonPalindromes, palindrome];
    let cases: [MomentDeLaJournee, string][] = [];

    for (let momentDeLaJournee of momentsDeLaJournee)
      for (let chaine of chaines) cases.push([momentDeLaJournee, chaine]);

    return cases;
  }
  test.each(casesSalutations())(
    "ETANT DONNE un utilisateur parlant langueFake" +
      "ET que nous sommes le %s " +
      "QUAND on saisit une chaîne %s " +
      "ALORS les salutations de cette langue à ce moment de la journée sont envoyées avant toute réponse",
    (momentDeLaJournee: MomentDeLaJournee, chaine: string) => {
      let langueFake = new LangueFake();

      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langueFake)
        .AyantPourMomentDeLaJournee(momentDeLaJournee)
        .Build();

      let resultat = verificateur.Verifier(chaine, momentDeLaJournee);

      let premiereLigne = resultat.split(os.EOL)[0];
      let attendu = langueFake.Saluer(momentDeLaJournee);
      expect(premiereLigne).toEqual(attendu);
    }
  );

  test.each(casesSalutations())(
    "ETANT DONNE un utilisateur parlant langueFake" +
      "ET que nous sommes le %s " +
      "QUAND on saisit une chaîne %s " +
      "ALORS les salutations de cette langue à ce moment de la journée sont envoyées avant toute réponse",
    (momentDeLaJournee: MomentDeLaJournee, chaine: string) => {
      let langueFake = new LangueFake();

      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langueFake)
        .AyantPourMomentDeLaJournee(momentDeLaJournee)
        .Build();

      let resultat = verificateur.Verifier(chaine, momentDeLaJournee);
      let lignes = resultat.split(os.EOL);
      let derniereLigne = lignes[lignes.length - 1];
      let attendu = langueFake.Acquitter(momentDeLaJournee);
      expect(derniereLigne).toEqual(attendu);
    }
  );

  test.each([...nonPalindromes, palindrome])(
    "ETANT DONNE un utilisateur parlant français " +
      "QUAND on saisit une chaîne %s " +
      'ALORS "Au revoir" est envoyé en dernier.',
    (chaine: string) => {
      const langue = new LangueFrançaise();
      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let resultat = verificateur.Verifier(chaine);

      let lignes = resultat.split(os.EOL);
      let derniereLigne = lignes[lignes.length - 1];
      expect(derniereLigne).toEqual(Expressions.AU_REVOIR);
    }
  );

  test.each([...nonPalindromes, palindrome])(
    "ETANT DONNE un utilisateur parlant anglais " +
      "QUAND on saisit une chaîne %s " +
      'ALORS "Goodbye" est envoyé en dernier.',
    (chaine: string) => {
      const langue = new langueAnglaise();
      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let resultat = verificateur.Verifier(chaine);

      let lignes = resultat.split(os.EOL);
      let derniereLigne = lignes[lignes.length - 1];
      expect(derniereLigne).toEqual(Expressions.GOODBYE);
    }
  );
});
