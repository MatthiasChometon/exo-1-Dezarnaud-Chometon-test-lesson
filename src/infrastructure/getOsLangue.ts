import { GetLangue } from "../domain/getLangue.interface";
import { LangueInterface } from "../domain/langue.interface";
import { LangueFrançaise } from '../domain/langueFrançaise'
import { LangueAnglaise } from '../domain/langueAnglaise'

export class GetOsLangue implements GetLangue {
 execute (): LangueInterface {
  const langue = Intl.DateTimeFormat().resolvedOptions().locale
  return langue === 'fr-FR' ? new LangueFrançaise() : new LangueAnglaise()
 }
}