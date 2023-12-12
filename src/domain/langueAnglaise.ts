import { LangueInterface } from "./langue.interface";
import { Expressions } from "./expressions";
import { MomentDeLaJournee } from "./momentDeLaJournee";

export class LangueAnglaise implements LangueInterface {
  public Acquitter (): string {
    return Expressions.GOODBYE;
  }

  public Saluer (moment: MomentDeLaJournee): string {
    if ((moment === MomentDeLaJournee.MATIN)) {
      return Expressions.GOOD_MORNING;
    }

    if ((moment === MomentDeLaJournee.APRES_MIDI)) {
      return Expressions.GOOD_AFTERNOON;
    }

    if ((moment === MomentDeLaJournee.SOIREE)) {
      return Expressions.GOOD_EVENING;
    }

    if ((moment === MomentDeLaJournee.NUIT)) {
      return Expressions.GOOD_NIGHT;
    }

    return Expressions.HELLO;
  }

  public Feliciter (): string {
    return Expressions.WELL_SAID;
  }

  public toString (): string {
    return "Langue Anglaise";
  }
}
