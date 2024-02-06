import { MomentDeLaJournee } from "../src/domain/momentDeLaJournee";
import { VerificateurPalindromeBuilder } from "../test/utilities/verificationPalindormeBuilder";
import { Expressions } from "../src/domain/expressions";
import { LangueFrançaise } from "../src/domain/langueFrançaise";
import { LangueAnglaise } from "../src/domain/langueAnglaise";
import * as os from "os";
import { LangueInterface } from "../src/domain/langue.interface";
import { LangueStub } from "./utilities/langueStub";
import { LangueParDefaut } from "./utilities/langueParDefaut";

const palindrome = "radar";
const palindromes = [palindrome, 'kayak']
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
    [new LangueAnglaise(), Expressions.WELL_SAID],
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

  function casesSalutations () {
    let chaines = [...nonPalindromes, palindrome];
    let cases: [MomentDeLaJournee, string][] = [];

    for (let momentDeLaJournee of momentsDeLaJournee)
      for (let chaine of chaines) cases.push([momentDeLaJournee, chaine]);

    return cases;
  }
  test.each(casesSalutations())(
    "ETANT DONNE un utilisateur parlant la langue par defaut" +
    "ET que nous sommes le %s " +
    "QUAND on saisit une chaîne %s " +
    "ALORS les salutations de cette langue à ce moment de la journée sont envoyées avant toute réponse",
    (momentDeLaJournee: MomentDeLaJournee, chaine: string) => {
      let langueParDefaut = new LangueParDefaut();

      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langueParDefaut)
        .AyantPourMomentDeLaJournee(momentDeLaJournee)
        .Build();

      let resultat = verificateur.Verifier(chaine);

      let premiereLigne = resultat.split(os.EOL)[0];
      let attendu = langueParDefaut.Saluer(momentDeLaJournee);
      expect(premiereLigne).toEqual(attendu);
    }
  );

  test.each(casesSalutations())(
    "ETANT DONNE un utilisateur parlant la langue par defaut" +
    "ET que nous sommes le %s " +
    "QUAND on saisit une chaîne %s " +
    "ALORS les salutations de cette langue à ce moment de la journée sont envoyées avant toute réponse",
    (momentDeLaJournee: MomentDeLaJournee, chaine: string) => {
      let langueParDefaut = new LangueParDefaut();

      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langueParDefaut)
        .AyantPourMomentDeLaJournee(momentDeLaJournee)
        .Build();

      let resultat = verificateur.Verifier(chaine);
      let lignes = resultat.split(os.EOL);
      let derniereLigne = lignes[lignes.length - 2];
      let attendu = langueParDefaut.Acquitter(momentDeLaJournee);
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
      let derniereLigne = lignes[lignes.length - 2];
      expect(derniereLigne).toEqual(Expressions.AU_REVOIR);
    }
  );

  test.each([...nonPalindromes, palindrome])(
    "ETANT DONNE un utilisateur parlant anglais " +
    "QUAND on saisit une chaîne %s " +
    'ALORS "Goodbye" est envoyé en dernier.',
    (chaine: string) => {
      const langue = new LangueAnglaise();
      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .Build();

      let resultat = verificateur.Verifier(chaine);

      let lignes = resultat.split(os.EOL);
      let derniereLigne = lignes[lignes.length - 2];
      expect(derniereLigne).toEqual(Expressions.GOODBYE);
    }
  );

  function recipeCases () {
    let recipeElements: Array<{ expectedOutput: (chaine: string) => string, chaines: Array<string>, langue: LangueInterface, momentDeLaJournee: MomentDeLaJournee }> = [
      {
        chaines: palindromes,
        langue: new LangueAnglaise(),
        momentDeLaJournee: MomentDeLaJournee.SOIREE,
        expectedOutput: (chaine: string) => "Good evening" + os.EOL + chaine + os.EOL + "Well said !" + os.EOL + "Goodbye" + os.EOL
      },
      {
        chaines: nonPalindromes,
        langue: new LangueFrançaise(),
        momentDeLaJournee: MomentDeLaJournee.MATIN,
        expectedOutput: (chaine: string) => "Bonjour" + os.EOL + chaine.split('').reverse().join('') + os.EOL + "Bon matin" + os.EOL
      },
      {
        chaines: palindromes,
        langue: new LangueStub(),
        momentDeLaJournee: MomentDeLaJournee.NUIT,
        expectedOutput: (chaine: string) => "" + os.EOL + chaine + os.EOL + "" + os.EOL + "" + os.EOL
      }
    ];

    let cases: Array<{ expectedOutput: string, chaine: string, langue: LangueInterface, momentDeLaJournee: MomentDeLaJournee }> = []

    recipeElements.forEach(({ chaines, langue, momentDeLaJournee, expectedOutput }) => {
      chaines.forEach((chaine) => {
        cases.push({ chaine, langue, momentDeLaJournee, expectedOutput: expectedOutput(chaine) })
      })
    })

    return cases;
  }

  test.each(recipeCases())(
    "ETANT DONNE un utilisateur parlant anglais le soir " +
    "QUAND on saisit une chaîne %s avec un palindrome" +
    'ALORS "Good night" est envoyer suivis "Well said" et "Goodbye".',
    ({ chaine, langue, momentDeLaJournee, expectedOutput }) => {
      let verificateur = new VerificateurPalindromeBuilder()
        .AyantPourLangue(langue)
        .AyantPourMomentDeLaJournee(momentDeLaJournee)
        .Build();

      let resultat = verificateur.Verifier(chaine);

      expect(resultat).toEqual(expectedOutput);
    }
  );

  test(`
    Bug 22/01/2024
    Il n’y a pas de sauts de ligne comme dernier caractère de la sortie
  `, () => {
    let verificateur = new VerificateurPalindromeBuilder()
      .AyantPourLangue(new LangueAnglaise())
      .AyantPourMomentDeLaJournee(MomentDeLaJournee.MATIN)
      .Build();

    let resultat = verificateur.Verifier(palindrome)
    const lastElement = resultat[resultat.length - 1]

    expect(lastElement).toEqual('\n');
  })
});
