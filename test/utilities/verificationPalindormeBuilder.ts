import {LangueInterface} from "../../src/langue.interface";
import { MomentDeLaJournee } from "../../src/momentDeLaJournee";
import { VerificateurPalindrome } from "../../src/verificateurPalindrome";
import {LangueStub} from "./langueStub";

export class VerificateurPalindromeBuilder {
    private _langue: LangueInterface = new LangueStub();

    public static Default() {
        return new VerificateurPalindromeBuilder().Build();
    }

    public Build(): VerificateurPalindrome {
        return new VerificateurPalindrome(this._langue);
    }

    public AyantPourLangue(langue: LangueInterface): VerificateurPalindromeBuilder {
        this._langue = langue;
        return this;
    }

    public AyantPourMomentDeLaJournee(moment: MomentDeLaJournee) {
        return this;
    }
}