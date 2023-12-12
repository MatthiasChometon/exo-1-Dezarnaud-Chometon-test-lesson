import * as os from "os";
import { LangueInterface } from "./langue.interface";
import { MomentDeLaJournee } from "./momentDeLaJournee";

export class VerificateurPalindrome {
  private readonly _langue: LangueInterface;

  constructor(langue: LangueInterface) {
    this._langue = langue;
  }

  public Verifier(chaîne: string): string {
    let miroir = chaîne.split("").reverse().join("");

    let sortie =
      this._langue.Saluer(MomentDeLaJournee.MATIN) + os.EOL + miroir + os.EOL;

    if (miroir == chaîne) sortie += this._langue.Feliciter() + os.EOL;

    return sortie + this._langue.Acquitter(MomentDeLaJournee.MATIN);
  }
}
