import { VerificateurPalindrome } from './src/domain/verificateurPalindrome'
import { GetOsHour } from './src/infrastructure/getOsHour'
import { GetOsLangue } from './src/infrastructure/getOsLangue'
import { GetOsInput } from './src/infrastructure/getOsInput'
import { GetOsOutput } from './src/infrastructure/getOsOutput'

const main = async (): Promise<void> => {
 const langue = new GetOsLangue().execute()
 const momentDeLaJournee = new GetOsHour().execute()
 const input = await new GetOsInput(langue).read()
 const output = new GetOsOutput()
 const verificateurPalindrome = new VerificateurPalindrome(langue, momentDeLaJournee)

 const result = verificateurPalindrome.Verifier(input)

 output.print(result)
}

main()
