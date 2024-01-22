import * as os from "os";
import { LangueInterface } from "./langue.interface";
import { MomentDeLaJournee } from "./momentDeLaJournee";

export class VerificateurPalindrome {
  private readonly _langue: LangueInterface;
  private readonly _momentDeLaJournee: MomentDeLaJournee

  constructor (langue: LangueInterface, momentDeLaJournee: MomentDeLaJournee = MomentDeLaJournee.INCONNUE) {
    this._langue = langue;
    this._momentDeLaJournee = momentDeLaJournee
  }

  public Verifier (chaine: string): string {
    let miroir = chaine.split("").reverse().join("");

    let sortie =
      this._langue.Saluer(this._momentDeLaJournee) + os.EOL + miroir + os.EOL;

    if (miroir == chaine) sortie += this._langue.Feliciter() + os.EOL;

    return sortie + this._langue.Acquitter(this._momentDeLaJournee);
  }
}
