import * as os from "os";
import { LangueInterface } from "./langue.interface";
import { MomentDeLaJournee } from "./momentDeLaJournee";

export class VerificateurPalindrome {
  private readonly _langue: LangueInterface;

  constructor(langue: LangueInterface) {
    this._langue = langue;
  }

  public Verifier(chaine: string, momentDeLaJournee : MomentDeLaJournee = MomentDeLaJournee.INCONNUE): string {
    let miroir = chaine.split("").reverse().join("");

    let sortie =
      this._langue.Saluer(momentDeLaJournee) + os.EOL + miroir + os.EOL;

    if (miroir == chaine) sortie += this._langue.Feliciter() + os.EOL;

    return sortie + this._langue.Acquitter(momentDeLaJournee);
  }
}
