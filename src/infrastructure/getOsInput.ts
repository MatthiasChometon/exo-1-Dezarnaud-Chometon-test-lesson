import { createInterface } from 'readline'
import { LangueInterface } from '../domain/langue.interface'

export class GetOsInput {
 constructor (private readonly langue: LangueInterface) { }

 private checkExit (value: string): void {
  if ('exit' === value) {
   process.exit(0)
  }
 }

 read (): Promise<string> {
  const input = createInterface({
   input: process.stdin,
   output: process.stdout
  })
  return new Promise((resolve) => {
   input.question(this.langue.MessageEntree(), (answer) => {
    this.checkExit(answer)
    resolve(answer)
   })
  })
 }
}
