import { LangueInterface } from "../../src/domain/langue.interface";
import { MomentDeLaJournee } from "../../src/domain/momentDeLaJournee";

export class LangueStub implements LangueInterface {
    Feliciter (): string {
        return "";
    }

    Saluer (moment: MomentDeLaJournee): string {
        return "";
    }
    Acquitter (): string {
        return "";
    }

    MessageEntree (): string {
        return "";
    }
}