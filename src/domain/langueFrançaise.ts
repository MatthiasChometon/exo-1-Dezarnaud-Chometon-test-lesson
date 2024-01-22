import { LangueInterface } from "./langue.interface";
import { Expressions } from "./expressions";
import { MomentDeLaJournee } from "./momentDeLaJournee";

export class LangueFrançaise implements LangueInterface {
  public Acquitter (moment: MomentDeLaJournee): string {
    if (moment === MomentDeLaJournee.MATIN) {
      return Expressions.BON_MATIN;
    }

    if (moment === MomentDeLaJournee.APRES_MIDI) {
      return Expressions.BONNE_APRES_MIDI;
    }

    if (moment === MomentDeLaJournee.SOIREE) {
      return Expressions.BONNE_SOIREE;
    }

    if (moment === MomentDeLaJournee.NUIT) {
      return Expressions.BONNE_NUIT;
    }

    return Expressions.AU_REVOIR;
  }

  public Saluer (moment: MomentDeLaJournee): string {
    if (moment === MomentDeLaJournee.MATIN) {
      return Expressions.BONJOUR;
    }

    if (moment === MomentDeLaJournee.APRES_MIDI) {
      return Expressions.BONJOUR;
    }

    if (moment === MomentDeLaJournee.SOIREE) {
      return Expressions.BONSOIR;
    }

    if (moment === MomentDeLaJournee.NUIT) {
      return Expressions.BONSOIR;
    }

    return Expressions.BONJOUR;
  }

  public Feliciter (): string {
    return Expressions.BIEN_DIT;
  }

  public toString (): string {
    return "Langue Française";
  }

  MessageEntree (): string {
    return 'Veuillez taper un mot (ou exit pour quitter) :\n'
  }
}
