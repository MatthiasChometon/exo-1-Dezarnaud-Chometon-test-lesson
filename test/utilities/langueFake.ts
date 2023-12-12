import {LangueInterface} from "../../src/langue.interface";
import { MomentDeLaJournee } from "../../src/momentDeLaJournee";

export class LangueFake implements LangueInterface {
    Feliciter(): string {
        return "Félicitations";
    }

    Saluer(moment: MomentDeLaJournee): string {
        return "Salutations";
    }

    Acquitter(moment: MomentDeLaJournee): string {
        return "Acquittance";
    }

}