import {LangueInterface} from "../../src/langue.interface";
import { MomentDeLaJournee } from "../../src/momentDeLaJournee";

export class LangueStub implements LangueInterface {
    Feliciter(): string {
        return "";
    }

    Saluer(moment: MomentDeLaJournee): string {
        return "";
    }
    Acquitter(): string {
        return "";
    }

}