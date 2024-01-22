import { MomentDeLaJournee } from "./momentDeLaJournee";

export interface LangueInterface {
    Feliciter (): string;

    Saluer (moment: MomentDeLaJournee): string;

    Acquitter (moment: MomentDeLaJournee): string;

    MessageEntree (): string;
}