import { LangueFrançaise } from "../src/langueFrançaise";
import { Expressions } from "../src/expressions";
import { LangueInterface } from "../src/langue.interface";
import { langueAnglaise } from "../src/langueAnglaise";
import { MomentDeLaJournee } from "../src/momentDeLaJournee";

describe("Langues", () => {
  test.each([
    [new LangueFrançaise(), MomentDeLaJournee.MATIN, Expressions.BONJOUR],
    [new LangueFrançaise(), MomentDeLaJournee.APRES_MIDI, Expressions.BONJOUR],
    [new LangueFrançaise(), MomentDeLaJournee.SOIREE, Expressions.BONSOIR],
    [new LangueFrançaise(), MomentDeLaJournee.NUIT, Expressions.BONSOIR],

    [new langueAnglaise(), MomentDeLaJournee.MATIN, Expressions.GOOD_MORNING],
    [new langueAnglaise(), MomentDeLaJournee.APRES_MIDI, Expressions.GOOD_AFTERNOON],
    [new langueAnglaise(), MomentDeLaJournee.SOIREE, Expressions.GOOD_EVENING],
    [new langueAnglaise(), MomentDeLaJournee.NUIT, Expressions.GOOD_NIGHT],

  ])(
    "En %s on salue le '%s' par '%s'",
    (langue: LangueInterface, moment: MomentDeLaJournee, attendu: string) => {
      expect(langue.Saluer(moment)).toBe(attendu);
    }
  );

  test.each([
    [new LangueFrançaise(), MomentDeLaJournee.MATIN, Expressions.BON_MATIN],
    [new LangueFrançaise(), MomentDeLaJournee.APRES_MIDI, Expressions.BONNE_APRES_MIDI],
    [new LangueFrançaise(), MomentDeLaJournee.SOIREE, Expressions.BONNE_SOIREE],
    [new LangueFrançaise(), MomentDeLaJournee.NUIT, Expressions.BONNE_NUIT],
    
    [new langueAnglaise(), MomentDeLaJournee.MATIN, Expressions.GOODBYE],
    [new langueAnglaise(), MomentDeLaJournee.APRES_MIDI, Expressions.GOODBYE],
    [new langueAnglaise(), MomentDeLaJournee.SOIREE, Expressions.GOODBYE],
    [new langueAnglaise(), MomentDeLaJournee.NUIT, Expressions.GOODBYE],

  ])(
    "En %s on dire au revoir le '%s' par '%s'",
    (langue: LangueInterface, moment: MomentDeLaJournee, attendu: string) => {
      expect(langue.Acquitter(moment)).toBe(attendu);
    }
  );
});
