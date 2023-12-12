export class MomentDeLaJournee {
    private readonly _representation: string;

    public static MATIN: MomentDeLaJournee = new MomentDeLaJournee("Matin");
    public static APRES_MIDI: MomentDeLaJournee = new MomentDeLaJournee("Apres_midi");
    public static SOIREE: MomentDeLaJournee = new MomentDeLaJournee("Soiree");
    public static NUIT: MomentDeLaJournee = new MomentDeLaJournee("Nuit");
    public static INCONNUE : MomentDeLaJournee = new MomentDeLaJournee("Inconnue");

    private constructor(representation: string) {
        this._representation = representation;
    }

    public toString(){
        return this._representation;
    }
}