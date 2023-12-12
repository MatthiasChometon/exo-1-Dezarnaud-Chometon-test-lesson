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
    (chaîne: string) => {
      let résultat = VerificateurPalindromeBuilder.Default().Verifier(chaîne);

      let attendu = chaîne.split("").reverse().join("");
      expect(résultat).toContain(attendu);
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
      let vérificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let résultat = vérificateur.Verifier(palindrome);

      expect(résultat).toContain(palindrome + os.EOL + attendu);
    }
  );

  function casesSalutations() {
    let chaînes = [...nonPalindromes, palindrome];
    let cases: [MomentDeLaJournee, string][] = [];

    for (let momentDeLaJournee of momentsDeLaJournee)
      for (let chaîne of chaînes) cases.push([momentDeLaJournee, chaîne]);

    return cases;
  }
  test.each(casesSalutations())(
    "ETANT DONNE un utilisateur parlant langueFake" +
      "ET que nous sommes le %s " +
      "QUAND on saisit une chaîne %s " +
      "ALORS les salutations de cette langue à ce moment de la journée sont envoyées avant toute réponse",
    (momentDeLaJournee: MomentDeLaJournee, chaine: string) => {
      let langueFake = new LangueFake();

      let vérificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langueFake)
        .AyantPourMomentDeLaJournee(momentDeLaJournee)
        .Build();

      let résultat = vérificateur.Verifier(chaine, momentDeLaJournee);

      let premièreLigne = résultat.split(os.EOL)[0];
      let attendu = langueFake.Saluer(momentDeLaJournee);
      expect(premièreLigne).toEqual(attendu);
    }
  );

  test.each([...nonPalindromes, palindrome])(
    "ETANT DONNE un utilisateur parlant français " +
      "QUAND on saisit une chaîne %s " +
      'ALORS "Au revoir" est envoyé en dernier.',
    (chaîne: string) => {
      const langue = new LangueFrançaise();
      let vérificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let résultat = vérificateur.Verifier(chaîne);

      let lignes = résultat.split(os.EOL);
      let dernièreLigne = lignes[lignes.length - 1];
      expect(dernièreLigne).toEqual(Expressions.AU_REVOIR);
    }
  );

  test.each([...nonPalindromes, palindrome])(
    "ETANT DONNE un utilisateur parlant anglais " +
      "QUAND on saisit une chaîne %s " +
      'ALORS "Goodbye" est envoyé en dernier.',
    (chaîne: string) => {
      const langue = new langueAnglaise();
      let vérificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let résultat = vérificateur.Verifier(chaîne);

      let lignes = résultat.split(os.EOL);
      let dernièreLigne = lignes[lignes.length - 1];
      expect(dernièreLigne).toEqual(Expressions.GOODBYE);
    }
  );
});
