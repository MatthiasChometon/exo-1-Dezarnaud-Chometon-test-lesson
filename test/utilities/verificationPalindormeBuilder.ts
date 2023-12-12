import { LangueInterface } from "../../src/domain/langue.interface";
import { MomentDeLaJournee } from "../../src/domain/momentDeLaJournee";
import { LangueStub } from "./langueStub";
import { VerificateurPalindrome } from "../../src/domain/verificateurPalindrome";

export class VerificateurPalindromeBuilder {
    private _langue: LangueInterface = new LangueStub();
    private _moment: MomentDeLaJournee = MomentDeLaJournee.INCONNUE;

    public static Default () {
        return new VerificateurPalindromeBuilder().Build();
    }

    public Build (): VerificateurPalindrome {
        return new VerificateurPalindrome(this._langue, this._moment);
    }

    public AyantPourLangue (langue: LangueInterface): VerificateurPalindromeBuilder {
        this._langue = langue;
        return this;
    }

    public AyantPourMomentDeLaJournee (moment: MomentDeLaJournee) {
        this._moment = moment
        return this;
    }
}