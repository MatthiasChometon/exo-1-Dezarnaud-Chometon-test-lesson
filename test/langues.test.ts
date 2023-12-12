import { Expressions } from "../src/domain/expressions";
import { LangueInterface } from "../src/domain/langue.interface";
import { LangueAnglaise } from "../src/domain/langueAnglaise";
import { LangueFrançaise } from "../src/domain/langueFrançaise";
import { MomentDeLaJournee } from "../src/domain/momentDeLaJournee";

describe("Langues", () => {
  test.each([
    [new LangueFrançaise(), MomentDeLaJournee.MATIN, Expressions.BONJOUR],
    [new LangueFrançaise(), MomentDeLaJournee.APRES_MIDI, Expressions.BONJOUR],
    [new LangueFrançaise(), MomentDeLaJournee.SOIREE, Expressions.BONSOIR],
    [new LangueFrançaise(), MomentDeLaJournee.NUIT, Expressions.BONSOIR],

    [new LangueAnglaise(), MomentDeLaJournee.MATIN, Expressions.GOOD_MORNING],
    [new LangueAnglaise(), MomentDeLaJournee.APRES_MIDI, Expressions.GOOD_AFTERNOON],
    [new LangueAnglaise(), MomentDeLaJournee.SOIREE, Expressions.GOOD_EVENING],
    [new LangueAnglaise(), MomentDeLaJournee.NUIT, Expressions.GOOD_NIGHT],

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

    [new LangueAnglaise(), MomentDeLaJournee.MATIN, Expressions.GOODBYE],
    [new LangueAnglaise(), MomentDeLaJournee.APRES_MIDI, Expressions.GOODBYE],
    [new LangueAnglaise(), MomentDeLaJournee.SOIREE, Expressions.GOODBYE],
    [new LangueAnglaise(), MomentDeLaJournee.NUIT, Expressions.GOODBYE],

  ])(
    "En %s on dire au revoir le '%s' par '%s'",
    (langue: LangueInterface, moment: MomentDeLaJournee, attendu: string) => {
      expect(langue.Acquitter(moment)).toBe(attendu);
    }
  );
});
