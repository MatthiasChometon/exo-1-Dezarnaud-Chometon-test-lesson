import { MomentDeLaJournee } from "../domain/momentDeLaJournee";

export class GetOsHour {
 getCurrentHour (): number {
  return new Date().getHours()
 }

 execute (): MomentDeLaJournee {
  const currentHour = this.getCurrentHour()
  if (currentHour >= 6 && currentHour < 12) return MomentDeLaJournee.MATIN
  if (currentHour >= 12 && currentHour < 18) return MomentDeLaJournee.APRES_MIDI
  if (currentHour >= 18 && currentHour < 21) return MomentDeLaJournee.SOIREE
  return MomentDeLaJournee.SOIREE
 }
}